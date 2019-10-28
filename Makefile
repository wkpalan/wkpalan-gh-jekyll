SITE= site
RM= rm -rf

site:
	bundle install --path vendor/bundle
	bundle exec jekyll build -d $(SITE)

publish:
	rsync -auv $(SITE)/ /var/www/blunderingbioinformatics.org/html/

clean :
	$(RM) $(SITE)
