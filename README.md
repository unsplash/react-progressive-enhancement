# react-progressive-enhancement
_A handy collection of HOCs for universally rendered apps 🤩_

<a href="https://www.npmjs.org/package/react-progressive-enhancement"><img src="https://img.shields.io/npm/v/react-progressive-enhancement.svg" alt="npm"></a>
[![Build Status](https://travis-ci.com/unsplash/react-progressive-enhancement.svg?branch=master)](https://travis-ci.com/unsplash/react-progressive-enhancement)

TL;DR In universally rendered React apps, it is common to branch data-fetching and component-rendering depending on the environment (server or client), and defer rendering (a.k.a. "progressively enhance") some components. However, we must ensure the first client render matches the server render.

This module achieves all the above by tracking whether or not the render mode is "enhanced" with an `isEnhanced` boolean (`true` only after first client render, otherwise `false`), which is accessed through a `withIsEnhanced` HOC. Additionally a `progressivelyEnhanced` HOC is provided which only renders the composed component for enhanced renders.

For more info, check out [this blog post](https://medium.com/unsplash/react-progressive-enhancement-a-handy-collection-of-hocs-for-universally-rendered-apps-904f689768cf).

## Features

* No dependencies (other than React ^16.3)
* Written in TypeScript (type-annotated)
* Easily extensible through the exported React Context's `Consumer` & `Provider`

## Install

```bash
yarn add react-progressive-enhancement
# OR
npm install react-progressive-enhancement
```

## Usage

* Root.jsx:

```jsx
import { enableProgressiveEnhancementsOnMount } from 'react-progressive-enhancement';

const Root = () => (
  <div>
    <PhotoRoute />
  </div>
);

export default enableProgressiveEnhancementsOnMount(Root);
```


* PhotoRoute.jsx:

```jsx
import { withIsEnhanced, progressivelyEnhance } from 'react-progressive-enhancement';

const ProgressivelyEnhancedRelatedContent = progressivelyEnhance(RelatedContent);

class PhotoRoute extends React.Component {
  componentDidMount() {
    const hasDataFromServer = !this.props.isEnhanced;

    if (!hasDataFromServer) {
      this.getPhotoRouteData();
    } else {
      // do nothing, because the server already fetched the data and passed it to the client.
    }
  }

  render() {
    return (
      <div>
        <Photo />
        {/* This component will only render after the first client render */}
        <ProgressivelyEnhancedRelatedContent />
      </div>
    );
  }
}

export default withIsEnhanced(PhotoRoute);
```

## API Reference

#### enableProgressiveEnhancementsOnMount
```tsx
(ComposedComponent: React.Component) => React.Component
```

An HOC that wraps `ComposedComponent` with the Context Provider. `ComposedComponent` should be the root-most Component in your React app.

#### withIsEnhanced
```tsx
(ComposedComponent: React.Component) => React.Component
```

An HOC that provides the `isEnhanced` prop to `ComposedComponent`.

#### progressivelyEnhance
```tsx
(ComposedComponent: React.Component) => React.Component
```

An HOC that defers rendering `ComposedComponent` until after the first client render.

#### Consumer, Provider
```tsx
React.Context
```

The Context's `Consumer` and `Provider` are exported as well, so that you can easily extend this library as you see fit.
