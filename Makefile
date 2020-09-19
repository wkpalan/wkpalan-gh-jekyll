SITE= site
RM= rm -rf

site:
	bundle install --path vendor/bundle
	bundle exec jekyll build -d $(SITE)

publish:
	rsync -rluv $(SITE)/ /var/www/blunderingbioinformatics.org/html/

serve:
	bundle exec jekyll serve -H 0.0.0.0 -P 4001 -d site --trace

clean :
	$(RM) $(SITE)
