exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['blackbox/spec.js', 'blackbox/createPoll.spec.js', 'blackbox/createRating.spec.js', 'blackbox/pollRating.spec.js']
  
}