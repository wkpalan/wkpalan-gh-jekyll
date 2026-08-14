HOMEBREW_BUNDLE := /opt/homebrew/opt/ruby/bin/bundle
BUNDLE ?= $(shell if [ -x $(HOMEBREW_BUNDLE) ]; then echo PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/bin:$(PATH)" $(HOMEBREW_BUNDLE); else echo bundle; fi)
SITE = site
RM = rm -rf

.PHONY: site publish serve clean

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
