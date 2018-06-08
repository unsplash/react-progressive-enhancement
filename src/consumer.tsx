import * as React from 'react';

import { Consumer, ProgressiveEnhancementProp } from './context';
import { ObjectOmit, getDisplayName } from './helpers';

export const withIsEnhanced = <OwnProps extends ProgressiveEnhancementProp>(
  ComposedComponent: React.ComponentType<OwnProps>,
) => {
  type ComponentWithIsEnhancedType = React.SFC<ObjectOmit<OwnProps, ProgressiveEnhancementProp>>;
  const ComponentWithIsEnhanced: ComponentWithIsEnhancedType = props => (
    <Consumer>
      {({ isEnhanced }) => <ComposedComponent isEnhanced={isEnhanced} {...props} />}
    </Consumer>
  );

  ComponentWithIsEnhanced.displayName = `withIsEnhanced(${getDisplayName(ComposedComponent)})`;

  return ComponentWithIsEnhanced;
};

export const progressivelyEnhance = <Props extends {}>(
  ComposedComponent: React.ComponentType<Props>,
) => {
  const ProgressivelyEnhance: React.SFC<Props> = props => (
    <Consumer>
      {({ isEnhanced }) => (isEnhanced ? <ComposedComponent {...props} /> : null)}
    </Consumer>
  );

  ProgressivelyEnhance.displayName = `ProgressivelyEnhance(${getDisplayName(ComposedComponent)})`;

  return ProgressivelyEnhance;
};
