# H2ocubeRailsAssets

[![Gem Version](https://badge.fury.io/rb/h2ocube_rails_assets.png)](http://badge.fury.io/rb/h2ocube_rails_assets)
[![Build Status](https://travis-ci.org/h2ocube/h2ocube_rails_assets.png?branch=master)](https://travis-ci.org/h2ocube/h2ocube_rails_assets)

Just an assets collection.

## Installation

Add this line to your application's Gemfile:

    gem 'h2ocube_rails_assets'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install h2ocube_rails_assets

## Usage

    #=require jquery
    #=require jquery.ujs
    #=require jquery.ui
    #=require jquery.mobile
    #=require jquery.timeago
    #=require jquery.cookie
    #=require jquery.validate
    #=require jquery.fileupload
    #=require jquery.pnotify
    #=require jquery.fancybox
    #=require jquery.lazyload
    #=require bootstrap
    #=require bootstrap3
    #=require sammy
    #=require modernizr
    #=require lazyload
    #=require zepto
    #=require zepto.all
    #=require highcharts
    #=require semantic
    #=require angular

    @import compass
    @import jquery.ui
    @import jquery.mobile
    @import jquery.pnotify
    @import jquery.fancybox
    @import bootstrap
    @import bootstrap.responsive
    @import bootstrap3
    @import normalize
    @import semantic
    @import font-awesome

## Include Gems

* slim http://slim-lang.com/
* sass-rails https://github.com/rails/sass-rails
* compass-rails https://github.com/Compass/compass-rails
* coffee-rails https://github.com/rails/coffee-rails
* therubyracer https://github.com/cowboyd/therubyracer
* uglifier https://github.com/lautis/uglifier
* quiet_assets https://github.com/evrone/quiet_assets
* turbolinks https://github.com/rails/turbolinks
* font-awesome-rails https://github.com/bokmann/font-awesome-rails

## Other Useful Gems

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
