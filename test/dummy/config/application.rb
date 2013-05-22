require File.expand_path('../boot', __FILE__)

require "active_model/railtie"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require

Dir[File.dirname(__FILE__) << '/../../../']

module Dummy
  class Application < Rails::Application
    config.encoding = "utf-8"
    config.assets.enabled = true
    config.assets.compile = true
    config.middleware.use ::ActionDispatch::Static, "#{Rails.root}/app"
  end
end
