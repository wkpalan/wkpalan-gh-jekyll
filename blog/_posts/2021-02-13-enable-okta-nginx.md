---
layout: post
title:  "Enabling Okta Authentication for All visitors using NGINX"
date:   2021-02-13
tags: [NGINX, Okta, Azure, Authentication]
description: "Using Vouch-proxy and NGINX with Okta to authentication for all visitors to a website"
---

### Enabling Okta Authentication from NGINX

I had been recently tasked enabling okta authentication to all the users who use a private jbrowse instance. This was necessaary to achieve three different goals
1.  Enhance Secutiry and allows only authorized users to access the jbrowse instance
2.  Integrate Jbrowse2 with into multiple apps with a single sign-on (SSO)
3.  Reduce the traffic through the VPN tunnel especially when using heavy data such as alignment tracks and other genomic files

I discovered a way to enable authentication to all visitors to a web-server with [NGINX](https://www.nginx.com/) and [vouch-proxy](https://github.com/vouch/vouch-proxy). I discovered this [blog post](https://developer.okta.com/blog/2018/08/28/nginx-auth-request) by Aaron Parecki on the Okta Developer blogs. After a few tries I found a basic configuration that worked for NGINX and vouch-proxy.

First you need to create a free Okta developer account at [https://developer.okta.com/](https://developer.okta.com/). Okta allows you to use either your Github or Google accounts to create a new account.

#### Login to Okta Developer Dashboard and create a new application

1. Click on the Applications that is indicated by the green arrow <br/>
    <img src="/assets/imgs/okta-nginx/okta-dev-home.png" width="500px"/>
2. Click on the **Add Application** button <br/>
    <img src="/assets/imgs/okta-nginx/okta-dev-apps.png" width="500px"/>
3. Select **Web** type application as shown below and click **Next** <br/>
    <img src="/assets/imgs/okta-nginx/okta-dev-add-web.png" width="500px"/>
4. Add the following details to the application form
   1. Login redirect URIs: `http://localhost:9090/auth` 
   2. Logout redirect URIs: `http://localhost:9090/logout`
   3. Group assignments (default): `Everyone`
   4. Grant type allowed (default): `Authorization Code` <br/>
    <img src="/assets/imgs/okta-nginx/okta-dev-app-dets.png" width="500px"/>
5. Note down application Credentials. We will need it to configure vouch-proxy later
   1. Client ID 
   2. Client secret 
    <img src="/assets/imgs/okta-nginx/okta-dev-app-creds.png" width="500px"/>


#### Install and Configure Nginx in Ubuntu

1. The Nginx is part of the default distribution so the easy way to install is using **apt-get** or **apt** 
    ```
        sudo apt install nginx
    ```
2. This creates a set of config files in the /etc/nginx directory
    ```
    ll /etc/nginx/
        total 72
        drwxr-xr-x   8 root root 4096 Feb 13 16:02 ./
        drwxr-xr-x 110 root root 4096 Feb 13 16:31 ../
        drwxr-xr-x   2 root root 4096 Apr 21  2020 conf.d/
        -rw-r--r--   1 root root 1077 Feb  4  2019 fastcgi.conf
        -rw-r--r--   1 root root 1007 Feb  4  2019 fastcgi_params
        -rw-r--r--   1 root root 2837 Feb  4  2019 koi-utf
        -rw-r--r--   1 root root 2223 Feb  4  2019 koi-win
        -rw-r--r--   1 root root 3957 Feb  4  2019 mime.types
        drwxr-xr-x   2 root root 4096 Apr 21  2020 modules-available/
        drwxr-xr-x   2 root root 4096 Feb 13 16:02 modules-enabled/
        -rw-r--r--   1 root root 1490 Feb  4  2019 nginx.conf
        -rw-r--r--   1 root root  180 Feb  4  2019 proxy_params
        -rw-r--r--   1 root root  636 Feb  4  2019 scgi_params
        drwxr-xr-x   2 root root 4096 Feb 13 16:02 sites-available/
        drwxr-xr-x   2 root root 4096 Feb 13 16:02 sites-enabled/
        drwxr-xr-x   2 root root 4096 Feb 13 16:02 snippets/
        -rw-r--r--   1 root root  664 Feb  4  2019 uwsgi_para
    ```
3. We will have to edit the Nginx config file to add the configuration for vouch-proxy to integrate Okta Authentication.
   1. The default server block is located at `/etc/nginx/sites-enabled/default`
   2. I decided to add authentication to all users for all the sites so I edited the default site, but one can add aa new file for a different server config 
   3. I also decided to work with *http* instead of *https* to make things easier for this tutorial, but in a **production** setting it's **essential** to use *https* with SSL.
4. Default Server Block Configuration of Nginx (After Removal of commented lines)
    ```
        server {
            listen 80 default_server;
            listen [::]:80 default_server;

            root /var/www/html;

            # Add index.php to the list if you are using PHP
            index index.html index.htm index.nginx-debian.html;

            server_name _;

            location / {
                try_files $uri $uri/ =404;
            }

        }
    ```
5. Add the vouch-proxy validate configuration to the default server block

    ```
        server {
            listen 80 default_server;
            listen [::]:80 default_server;

            root /var/www/html;

            # Add index.php to the list if you are using PHP
            index index.html index.htm index.nginx-debian.html;

            server_name _;

            ## Start of vouch-proxy validate block
            ## The line below send all unauthorized requests through vouch-proxy to validate
            auth_request /validate;

            ## Start of the Validate block to process requests
            ## This was taken from vouch-proxy default config
            location = /validate {

                # forward the /validate request to Vouch Proxy
                proxy_pass http://127.0.0.1:9090/validate;
                # be sure to pass the original host header
                proxy_set_header Host $http_host;

                # Vouch Proxy only acts on the request headers
                proxy_pass_request_body off;
                proxy_set_header Content-Length "";

                # optionally add X-Vouch-User as returned by Vouch Proxy along with the request
                auth_request_set $auth_resp_x_vouch_user $upstream_http_x_vouch_user;

                # these return values are used by the @error401 call
                auth_request_set $auth_resp_jwt $upstream_http_x_vouch_jwt;
                auth_request_set $auth_resp_err $upstream_http_x_vouch_err;
                auth_request_set $auth_resp_failcount $upstream_http_x_vouch_failcount;
            }
            
            # if validate returns `401 not authorized` then forward the request to the error401block
            error_page 401 = @error401;

            location @error401 {
                # redirect to Vouch Proxy for login
                return 302 http://localhost:9090/login?url=$scheme://$http_host$request_uri&vouch-failcount=$auth_resp_failcount&X-Vouch-Token=$auth_resp_jwt&error=$auth_resp_err;
                # you usually *want* to redirect to Vouch running behind the same Nginx config proteced by https
            }


            location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;

                ## This lines allows for tracking unique authenticated users from the application
                proxy_set_header X-Vouch-User $auth_resp_x_vouch_user;
            }
        }
    ```
6. You will have to restart the nginx service after you have modified the file and made the relevant changes
7. If you try to access the website it would throw an error now because vouch-proxy is not installed or running on **9090**

#### Setup vouch-proxy and start the service
1. Easiest way to use vouch-proxy is to use the docker image provided.
   1. Installation instructions are available at [https://github.com/vouch/vouch-proxy](https://github.com/vouch/vouch-proxy) for the brave souls
2. Make a config directory for **vouch-proxy** at any location
   1. E.g. `~/vouch-proxy/config`
3. Create a file called `~/vouch-proxy/config/config.yml` and add the following configuration to the file for initial testing
    ```
    # vouch config
    # bare minimum to get vouch running with OpenID Connect (such as okta)

    testing: true

    listen: 0.0.0.0  # VOUCH_LISTEN
    port: 9090       # VOUCH_PORT

    vouch:
        allowAllUsers: true

    cookie:
        # allow the jwt/cookie to be set into http://yourdomain.com (defaults to true, requiring https://yourdomain.com) 
        secure: false
        # vouch.cookie.domain must be set when enabling allowAllUsers
        domain: localhost

    oauth:
        # Generic OpenID Connect
        # including okta
        provider: oidc
        client_id: 0oa5xn6r0pljJS8yC5d6
        client_secret: L8FhYT29jbgDNvj7F-V7hw6OFzT3Emll_B8Wa-CD
        auth_url: https://dev-31204354.okta.com/oauth2/default/v1/authorize
        token_url: https://dev-31204354.okta.com/oauth2/default/v1/token
        user_info_url: https://dev-31204354.okta.com/oauth2/default/v1/userinfo
        scopes:
            - openid
            - email
        callback_url: http://localhost:9090/auth
    ```
4.  This configuration allows you to test if the authentication flow is working correctly and manually advance the steps after authentication
5. Run the docker image for vouch-proxy
    ```
        # docker stop vouch-proxy  ## Needed if restarting the daemon
        # docker rm vouch-proxy ## Needed if restarting the daemon
        docker run -d \
            -p 9090:9090 \
            --name vouch-proxy \
            -v ${HOME}/vouch-proxy/config:/config \
            voucher/vouch-proxy
    ```
6. Now you are all set to see if the authentication workflow is working as intended
7. Open a incognito or private window to test and load [http://localhost](http://localhost). It should show an okta login screen as shown below <br/>
    <img src="/assets/imgs/okta-nginx/localhost-okta.png" width="300px"/>
8. Enter your credentials and **Sign In** to Okta <br/>
9. The page should automatically direct you to [http://localhost](http://localhost) and voila you should be able to see the default Nginx screen below <br/>
    <img src="/assets/imgs/okta-nginx/localhost-home.png" width="700px"/>

