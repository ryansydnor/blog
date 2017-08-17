+++
date = "2017-06-20T22:59:45-04:00"
description = "TpT's product page receives ~2 million pages views per day making it the most heavily trafficked page on TpT. We decided to use a simple UI refresh as an opportunity to migrate the page to our new tech stack. This post dives deeply into the challenges we overcame while scaling the product page on our new infrastructure!"
title = "Challenges faced while scaling to serve millions of views per day on AWS using Kubernetes, React, PHP, and Elixir"

+++

<!-- stolen from here: https://codepen.io/jplhomer/pen/lgfus -->
<style type="text/css">
h1, h2, h3 {
  font-weight: 300;
}

.timeline {
  position: relative;
  overflow: auto;
}
.timeline:before {
  content: '';
  position: absolute;
  height: 100%;
  width: 5px;
  background: #0AA96C;
  left: 0;
}
.timeline h2 {
  background: #0AA96C;
  border-radius: 25px;
  color: white;
  max-width: 6em;
  margin: 0 auto 1em;
  padding: 0.5em;
  text-align: center;
  position: relative;
  clear: both;
}
.timeline ul {
  list-style: none;
  list-style-type: none;
  padding: 0 0 0 1em;
  z-index: 1;
}
.timeline li {
  background: #dddddd;
  list-style-type: none;
  border-radius: 25px;
  padding: 1em;
  margin-bottom: 1em;
  position: relative;
}
.timeline li:before {
  content: '';
  width: 0;
  height: 0;
  border-top: 1em solid #dddddd;
  border-left: 1em solid transparent;
  position: absolute;
  left: 0em;
  top: 0px;
}
.timeline h3 {
  margin: 0;
}
.timeline time {
  font-style: italic;
  padding-bottom: 20px;
}

@media screen and (min-width: 40em) {
  .timeline:before {
    left: 50%;
  }
  .timeline ul {
    padding-left: 0;
    margin: 0 auto;
  }
  .timeline li {
    width: 42%;
  }
  .timeline li:nth-child(even) {
    float: right;
    margin-top: 2em;
  }
  .timeline li:nth-child(odd) {
    float: left;
  }
  .timeline li:nth-child(odd):before {
    border-top: 1em solid #dddddd;
    border-right: 1em solid transparent;
    right: 0;
    left: auto;
  }
  .timeline li:nth-of-type(2n+1) {
    clear: both;
  }
}
</style>

