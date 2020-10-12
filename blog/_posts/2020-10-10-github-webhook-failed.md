---
layout: post
title:  "Fixing the Jenkins 'failed to connect' issues for  Github repos"
date:   2020-10-10
tags: [github webhook, jenkins,  failed to connect, Azure VM, Microsoft Azure, Azure vnet]
description: "Allowing Azure VM to detect Github hooks push event"
---

### Fixing the Jenkins 'failed to connect' issues for  Github repos

I have been recently using [Jenkins](https://www.jenkins.io/) on Microsoft Azure cloud to build and deploy the [GOMAP](https://www.bioinformapping.com/gomap/)singularity image to [Cyverse](https://datacommons.cyverse.org/browse/iplant/home/shared/dillpicl/gomap/GOMAP).

My Jenkins setup runs on a smaller Azure Virtual Machine that creates other bigger VMs as necessary to build the GOMAP singularity image. It was an exciting journey to setup the VM, Jenkins and connect Jenkins to automatically create new machine as needed. Another story for another time.

Jenkins was working perfectly fine when I had the Azure VM open to the internet with the ports directly exposed. I added the custom domains and started locking down the ports and the webhooks started throwing errors.

<img src="/assets/imgs/github_hook_fail.png" style="width:800px">

I went through several iterations of port configurations to get this working. Maybe someone smarter than me would have it figured all out in less time, but it's a learning curve I am willing to power though.

Initially the issue was that I made the ports too tight and disallowed all ports for inbound connections were not open. The fix was to add the correct IP address ranges [Github meta](https://api.github.com/meta) to the Azure VM 


```shell
#  Github API Address ranges
192.30.252.0/22,185.199.108.0/22,140.82.112.0/20,13.230.158.120/32,18.179.245.253/32,52.69.239.207/32,13.209.163.61/32,54.180.75.25/32,13.233.76.15/32,13.234.168.60/32,13.250.168.23/32,13.250.94.254/32,54.169.195.247/32,13.236.14.80/32,13.238.54.232/32,52.63.231.178/32,18.229.199.252/32,54.207.47.76/32
# Github hooks address ranges
192.30.252.0/22,185.199.108.0/22,140.82.112.0/20
```


<img src="/assets/imgs/open_inbound_ports.png" style="width:800px">

Now the hooks work as expected and are as secure as I could get them.

<img src="/assets/imgs/github_hook_success.png" style="width:800px">


**Note**: Strange though. Jenkins logs show that the hook events always are received from `140.82.115.0/24` CIDR range, but this range is not in either the Github API or hook address ranges.


