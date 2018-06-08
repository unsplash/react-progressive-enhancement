import * as React from 'react';

export type ProgressiveEnhancementProp = {
  isEnhanced: boolean;
};

export const defaultValue: ProgressiveEnhancementProp = {
  isEnhanced: false,
};

const { Provider, Consumer } = React.createContext(defaultValue);

export { Provider, Consumer };