Originally posted [here](http://engineering.teacherspayteachers.com/2017/06/05/challenges-faced-while-scaling-to-serve-millions-of-views-per-day.html).
 
Here at Teachers Pay Teachers (or TpT, as we call it) we’ve been in the process of migrating our website from a PHP monolith to a [microservice based architecture](https://en.wikipedia.org/wiki/Microservices) utilizing [React](https://facebook.github.io/react/), [Phoenix](http://www.phoenixframework.org/) and [GraphQL](http://graphql.org/). To date, this migration has delighted our community of educators with it’s myriad of UX improvements. We're able to objectively measure these improvements with our [A/B testing infrastructure](/blog/ab-testing-using-react-graphql-apollo/) which also enables us to gradually expose functionality to broader and broader levels of traffic. 

Our product page receives ~2 million pages views per day making it the most heavily trafficked page on TpT  (here’s an [example page](https://www.teacherspayteachers.com/Product/HUGE-FREEBIE-School-Favorites-Creative-Clips-Digital-Clipart-1295389)). We decided to use a simple UI refresh as an opportunity to migrate the page to our new tech stack. This post dives deeply into the challenges we overcame while scaling the product page on our new infrastructure! 
 
<br/>

# Timeline of key milestones

<br/>

<div class="timeline">
<h2>March</h2>

<ul>
  <li>
    <h3>Add feature flag</h3>
    <time>March 2nd</time>
    <p>Set up our infrastructure to support routing between the new page and old page based on a feature flag. Opt-in the core team.</p>
  </li>
  <li>
    <h3>Add Administrators</h3>
    <time>March 8th</time>
    <p>Most of our employees internally are administrators on the site. We opt in all employees to the new experience and encourage them to help us stress test!</p>
  </li>
  <li>
    <h3>Begin adding BETA users</h3>
    <time>March 22nd</time>
    <p>We've told our community about the upcoming changes and some of them volunteer to help us work out the kinks. Opt in approximately 500 beta users and begin collecting feedback.</p>
  </li>
</ul>

<h2>April</h2>
<ul>
  <li>
    <h3>1% of all traffic</h3>
    <time>April 11th</time>
    <p>We release to 1% of all traffic. Everything looks good!</p>
  </li>
  <li>
    <h3>5% of traffic</h3>
    <time>April 12th</time>
    <p>We start to see a couple of new JavaScript errors come in and fix the browser compatibility issues quickly.</p>
  </li>
  <li>
    <h3><a href="#routing-issues">Routing issues</a></h3>
    <time>April 13th</time>
    <p>We see some sporadic 500s coming in and determine there are some <a href="#routing-issues">routing issues</a> that we need to work out.</p>
  </li>
  <li>
    <h3>20% of traffic</h3>
    <time>April 18th</time>
    <p>Now that the routing issues are under control, we ramp up a bit more and things are looking good!</p>
  </li>
  <li>
    <h3>30% of traffic</h3>
    <time>April 19th</time>
    <p>Things look good!</p>
  </li>
  <li>
    <h3>40% of traffic</h3>
    <time>April 20th</time>
    <p>Things are looking good...</p>
  </li>
  <li>
    <h3><a href="#periodic-504s-from-our-elixir-graph-api">Ramp down to 10% of traffic</a></h3>
    <time>April 20th</time>
    <p>During our morning traffic spike, we began seeing a <a href="#periodic-504s-from-our-elixir-graph-api">steady stream of 504s from our Elixir Graph API</a> Better scale back and dig in.</p>
  </li>
  <li>
    <h3>50% of traffic</h3>
    <time>April 27th</time>
    <p>Once we resolved the 504s issue, we slowly ramped back up to 50%.</p>
  </li>
</ul>

<h2>May</h2>
<ul>
  <li>
    <h3><a href="#resizable-image-server-overload">Resizable image server CPU overload</a></h3>
    <time>May 1st</time>
    <p>We were seeing <a href="#resizable-image-server overload">extremely high CPU on our servers that dynamically resized images.</a></p>
  </li>
  <li>
    <h3>Ramp down to 0% for the sale</h3>
    <time>May 5th</time>
    <p>With our Teacher Appreciation sale right around the corner, we didn't want to risk anything going wrong due to unknown unknowns in dealing with the heavy traffic generated during the sale.</p>
  </li>
  <li>
    <h3><a href="#s-under-load">500s under load at 60%</a></h3>
    <time>May 18th</time>
    <p>We brought traffic back up after the sale and thought we were in the clear until we had a <a href="#s-under-load">surge of traffic in the evening that threw a couple hundred errors. We ramped back down to 50% to investigate.</a></p>
  </li>
  <li>
    <h3><a href="#spikes-of-errors-just-after-scaling">Spikes of errors just after scaling</a></h3>
    <time>May 22nd</time>
    <p>After scaling back up by just 5% from 50->55%, we saw approximately 200 errors occur. We wrote them off as deployment artifacts. When we decided to continue scaling from 55->60% and  saw approximately 1500 errors occur, we decided to <a href="#spikes-of-errors-just-after-scaling">dig into the spikes of errors.</a></p>
  </li>
  <li>
    <h3><b>100%</b></h3>
    <time>May 26th</time>
    <p>Once we resolved the issues that occurred immediately after scaling, we were able to scale from 60->100% over the course of a single day!</p>
  </li>
</ul>
</div>
<br/><br/>
 
 
## Product Page Architecture

To help put the scaling challenges in the context of their broader technical architecture, here are the core services that drive our product page: 
 
<img src="/images/scaling-prod-page/arch.png"/>


## Routing Issues

In our switch from [nginx](https://www.nginx.com/resources/wiki/) and [CakePHP](https://cakephp.org/) over to [react-router](https://github.com/ReactTraining/react-router), there were a few cases that started causing us trouble at 5% of traffic.

1. Products that had been renamed
2. URLs with more than one /
3. URLs with special characters 
 
#### Products that had been renamed

In our code base, when a product's title changes, its canonical URL "slug" is updated at the same time. We store these records in a database and had forgotten to incorporate logic that only retrieved the "latest" title. The fix was relatively straightforward, as detailed in this diff:

<img src="/images/scaling-prod-page/slugresolution.png"/>
 
 
#### URLs with more than one /

Using react router, it was relatively straightforward to handle malformed URLs. We simply added another route which would greedily capture another segment and disregard it, as in the following example:

<img src="/images/scaling-prod-page/react-router.png"/>

#### URLs with special characters

We had a regex replacement that didn't account for unicode characters in our API. This simple diff solved the problem for us:

<img src="/images/scaling-prod-page/unicode.png"/>
 

<br/>

## Periodic 504s from our Elixir Graph API

Everything was smooth sailing until we had approximately 30% of traffic on the new page. We saw a very slow trickle of 504s being thrown by our Elixir Graph API - but nothing so far out of the ordinary that there was something actionable to do. Once we ramped up to 40%, we started seeing errors occur at a similarly sporadic rate but in much higher volumes. We ramped back to 10% to give ourselves some breathing room and started digging into our data. Here’s what we saw after the rollout:

<img src="/images/scaling-prod-page/periodic504s.png"/>
*This [Sumologic](https://www.sumologic.com/) query shows the number of 504s flowing through our outermost load balancer*

One of the most interesting pieces of data from this graph was that the request durations for those that returned 504s was extremely low - on the order of .1 seconds, far faster than the requested endpoint would ever realistically return. 

<img src="/images/scaling-prod-page/504requesttime.png"/>

[Shanti](https://github.com/shantiii), a key member of our API team, theorized that some connections were never being successfully established. This theory was corroborated by the fact there were no traces of failed requests in our API metrics. She narrowed down the issues to two key areas:

1. The maximum number of connections allowed by Phoenix
2. Connections never making it past the ELB
 
To fix the first problem, we simply updated the number of acceptors from the [default value](https://github.com/elixir-lang/plug/blob/bcf60c854c1e6f2a8701617fd7a0efb9c9b11ddd/lib/plug/adapters/cowboy.ex#L14) in [Cowboy](https://github.com/ninenines/cowboy) from 100 to 150. 

To remediate the second issue we changed the ELB idle timeout. We configured the ELB to close a connection BEFORE the backend closes a connection. The result of this change is that a client would not connect to an ELB that had already closed it’s connection to the backend, as per [Amazon’s docs related to HTTP 504s](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/ts-elb-error-message.html#ts-elb-errorcodes-http504).
 
<img src="/images/scaling-prod-page/acceptorsandtimeout.png" />

<br/>

## Resizable Image Server Overload

Our Elixir Graph API exposes functionality that allows us to return dynamically sized images per request. The backing infrastructure to support this consists of CDN backed by a cluster of EC2 instances. As we ran our A/B test at 50% of traffic, we began to hear the fans of our EC2 instances whirring through this graph:

<img src="/images/scaling-prod-page/thumbserver.png"/>

We realized that a number of pages were using slightly different sizes of the same underlying images due to a divergent code path in our API. [Greg Thompson](https://github.com/GTDev87), the core developer of the product page team, helped consolidate code paths and cleaned up 700 lines of code in the process! Once we standardized on a size across multiple pages of our site (and added a couple of servers for good measure) we saw cache hits increase and load on the servers decrease. Here’s a graph that clearly shows an order of magnitude decrease in the total number of requests hitting the thumbnail server load balancer as well as the number of invalid requests (green and blue areas, respectively):

<img src="/images/scaling-prod-page/thumbserverrequests.png"/>

<br/>

## 500s under load

One evening after ramping to 60% and subsequently receiving an unusually high amount of traffic we saw a proportional amount of errors. We rolled back traffic and began to investigate. What we discovered was that the our Elixir Graph API AWS ELB had a surge queue during the time period of our errors.

<img src="/images/scaling-prod-page/surge-queue.png" />
 
After digging more deeply into these issues, [Lucas](https://github.com/lchi), our Infrastructure and Automation Technical Lead, discovered that by default the Kubernetes integration with AWS does not set up cross zone load balancing. A simple configuration fix was all it took to alleviate this issue.

<img src="/images/scaling-prod-page/cross-zone.png" />


<br/>

## Spikes of errors just after scaling

We made it back to 60% after fixing our cross zone load balancing issue! Huzzah! Now let’s go to 65%.... Uh oh! For a few minutes after scaling, we saw some issues...but then everything cleared up. 

<img src="/images/scaling-prod-page/500spike.png" />

When we looked into our graphs, there were a ton of red herrings (number of open connections to Elasticache from the mobile API, number of DB threads locking, number of 500s from our outermost load balancer) but one stood out as very strange:

<img src="/images/scaling-prod-page/albrequestcount.png" />

What this said to us was that our PHP API based on Amp was failing to establish a connection to our Laravel PHP API. This theory was confirmed by [Bugsnag](https://www.bugsnag.com/), which had a spike in reports of the following error:

<img src="/images/scaling-prod-page/timeout.png" />

 
To provide a little more context, one of our PHP APIs uses an open source PHP library called [Amp](https://github.com/amphp/amp). We leverage Amp to make multiple concurrent connections to our Laravel PHP API and stitch together results from various endpoints in parallel.
 
Our initial plan of attack was to modify some configurations in Amp that would allow us to more effectively use connections we’d already opened. Most notably, we modified the number of simultaneous connections available to us as well as the keepalive on those connections:
 
<img src="/images/scaling-prod-page/ampconfig.png"/>
 
Unfortunately, we were still seeing issues with this configuration. We then decided to do use [tcpdump](https://en.wikipedia.org/wiki/Tcpdump) on one of our Amp based API servers. `tcpdump` revealed to [Peleg](https://github.com/peleg), a core member of our web platform team, that the API was making somewhere between 10-30 DNS requests per HTTP request! We discussed various solutions (using the OS DNS resolution, caching via memcache, updating the cache outside of the app, etc.) but eventually landed on [a simple one line change that would allow us to reduce the number of DNS requests upstream by approximately 10x]( https://github.com/amphp/dns/pull/56). 

<img src="/images/scaling-prod-page/ampcache.png"/>

This change simply cached the requested record type, rather than the resolved response. Once we rolled this change out to our mobile api, we were able to scale from 60% to 100% over the course of a single day without any issues!


<br/>

## Wrapping Up

Now that we've solidly landed on our new infrastructure, we've been able to really accelerate our product iteration velocity as well as our [backend](/blog/reducing-elixir-backend-time-from-120ms-to-20ms-with-parallelization/) and [front-end](/blog/two-tips-to-improve-performance-by-30-with-react-and-webpack) performance. We already have a number of experiments running on the new product page and are excited about improving our ability to help educators around the world as a result.

This was one of the most collaborative projects I've ever had the pleasure of working on. Every single engineer at Teachers Pay Teachers helped us accomplish this!