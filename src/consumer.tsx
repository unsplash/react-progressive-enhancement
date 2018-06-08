import * as React from 'react';

import { Consumer, ProgressiveEnhancementProp } from './context';
import { ObjectOmit, getDisplayName } from './helpers';

export const withIsEnhanced = function<OwnProps extends ProgressiveEnhancementProp>(
  ComposedComponent: React.ComponentType<OwnProps>,
) {
  type OwnPropsWithoutProgressiveEnhancementProp = ObjectOmit<OwnProps, ProgressiveEnhancementProp>;

  const ComponentWithIsEnhanced: React.SFC<OwnPropsWithoutProgressiveEnhancementProp> = props => (
    <Consumer>
      {({ isEnhanced }) => <ComposedComponent isEnhanced={isEnhanced} {...props} />}
    </Consumer>
  );

  ComponentWithIsEnhanced.displayName = `withIsEnhanced(${getDisplayName(ComposedComponent)})`;

  return ComponentWithIsEnhanced;
};

export const progressivelyEnhance = function<Props>(ComposedComponent: React.ComponentType<Props>) {
  const ProgressivelyEnhance: React.SFC<Props> = props => (
    <Consumer>
      {({ isEnhanced }) => (isEnhanced ? <ComposedComponent {...props} /> : null)}
    </Consumer>
  );

  ProgressivelyEnhance.displayName = `ProgressivelyEnhance(${getDisplayName(ComposedComponent)})`;

  return ProgressivelyEnhance;
};
