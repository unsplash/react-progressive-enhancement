import * as React from 'react';

export type ProgressiveEnhancementProp = {
  isEnhanced: boolean;
};

export const defaultValue: ProgressiveEnhancementProp = {
  isEnhanced: false,
};

export const context = React.createContext(defaultValue);

context.displayName = 'ProgressiveEnhancementContext';
