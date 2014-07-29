require 'test_helper'

describe 'basic assets type integration' do
  it 'css' do
    visit '/assets/css.css'
    page.html.wont_include 'Error'
    page.html.must_include 'color:red'
  end

  it 'sass' do
    visit '/assets/sass.css'
    page.html.wont_include 'Error'
    page.html.must_include 'color:red'
  end

  it 'scss' do
    visit '/assets/scss.css'
    page.html.wont_include 'Error'
    page.html.must_include 'color:red'
  end

  it 'js' do
    visit '/assets/js.js'
    page.html.wont_include 'Error'
    page.html.must_include 'alert(1);'
  end

  it 'coffee' do
    visit '/assets/coffee.js'
    page.html.wont_include 'Error'
    page.html.must_include 'alert(1);'
  end
end
