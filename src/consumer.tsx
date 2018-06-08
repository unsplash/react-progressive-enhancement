import * as React from 'react';

import { Consumer, ProgressiveEnhancementProp } from './context';
import { ObjectOmit, getDisplayName } from './helpers';

export const withIsEnhanced = function<OwnProps extends ProgressiveEnhancementProp>(
  ComposedComponent: React.ComponentType<OwnProps>,
) {
  const displayName = `withIsEnhanced(${getDisplayName(ComposedComponent)})`;

  type OwnPropsWithoutProgressiveEnhancementProp = ObjectOmit<OwnProps, ProgressiveEnhancementProp>;

  const ComponentWithIsEnhanced: React.SFC<OwnPropsWithoutProgressiveEnhancementProp> = props => (
    <Consumer>
      {({ isEnhanced }) => <ComposedComponent isEnhanced={isEnhanced} {...props} />}
    </Consumer>
  );

  ComponentWithIsEnhanced.displayName = displayName;

  return ComponentWithIsEnhanced;
};

export const progressivelyEnhance = function<Props>(ComposedComponent: React.ComponentType<Props>) {
  const displayName = `ProgressivelyEnhance(${getDisplayName(ComposedComponent)})`;

  const ProgressivelyEnhance: React.SFC<Props> = props => (
    <Consumer>
      {({ isEnhanced }) => (isEnhanced ? <ComposedComponent {...props} /> : null)}
    </Consumer>
  );

  ProgressivelyEnhance.displayName = displayName;

  return ProgressivelyEnhance;
};
