if defined?(Rails)
  %w(slim-rails sass-rails coffee-rails uglifier turbolinks jquery-rails).each{ |g| require g }

  module H2ocubeRailsAssets
    module ActionView
      module Helpers
        def assets_source(type)
          domain = request.subdomain.split('.')[0]
          case type
          when :css
            list = []
            list.push "domains/#{domain}/#{params[:controller]}" if File.exist?(Rails.root.join("app/assets/stylesheets/domains/#{domain}/#{params[:controller]}.sass"))
            list.push "domains/#{domain}/#{params[:controller]}/#{params[:action]}" if File.exist?(Rails.root.join("app/assets/stylesheets/domains/#{domain}/#{params[:controller]}/#{params[:action]}.sass"))
            list.empty? ? nil : stylesheet_link_tag(*list)
          when :js
            list = []
            list.push "domains/#{domain}/#{params[:controller]}" if File.exist?(Rails.root.join("app/assets/javascripts/domains/#{domain}/#{params[:controller]}.js"))
            list.push "domains/#{domain}/#{params[:controller]}/#{params[:action]}" if File.exist?(Rails.root.join("app/assets/javascripts/domains/#{domain}/#{params[:controller]}/#{params[:action]}.js"))
            list.empty? ? nil : javascript_include_tag(*list)
          end
        end
      end
    end

    class Railtie < Rails::Railtie
      initializer 'h2ocube_rails_assets.require_dependency' do |app|
        app.config.assets.precompile += Dir[Rails.root.join('app/assets/stylesheets/domains/*/*.sass')] + Dir[Rails.root.join('app/assets/stylesheets/domains/*/*/*.sass')]
        app.config.assets.precompile += Dir[Rails.root.join('app/assets/javascripts/domains/*/*.js')] + Dir[Rails.root.join('app/assets/javascripts/domains/*/*/*.js')]

        ActiveSupport.on_load :action_view do
          include H2ocubeRailsAssets::ActionView::Helpers
        end
      end
    end
  end
end
