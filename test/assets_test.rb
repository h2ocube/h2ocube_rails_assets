require 'test_helper'

class AssetsTest < ActionDispatch::IntegrationTest

	test 'simple params' do
		get '/assets/compass.css'
	end

end
