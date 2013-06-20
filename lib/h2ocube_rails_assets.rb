['slim', 'sass-rails', 'compass-rails', 'coffee-rails', 'v8', 'uglifier', 'turbolinks', 'quiet_assets'].each{ |g| require g }

module H2ocubeRailsAssets
  if defined?(Rails)
    module Rails
      class Rails::Engine < ::Rails::Engine
        initializer 'h2ocube_rails_assets.require_dependency' do |app|

        end
      end
    end
  end
end
