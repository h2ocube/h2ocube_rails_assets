describe 'compass integration' do
  it 'compass' do
    visit '/assets/compass_test.css'
    page.html.wont_include 'Error'
  end
end
