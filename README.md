# H2ocubeRailsAssets

[![Gem Version](https://badge.fury.io/rb/h2ocube_rails_assets.png)](http://badge.fury.io/rb/h2ocube_rails_assets)
[![Build Status](https://travis-ci.org/h2ocube/h2ocube_rails_assets.png?branch=master)](https://travis-ci.org/h2ocube/h2ocube_rails_assets)

Just an assets collection.

## Installation

NOTE: The new version just support rails 4.2 or newer.

Add this line to your application's Gemfile:

    gem 'h2ocube_rails_assets'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install h2ocube_rails_assets

## Include Gems

* slim-rails https://github.com/slim-template/slim-rails
* sass-rails https://github.com/rails/sass-rails
* coffee-rails https://github.com/rails/coffee-rails
* therubyracer https://github.com/cowboyd/therubyracer
* turbolinks https://github.com/turbolinks/turbolinks
* uglifier https://github.com/lautis/uglifier
* jquery-rails https://github.com/rails/jquery-rails

## Include helper

### assets_source(type)

type is `:css` or `:js`

Example:

```ruby
assets_source :css # when subdomain is 'www', controller is 'pages', action is 'home', it will try to find 'assets/stylesheets/domains/www/pages.sass' and 'assets/stylesheets/domains/www/pages/home.sass', if file exists, will use `stylesheet_link_tag` to include them.
```

## Other Useful Gems

Font::Awesome::Sass https://github.com/FortAwesome/font-awesome-sass

    gem 'font-awesome-sass'

    @import 'font-awesome'

bootstrap-sass https://github.com/twbs/bootstrap-sass

    gem 'bootstrap-sass'

    @import "bootstrap-sprockets"
    @import "bootstrap"
    #= require bootstrap-sprockets

Semantic UI https://github.com/doabit/semantic-ui-sass

    gem 'semantic-ui-sass'

    @import "semantic-ui"
    #= require semantic-ui


Backbone & Underscore https://github.com/codebrew/backbone-rails

    gem 'rails-backbone'

    #= require underscore
    #= require backbone

Turbolinks https://github.com/rails/turbolinks & jquery.turbolinks https://github.com/kossnocorp/jquery.turbolinks

    gem 'turbolinks'
    gem 'jquery-turbolinks'

    #= require jquery.turbolinks
    #= require turbolinks

jQuery UI https://github.com/joliss/jquery-ui-rails

    gem 'jquery-ui-rails'

    #= require jquery.ui.all

    @import jquery.ui.all

jQuery Mobile https://github.com/dmarkow/jquery-mobile-rails

    gem 'jquery_mobile_rails'

    #= require jquery.mobile

    @import jquery.mobile

jQuery Timeago https://github.com/jgraichen/rails-timeago

    gem 'rails-timeago'

    #= require rails-timeago

Fancybox https://github.com/kyparn/fancybox2-rails

    gem 'fancybox2-rails'

    #= require fancybox

Modernizr https://github.com/russfrisch/modernizr-rails

    gem 'modernizr-rails'

    #= require modernizr

AngularJS https://github.com/hiravgandhi/angularjs-rails

    gem 'angularjs-rails'

    #= require angular

Highcharts https://github.com/PerfectlyNormal/highcharts-rails

    gem 'highcharts-rails'

    #= require highcharts

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
