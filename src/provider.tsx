import * as React from 'react';

import { ProgressiveEnhancementProp, Provider, defaultValue } from './context';

import { getDisplayName } from './helpers';

export const wrapWithProvider = function<Props>(
  ComposedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> {
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
