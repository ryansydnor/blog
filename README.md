# [Ryan Sydnor](https://ryansydnor.com)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://thebbs.site)

## Local development

Run `hugo server --watch` and browse to `localhost:1313`.

### New post

Run `hugo new blog/my-post-url.md`

### New homepage project

Run `hugo new gallery/mything.md`

### New poem

. .env && node generatePoem.js $'<Title>\n<Line1>\n<Line 2>\n<Line 3>'

## Deployment

This is using a serverless continuous delivery framework called [hugo cd](https://github.com/ryansydnor/hugo-cd). Simply checking new content in to master will deploy files for you.