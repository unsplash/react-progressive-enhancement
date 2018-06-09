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

type Options = {
  LoadingComponent?: React.ComponentType<{}>;
};

const renderLoadingComponent = (options?: Options) => {
  if (options !== undefined && options.LoadingComponent !== undefined) {
    return <options.LoadingComponent />;
  } else {
    return null;
  }
};

export const progressivelyEnhance = <Props extends {}>(
  ComposedComponent: React.ComponentType<Props>,
  options?: Options,
) => {
  const ProgressivelyEnhance: React.SFC<Props> = props => (
    <Consumer>
      {({ isEnhanced }) =>
        isEnhanced ? <ComposedComponent {...props} /> : renderLoadingComponent(options)
      }
    </Consumer>
  );

  ProgressivelyEnhance.displayName = `ProgressivelyEnhance(${getDisplayName(ComposedComponent)})`;

  return ProgressivelyEnhance;
};
