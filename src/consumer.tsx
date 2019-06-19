import * as React from 'react';

import { context, ProgressiveEnhancementProp } from './context';
import { ObjectOmit, getDisplayName } from './helpers';

const { Consumer } = context;

export const withIsEnhanced = <OwnProps extends ProgressiveEnhancementProp>(
  ComposedComponent: React.ComponentType<OwnProps>,
) => {
  type ComponentWithIsEnhancedType = React.SFC<ObjectOmit<OwnProps, ProgressiveEnhancementProp>>;
  const ComponentWithIsEnhanced: ComponentWithIsEnhancedType = props => (
    <Consumer>
      {({ isEnhanced }) => (
        <ComposedComponent
          {
            // Cast is workaround for https://github.com/microsoft/TypeScript/issues/28884
            ...{
              isEnhanced,
              ...props,
            } as OwnProps
          }
        />
      )}
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
