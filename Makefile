RUBY_BIN = /opt/homebrew/opt/ruby/bin
BUNDLE = PATH="$(RUBY_BIN):/opt/homebrew/bin:$(PATH)" $(RUBY_BIN)/bundle
SITE = site
RM = rm -rf

site:
	$(BUNDLE) config set path 'vendor/bundle'
	$(BUNDLE) install
	$(BUNDLE) exec jekyll build -d $(SITE)

publish:
	rsync -rluv --chown $(WWW_UID):$(WWW_GID) $(SITE)/ /var/www/bioinformapping.com/html/

serve:
	$(BUNDLE) exec jekyll serve -H 0.0.0.0 -P 4001 -d site --trace

clean:
	$(RM) $(SITE)


