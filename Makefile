SITE= site
RM= rm -rf

site:
	bundle config set path 'vendor/bundle'
	bundler install
	bundler exec jekyll build -d $(SITE)

publish:
	rsync -rluv --chown $(WWW_UID):$(WWW_GID) $(SITE)/ /var/www/bioinformapping.com/html/

serve:
	bundler exec jekyll serve -H 0.0.0.0 -P 4001 -d site --trace

clean :
	$(RM) $(SITE)
