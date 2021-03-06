# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "gokool"
  spec.version       = "0.1.0"
  spec.authors       = ["Kokulapalan Wimalanathan"]
  spec.email         = ["kokulapalan@gmail.com"]

  spec.summary       = "This is Gokul's personal site"
  spec.homepage      = "https://github.com/wkpalan/wkpalan-gh-jekyll"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_dependency "jekyll"
  
 

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "hash-joiner"
  spec.add_development_dependency "crack"
  spec.add_development_dependency "jekyll-seo-tag"
  spec.add_development_dependency "jekyll-sitemap"
  spec.add_development_dependency "jekyll-scholar"
  spec.add_development_dependency "citeproc-ruby"
  spec.add_development_dependency "csl-styles"
  spec.add_development_dependency "unicode"


  Encoding.default_external = Encoding::UTF_8
end
