import * as Enzyme from 'enzyme';
const ReactSixteenAdapter = require('./ReactSixteenAdapter').ReactSixteenAdapter;

Enzyme.configure({ adapter: new ReactSixteenAdapter() });
