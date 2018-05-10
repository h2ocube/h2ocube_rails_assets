# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name          = 'h2ocube_rails_assets'
  gem.version       = '0.7.3'
  gem.authors       = ['Ben']
  gem.email         = ['ben@h2ocube.com']
  gem.description   = 'Just an assets collection'
  gem.summary       = 'Just an assets collection'
  gem.homepage      = 'https://github.com/h2ocube/h2ocube_rails_assets'
  gem.license       = 'MIT'

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map { |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ['lib']

  %w(sass-rails slim-rails coffee-rails uglifier turbolinks jquery-rails).each{ |g| gem.add_dependency g }
end
