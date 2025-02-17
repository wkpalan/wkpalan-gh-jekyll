SITE= site
RM= rm -rf

site:
	bundle3.0 install #--path vendor/bundle
	bundle3.0 exec jekyll build -d $(SITE)

publish:
	rsync -rluv --chown $(WWW_UID):$(WWW_GID) $(SITE)/ /var/www/bioinformapping.com/html/

serve:
	bundle3.0 exec jekyll serve -H 0.0.0.0 -P 4001 -d site --trace

clean :
	$(RM) $(SITE)
