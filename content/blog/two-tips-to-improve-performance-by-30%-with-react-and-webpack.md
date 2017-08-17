+++
date = "2017-08-17T07:11:54-04:00"
description = "In this post I'll talk about the front-end optimizations TpT made to boost webpagetest Speedindex performance by 30%!"
title = "Two Tips to Improve Performance by 30% with React and Webpack"

+++

Originally posted [here](http://engineering.teacherspayteachers.com/2017/08/16/two-tips-to-improve-performance-by-30-with-react-and-webpack.html).

At Teachers Pay Teachers, we take performance seriously since it is widely accepted that [performance delights users](https://blog.kissmetrics.com/loading-time/), [increases search engine rankings](https://moz.com/blog/how-website-speed-actually-impacts-search-ranking) and [improves conversion rate](http://blog.catchpoint.com/2017/01/06/performance-impact-revenue-real/). In this post, we’ll talk about the front-end optimizations we’ve made to our [recently updated product page](/blog/challenges-faced-while-scaling-to-serve-millions-of-views-per-day/) to boost our [webpagetest Speedindex](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) performance by 30%!

<img src="/images/product-page-performance/prod-page-filmstrip.gif" />

We use [React](engineering.teacherspayteachers.com/2017-08-02-why-we-chose-react-to-help-serve-millions-of-educators.html) and [Webpack](https://webpack.js.org/) to bundle and execute our JavaScript. We also utilize [server side rendering](https://facebook.github.io/react/docs/react-dom-server.html) to ensure the payload we deliver to the client is already populated with data. We also took advantage of `?react_perf` to [easily identify via flame graphs which components were performance bottlenecks](https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html). (*Note: appending `?react_perf` to your URLs only works in Chrome when NODE_ENV is not set to production.*) Now that you understand the technologies we're using, let's dive into the two tips you can use to optimize your pages!

# Asynchronously Loaded Modules

We use [webpack’s code splitting functionality](https://webpack.js.org/guides/code-splitting/) to create a separate JS bundle per route of our site. This allows us to ensure we load only the JS that’s required for displaying a given page. We wanted to take this one step further and initially load the bare minimum that’s required for displaying immediately visible content on the page and defer loading everything else until later.

Additionally, we found an awesome library called [react-async-component](https://github.com/ctrlplusb/react-async-component) that allows us to split certain parts of the page into their own, separate, JavaScript bundles. Here’s an example:

<script src="https://gist.github.com/ryansydnor/a6a1bf08bbb1c188e716fc698874730b.js"></script>

Which makes it super simple to replace existing components. Just swap this:

```javascript
import DialogModalPrefab from 'DialogModalPrefab';
<DialogModalPrefab />
```

with this:

```javascript
import DialogModalPrefabAsync from 'DialogModalPrefabAsync';
<DialogModalPrefabAsync />
```
*If you’re wondering what that `/* webpackChunkName */` comment is about, check out the docs for webpack’s [import](https://webpack.js.org/api/module-methods/#import-) and [output](https://webpack.js.org/configuration/output/#output-chunkfilename) .*

## Decrease Bundle Size

By loading the bare minimum that’s required for displaying immediately visible content on the page and loading everything else asynchronously, we were able to shrink our page specific bundle by 177 KB (44 KB [gzipped](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)). This decrease in initial bundle size means [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) happens sooner. This is because the entire page is blocked while parsing and executing its required JavaScript - including components that are [below the fold](https://www.optimizely.com/optimization-glossary/below-the-fold/) or not visible until interaction! We took our page bundle from this:

<img src="/images/product-page-performance/page-bundle-before.png" />

To this:

<img src="/images/product-page-performance/page-bundle-after.png" />

## Lower Time to first Byte

Loading bundles asynchronously also reduces the amount of time spent server side rendering (we use `serverMode: ‘defer’` in [react-async-component](https://github.com/ctrlplusb/react-async-component#arguments)) as there is a shallower component hierarchy to parse and render. This leads to a reduction in time to first byte which ultimately allows our users to interact with our pages more quickly.

<img src="/images/product-page-performance/asyncttfb.png" />

*Each one of the vertical lines is a deployment of another asynchronous bundle.*


# Should Component Update

React provides a [component lifecycle hook called `shouldComponentUpdate`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate) that allows us to short-circuit unnecessary renders. We have a number of high level components that are responsible for fetching data. Whenever new data is fetched, it triggers a render of all of its children. Rendering all children due to a single piece of data updating can be costly and unnecessary when the fetched data doesn’t modify the layout. Fortunately, with a couple of strategically placed `shouldComponentUpdate`s we were able to reduce the amount of time spent in scripting, layout, and painting considerably. Here is a zoomed in view of a 32ms improvement due to `shouldComponentUpdate`.

Before:

<img src="/images/product-page-performance/shouldComponentUpdateFlamegraph-before.png" />

After:

<img src="/images/product-page-performance/shouldComponentUpdateFlamegraph-after.jpg" />


Given JavaScript runs on a single thread in an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), yielding control flow back to the browser as soon as possible makes the page feel snappier as it’s able to immediately respond to user input.


# Every little win counts

Over the past 90 days, [Speedcurve](speedcurve.com) has recorded a 30% improvement in our [speed index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index).

<img src="/images/product-page-performance/speedindex.jpg" />

While we’ve made some [backend optimizations in our Elixir API](/blog/reducing-elixir-backend-time-from-120ms-to-20ms-with-parallelization/), these front-end optimizations have been much more substantial! Remember, when it comes to performance, every little win counts!

I want to give a special shout out to [Peleg](https://github.com/peleg), [Stephen](https://github.com/stephenkao), and [Tim](https://github.com/tmickel) of TpT's web platform team for building the infrastructure that made all of this possible!

