require 'test_helper'

describe 'test integration' do
  it 'do' do
  	p Rails
    visit '/assets/compass.css'
    p page.text
  end
end