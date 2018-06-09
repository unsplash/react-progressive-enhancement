import * as React from 'react';

import { progressivelyEnhance, withIsEnhanced } from '../consumer';

import { expect } from 'chai';
import { mount } from 'enzyme';
import { enableProgressiveEnhancementsOnMount } from '../provider';

const TestComponent: React.SFC<{ name: string }> = ({ name }) => <div>{name}</div>;
const Loading: React.SFC<{}> = () => <div> Loading!!! </div>;
const ProgressivelyEnhancedTestComponent = progressivelyEnhance(TestComponent, {
  LoadingComponent: Loading,
});

const ComponentWithIsEnhanced: React.SFC<{ name: string; isEnhanced: boolean }> = ({ name }) => (
  <div>{name}</div>
);
const WithIsEnhancedTestComponent = withIsEnhanced(ComponentWithIsEnhanced);

const TestApp = () => (
  <div>
    <ProgressivelyEnhancedTestComponent name={'foo'} />
    <WithIsEnhancedTestComponent name={'bar'} />
  </div>
);

describe('Tests', () => {
  describe('Consumer', () => {
    describe('progressivelyEnhance', () => {
      it('renders Loading component when `isEnhanced` is false', () => {
        const wrapper = mount(<ProgressivelyEnhancedTestComponent name={'foo'} />);

        expect(wrapper.find(Loading).length).to.equal(1);
      });
    });
    describe('withIsEnhanced', () => {
      it('provides `isEnhanced` prop to component', () => {
        const wrapper = mount(<WithIsEnhancedTestComponent name={'foo'} />);
        expect(wrapper.find(ComponentWithIsEnhanced).prop('isEnhanced')).to.equal(false);
      });
    });
  });

  describe('Provider', () => {
    describe('enableProgressiveEnhancementsOnMount', () => {
      it('`isEnhanced` is false when App is not wrapped with enableProgressiveEnhancementsOnMount', () => {
        const wrapperWithoutProgressiveEnhancements = mount(<TestApp />);
        expect(wrapperWithoutProgressiveEnhancements.find(Loading).length).to.equal(1);
        expect(
          wrapperWithoutProgressiveEnhancements.find(ComponentWithIsEnhanced).prop('isEnhanced'),
        ).to.equal(false);
      });
      it('sets `isEnhanced` to true on mount and renders Component', () => {
        const WrappedTree = enableProgressiveEnhancementsOnMount(TestApp);
        const wrapper = mount(<WrappedTree />);

        expect(wrapper.find(TestComponent).length).to.equal(1);
        expect(wrapper.find(ComponentWithIsEnhanced).prop('isEnhanced')).to.equal(true);
      });
    });
  });
});
