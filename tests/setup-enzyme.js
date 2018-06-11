const Enzyme = require('enzyme');
const ReactSixteenAdapter = require('./ReactSixteenAdapter').ReactSixteenAdapter;

Enzyme.configure({ adapter: new ReactSixteenAdapter() });
