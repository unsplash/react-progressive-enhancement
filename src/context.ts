import * as React from 'react';

export type ProgressiveEnhancementProp = {
  isEnhanced: boolean;
};

export const defaultValue: ProgressiveEnhancementProp = {
  isEnhanced: false,
};

const context = React.createContext(defaultValue);

context.displayName = 'ProgressiveEnhancementContext';

const { Provider, Consumer } = context;

export { Provider, Consumer };
