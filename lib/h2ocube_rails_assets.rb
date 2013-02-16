['slim', 'sass-rails', 'coffee-rails', 'v8', 'uglifier', 'quiet_assets'].each{ |g| require g }

module H2ocubeRailsAssets
  module Rails
		class Rails::Engine < ::Rails::Engine
		  initializer 'h2ocube_rails_assets.require' do
		    require 'compass-rails'
		  end
		end
  end
end
