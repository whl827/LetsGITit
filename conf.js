exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['blackbox/searchBar.spec.js', 'login.spec.js']
}