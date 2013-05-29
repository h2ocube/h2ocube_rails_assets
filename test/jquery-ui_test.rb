describe 'jquery ui integration' do
  it 'jquery ui' do
    visit '/assets/jquery.ui_test.js'
    page.html.must_include 'jQuery UI'

    visit '/assets/jquery-ui_test.js'
    page.html.must_include 'jQuery UI'
  end
end
