# react-progressive-enhancement
_A handy React Context for your SSR needs!_

<a href="https://www.npmjs.org/package/react-progressive-enhancement"><img src="https://img.shields.io/npm/v/react-progressive-enhancement.svg" alt="npm"></a>
[![Build Status](https://travis-ci.com/unsplash/react-progressive-enhancement.svg?branch=master)](https://travis-ci.com/unsplash/react-progressive-enhancement)

TL;DR This React Context sets an `isEnhanced` boolean to `true` on your App's root `componentDidMount`, letting you know that you're on your client's second render (or later). When implementing SSR, this can help you easily avoid duplicate data-fetching requests, but also delay the rendering of components that you can't/don't want to render on the server.

For more info, check out [this blog post](https://medium.com/@samijaber/react-progressive-enhancement-a-handy-react-context-for-your-ssr-conditional-rendering-needs-904f689768cf).

## Features

* No dependencies (other than React ^16.3)
* Written in TypeScript (type-annotated)
* Very simple to use
* Easily extensible through exported `Consumer`/`Provider`

## Install

```bash
yarn add react-progressive-enhancement
# OR
npm install react-progressive-enhancement
```

## Usage

Here's a (rather overly simplistic) example showing how to use all of the HOCs:

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
        {/* This component will only render after the first client-render */}
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
(ComposedComponent: React.Component, options?: { LoadingComponent?: React.Component }) => React.Component
```

An HOC that renders `ComposedComponent` as a progressive-enhancement, i.e. after the first client render. If `LoadingComponent` is provided, it will be rendered until progressive enhancements are enabled.

#### Consumer, Provider
```tsx
React.Context
```

The Context's `Consumer` and `Provider` are exported as well, so that you can easily extend this library as you see fit.
