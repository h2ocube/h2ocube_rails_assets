if defined?(Rails)
  %w(slim-rails sass-rails coffee-rails uglifier turbolinks jquery-rails).each{ |g| require g }

  module H2ocubeRailsAssets
    module ActionView
      module Helpers
        def assets_source(type)
          case type
          when :css
            list = []
            list.push "#{request.subdomain.split('.')[0]}/#{params[:controller]}" if File.exist?(Rails.root.join("app/assets/stylesheets/#{request.subdomain.split('.')[0]}/#{params[:controller]}.sass"))
            list.push "#{request.subdomain.split('.')[0]}/#{params[:controller]}/#{params[:action]}" if File.exist?(Rails.root.join("app/assets/stylesheets/#{request.subdomain.split('.')[0]}/#{params[:controller]}/#{params[:action]}.sass"))
            list.empty? ? nil : stylesheet_link_tag(*list)
          when :js
            list = []
            list.push "#{request.subdomain.split('.')[0]}/#{params[:controller]}" if File.exist?(Rails.root.join("app/assets/javascripts/#{request.subdomain.split('.')[0]}/#{params[:controller]}.js"))
            list.push "#{request.subdomain.split('.')[0]}/#{params[:controller]}/#{params[:action]}" if File.exist?(Rails.root.join("app/assets/javascripts/#{request.subdomain.split('.')[0]}/#{params[:controller]}/#{params[:action]}.js"))
            list.empty? ? nil : javascript_include_tag(*list)
          end
        end
      end
    end

    class Railtie < Rails::Railtie
      PATH = File.dirname(__FILE__)
      initializer 'h2ocube_rails_assets.require_dependency' do |app|
        app.config.assets.paths += Dir[File.join(PATH, '../vendor/assets/*')]
        ActiveSupport.on_load :action_view do
          include H2ocubeRailsAssets::ActionView::Helpers
        end
      end
    end
  end
end
