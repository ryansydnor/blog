+++
date = "2019-06-26T12:24:42-04:00"
description = "We knew there was friction in our Slack App onboarding experience-we just didn't know what to do about it. FullStory revealed the onboarding experience in a way that made it easy to understand-and gave us an idea how to fix it."
title = "How Grow Used FullStory to Drive an 8X Increase in Onboarding Conversion"
canonical = "https://blog.fullstory.com/how-grow-optimized-onboarding/"
+++

Originally published [here](https://blog.fullstory.com/how-grow-optimized-onboarding/).

Startup [Grow](https://getgrow.io) is a rapidly, well, growing platform for personal growth. The Grow app facilitates self-awareness and learning by drawing on the wisdom of your team and providing continuous feedback on the communication platforms you use every day.

>We knew there was friction in our Slack App onboarding experience-we just didn’t know what to do about it. FullStory revealed the onboarding experience in a way that made it easy to understand-and gave us an idea how to fix it. <br/><br/>- Ryan Sydnor, Co-Founder of Grow

Grow increased their onboarding conversion rate from 10% to 80% by using FullStory to understand their users’ digital experiences.
Here’s what happened.

## How Do You Optimize Onboarding While Complying With Slack’s App Requirements?

In order to launch the Grow app on [Slack’s app store](https://slack.com/apps/ABQJ20E2Z-grow), Grow knew they needed to comply with [Slack’s best practices](https://api.slack.com/best-practices). Specifically, Slack does not want newly installed apps to announce their presence by spamming the entire workspace. Rather, they want the person who installs the app to be the one who shares it with their team.
In order to install the Grow Slack app, you must approve the app using the following workflow that begins on the Grow website:

<img src="/images/fullstory/flow.png"/>

In Grow’s first onboarding iteration, after someone pressed “Authorize” they were returned to Grow’s landing page on their website and sent this direct message in Slack:

<img src="/images/fullstory/dm.png"/>
*This Slack message triggered after installing the Grow app — but was infrequently engaged with.*

Unfortunately, the Grow product team saw very few people engage with this message-only about 10% of installations.

What was happening? The product team at Grow turned to FullStory. They created a [custom segment](https://blog.fullstory.com/fullstory-segments-search-save-groups-users-events-filters/) filtering for the sessions in which users engaged with the installation process. With these session recordings loaded in FullStory, the Grow team hit “autoplay” and watched as users engaged with the site. What they saw was something like this:

<img src="/images/fullstory/first.gif"/>

While Grow expected users to leave the page immediately-or go idle-they were surprised to find users stuck around … for a while.

Based on observing mouse movements in FullStory and an overall lack of clear direction from users, the product team hypothesized the users simply didn’t know what to do next. The solution? They modified their success banner to include a call to action directing users to the conversation with Grow inside of Slack.

For example, here’s what the new success banner with CTA looked like on Mobile:

<img src="/images/fullstory/mobile.gif"/>
*By adding a clear CTA to the success banner — the banner that displayed after the user installed the Grow App in Slack — users now had clear direction about what to do next.*

Grow saw a 35% click through rate on this call to action. There was only one problem: While this 3X+ improvement was a healthy improvement, only 25% of users engaged with the tutorial or shared Grow with their team.

There was still more work to do.

## Find and Fix Friction and Grow Onboarding Conversions

Grow decided to take a more drastic approach in helping the installer of Grow get started using it with their team.
They began with a new onboarding flow that turned a two-step process (Go to Slack → Share message with team) into a one-step process. They also eliminated any and all distractions from the page.

<img src="/images/fullstory/final.gif"/>
*Grow’s revamped return page seen after installing the Slack App. This page removed distractions and reduced the steps required to share the Grow app on Slack. This reduced friction and improved conversions.*

Removing friction in Grow’s Slack app onboarding resulted in an 80% conversion rate: People shared Grow’s welcome message with their team and their team did the tutorial.

Most importantly, Grow has seen increased long-term engagement.

## Analyzing Digital Experiences From Site to Slack and Back With FullStory and Stackdriver

Because Grow’s optimization journey jumped across two different digital experiences-their site and Slack-the product team required a way to measure results that spanned both of these experiences. That’s why Grow used a combination of FullStory and their own custom product metrics built on Google Cloud Platform’s Stackdriver.
Using this setup, Grow relied on FullStory for all web-based user interaction analysis. For example, Grow built a segment in FullStory that contained all post-install session recordings in order to analyze post-install onboarding on the site. Once someone moved to Slack, Grow bridged the gap with custom code, enabling them to measure user actions in Slack with Stackdriver.

## Keep on Growing

FullStory complemented Grow’s time-intensive user testing with both qualitative and quantitative insights. FullStory enabled Grow to iterate their onboarding experience multiple times over the course of just a few weeks and, as a result, improved the personal growth journeys of more people around the world.
Grow couldn’t have made this amazing progress without [FullStory](https://www.fullstory.com/).

Are you at a startup that wants these sorts of qualitative and quantitative insights? Check out [FullStory’s startup scholarship program](https://www.fullstory.com/startup). And if your team is values learning and growing together, consider adding [Grow](https://getgrow.io) to your Slack channel!
