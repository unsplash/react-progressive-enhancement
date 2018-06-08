import { ComponentType } from 'react';

export const getDisplayName = (ComposedComponent: ComponentType<any>) =>
  ComposedComponent.displayName !== undefined ? ComposedComponent.displayName : 'Component';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type ObjectOmit<T extends K, K> = Omit<T, keyof K>;
