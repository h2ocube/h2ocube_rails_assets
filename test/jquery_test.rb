describe 'jquery integration' do
  it 'jquery' do
    visit '/assets/jquery_test.js'
    page.html.must_include 'jQuery JavaScript Library'
  end
end