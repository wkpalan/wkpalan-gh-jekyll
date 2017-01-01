# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "gokool"
  spec.version       = "0.1.0"
  spec.authors       = ["Kokulapalan Wimalanathan"]
  spec.email         = ["wkpalan@yahoo.com"]

  spec.summary       = "This is a theme for my personal site"
  spec.homepage      = "https://github.com/wkpalan/gokool-jekyll-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.3"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "hash-joiner", "~> 0.0.7"
  spec.add_development_dependency "crack", "~> 0.4.3"
  spec.add_development_dependency 'open-uri'

end
