if defined?(Rails)
  ['slim', 'sass-rails', 'compass-rails', 'coffee-rails', 'v8', 'uglifier', 'turbolinks', 'quiet_assets'].each{ |g| require g }

  PATH = File.dirname(__FILE__)
  module H2ocubeRailsAssets
      class Railtie < Rails::Railtie
        initializer 'h2ocube_rails_assets.require_dependency' do |app|
          Dir[File.join(PATH, '../vendor/assets/*')].each{ |path| app.assets.append_path path }
        end
      end
  end
end
