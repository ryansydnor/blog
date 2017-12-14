+++
date = "2017-07-05T15:56:55-04:00"
description = "Take a deep dive into TpT's JIRA process and workflow"
title = "How Teachers Pay Teachers Uses JIRA on Product Teams"

+++
<br/>
Originally posted [here](http://engineering.teacherspayteachers.com/2017/05/05/how-teachers-pay-teachers-uses-jira-on-product-teams.html).


At Teachers Pay Teachers (TpT) we put a lot of thought into how to get stuff done effectively<sup>*</sup>. We have a core set of guiding principles: we keep processes lightweight, remind ourselves that perfect is the opposite of good, and we have specific [engineering principles](http://engineering.teacherspayteachers.com/mission-values.html) we follow. We then let each team determine what works most effectively for them. I’m going to lay out how some of our product teams use JIRA to help collaborate, coordinate, and get stuff done. 

As a Technical Lead on one of TpT’s cross functional product teams, I’ve worked on our Professional Development product as well as key pages across our core marketplace. I’d like to share with you a deep dive into the tools ecosystem we’ve used to successfully deliver new products to our amazing community of educators. 

Our core team consists of a technical lead, five engineers (some are remote), a product manager, a [designer](http://tpt.design/) and a [community specialist](http://blog.teacherspayteachers.com/meet-tpts-community-team-introduce-yourself/). We also get lots of help from core engineering teams (infrastructure, API, web platform), our QA team (based in India), and sometimes even the legal department! Coordinating work across continents amongst such a diverse set of people is the challenge that we’re facing. We’ve been iterating on solutions by finding a good meeting cadence with some great tools to make sure those meetings are effective.

We follow a relatively standard agile workflow - weekly planning meetings where we calibrate our short term goals, daily standups, and weekly retrospectives. We also have quarterly planning meetings to realign and adjust our higher level goals ([OKRs](https://en.wikipedia.org/wiki/OKR)).

Finding tools that would enable us to easily collaborate without incurring overhead was one of our primary goals. This ties back to one of our overarching principles: keep processes lightweight. Currently we’re using the following ecosystem of tools:

1. [JIRA](https://www.atlassian.com/software/JIRA) - task tracking
2. [Slack](https://slack.com/) & [Jirio](https://jirioslackapp.com/) - central communication hub
3. Github - version control

We modeled our OKRs in JIRA with the following relationships: Objective:Epic, Key Result:Task, work related to a Key Result:Sub-Task. This hierarchy makes it easy to see how our daily work ladders up into our high level objectives. We use a Kanban board with swimlanes and the following columns: To Do, In Progress, In Review, QA, and Done.

<img src="/images/jira/jira_kanban_board.png" />


JIRA is incredibly configurable, so we simplified our tickets to only “Name,” “Description,” “Assignee,” and “Epic Link” fields so that creating tickets is a seamless process.

When you have your entire team “living in tickets”, everyone becomes more efficient. If you’re an engineer, you [tag PRs and commits with JIRA ticket IDs](https://confluence.atlassian.com/bitbucket/processing-JIRA-software-issues-with-smart-commit-messages-298979931.html) so that the code you’re writing is linked to tickets in JIRA. If you’re a Product Manager, you can always ensure that work is happening on the most important initiatives. If you’re in management, you can track the status of high level initiatives with ease! If you’re on the QA team you can easily find features that need testing.

We also use JIRA to help us run our weekly planning meetings. At the beginning of each week our focus for the week is translated into JIRA by pulling items from the Backlog into To Do. At the conclusion of each week, we [release](https://confluence.atlassian.com/agile/JIRA-agile-user-s-guide/releasing-a-version-kanban)<sup>**</sup> to clean the board and generate status updates and provide transparency about what we accomplished to the rest of the organization.

JIRA is at the core of our daily standups. We’ve simplified status updates by using an awesome Slack integration named [Jirio](https://jirioslackapp.com/). We worked together with Sergei, the creator of Jirio, to create [aliases](https://jirioslackapp.com/aliases/). Our most frequently used alias is `/jirio standup` which provides a customized update for each person listing all of the work they did the prior day<sup>***</sup>.

<img src="/images/jira/jira_jirio.png" />



<sup>*</sup> We also put a ton of thought into what to do. To provide some helpful context on how we decide what to work on here at TpT, we use OKRs at both the company and team level. This means our company-wide yearly OKRs help inform our quarterly team objectives which help inform our weekly sprint goals which help inform our day-to-day work. Look for a blog post that details our planning process soon!

<sup>**</sup> We have continuous delivery set up - so a release in JIRA doesn’t actually correspond to a release of functionality but rather a duration of time. 

<sup>***</sup> The [Jirio](https://jirioslackapp.com/) command to set this up is `/jirio setalias standup find project = $$project AND assignee = currentUser() AND modified<=-1d` which assumes `/jirio setdefault :project MYPROJ` was run in that channel.
