import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper, StatelessComponent } from 'enzyme';

import { progressivelyEnhance, withIsEnhanced } from '../src/consumer';
import { ProgressiveEnhancementProp } from '../src/context';
import { enableProgressiveEnhancementsOnMount } from '../src/provider';

const TestComponent: React.SFC<{ name: string }> = ({ name }) => <div>{name}</div>;
const Loading: React.SFC<{}> = () => <div> Loading!!! </div>;
const ProgressivelyEnhancedTestComponent = progressivelyEnhance(TestComponent, {
  LoadingComponent: Loading,
});

const isEnhancedKey: keyof Pick<ProgressiveEnhancementProp, 'isEnhanced'> = 'isEnhanced';

type Props = { name: string; isEnhanced: boolean };
const ComponentWithIsEnhanced: StatelessComponent<Props> = ({ name }) => (
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
    describe(progressivelyEnhance.name, () => {
      it('renders Loading component when `isEnhanced` is false', () => {
        const wrapper = mount(<ProgressivelyEnhancedTestComponent name={'foo'} />);

        expect(wrapper.find(Loading).length).to.equal(1);
      });
    });
    describe(withIsEnhanced.name, () => {
      it('provides `isEnhanced` prop to component', () => {
        const wrapper = mount(<WithIsEnhancedTestComponent name={'foo'} />);
        expect(wrapper.find(ComponentWithIsEnhanced).prop(isEnhancedKey)).to.equal(false);
      });
    });
  });

  describe('Provider', () => {
    describe(enableProgressiveEnhancementsOnMount.name, () => {
      it('`isEnhanced` is false when App is not wrapped with enableProgressiveEnhancementsOnMount', () => {
        const wrapperWithoutProgressiveEnhancements = mount(<TestApp />);
        expect(wrapperWithoutProgressiveEnhancements.find(Loading).length).to.equal(1);
        expect(
          wrapperWithoutProgressiveEnhancements.find(ComponentWithIsEnhanced).prop(isEnhancedKey),
        ).to.equal(false);
      });
      it('sets `isEnhanced` to true on mount and renders Component', () => {
        const WrappedTree = enableProgressiveEnhancementsOnMount(TestApp);
        const wrapper = mount(<WrappedTree />);

        expect(wrapper.find(TestComponent).length).to.equal(1);
        expect(wrapper.find(ComponentWithIsEnhanced).prop(isEnhancedKey)).to.equal(true);
      });
    });
  });
});
