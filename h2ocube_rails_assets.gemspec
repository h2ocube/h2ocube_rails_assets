# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name          = 'h2ocube_rails_assets'
  gem.version       = '0.2.0'
  gem.authors       = ['Ben']
  gem.email         = ['ben@h2ocube.com']
  gem.description   = %q{Just an assets collection}
  gem.summary       = %q{Just an assets collection}
  gem.homepage      = 'https://github.com/h2ocube/h2ocube_rails_assets'
  gem.license       = 'MIT'

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_dependency 'rails', '> 4.1'
  gem.add_dependency 'sass-rails', '4.0.3'
  %w(slim compass-rails coffee-rails therubyracer uglifier quiet_assets).each{ |g| gem.add_dependency g }

  %w(minitest capybara rubyzip vendorer).each{ |g| gem.add_development_dependency g }
end
