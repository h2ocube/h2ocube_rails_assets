describe 'turbolinks integration' do
  it 'turbolinks' do
    visit '/assets/turbolinks_test.js'
    page.html.must_include 'initializeTurbolinks'
  end

  it 'jquery.turbolinks' do
    visit '/assets/jquery-turbolinks_test.js'
    page.html.must_include '$.turbo'
  end
end
