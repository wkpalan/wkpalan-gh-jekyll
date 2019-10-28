#bundle exec gem uninstall jekyll-pubmed
bundle install --path vendor/bundle
bundle exec jekyll build -d site
