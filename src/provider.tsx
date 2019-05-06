import * as React from 'react';

import { ProgressiveEnhancementProp, context, defaultValue } from './context';
import { getDisplayName } from './helpers';

const { Provider } = context;

export const enableProgressiveEnhancementsOnMount = <Props extends {}>(
  ComposedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> => {
  class ProgressiveEnhancementProvider extends React.Component<Props, ProgressiveEnhancementProp> {
    static displayName = `ProgressiveEnhancementProvider(${getDisplayName(ComposedComponent)})`;

    state = defaultValue;

    componentDidMount() {
      this.setState({ isEnhanced: true });
    }

    render() {
      return (
        <Provider value={this.state}>
          <ComposedComponent {...this.props} />
        </Provider>
      );
    }
  }

  return ProgressiveEnhancementProvider;
};
