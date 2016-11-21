if defined?(Rails)
  %w(slim-rails sass-rails coffee-rails uglifier turbolinks jquery-rails babel-transpiler).each{ |g| require g }

  module H2ocubeRailsAssets
    class Railtie < Rails::Railtie
      PATH = File.dirname(__FILE__)
      initializer 'h2ocube_rails_assets.require_dependency' do |app|
        app.config.assets.paths += Dir[File.join(PATH, '../vendor/assets/*')]
      end
    end
  end
end
