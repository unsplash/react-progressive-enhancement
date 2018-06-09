const ReactSixteenAdapter = require('./ReactSixteenAdapter').ReactSixteenAdapter;
import * as Enzyme from 'enzyme';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });
