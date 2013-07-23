if defined?(Rails)
  ['slim', 'sass-rails', 'compass-rails', 'coffee-rails', 'v8', 'uglifier', 'turbolinks', 'quiet_assets'].each{ |g| require g }

  PATH = File.dirname(__FILE__)
  module H2ocubeRailsAssets
      class Railtie < Rails::Railtie
        initializer 'h2ocube_rails_assets.require_dependency' do |app|
          app.config.assets.paths += Dir[File.join(PATH, '../vendor/assets/*')]
          app.config.assets.paths << Compass::Frameworks['compass'].stylesheets_directory
        end
      end
  end
end
