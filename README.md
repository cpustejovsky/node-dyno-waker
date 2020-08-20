# Dyno Waker

Designed to keep Heroku free tier dynos wake from 6:00am to 9:00pm EST

I've found that you can keep two or three dynos awake with this schedule without going over Heroku's alotted hours.

## Set Up

To use run `npm i cpustejovsky-dyno-waker`

Next, require into your application:
`const dynoWaker = require("cpustejovsky-dyno-waker");`

## Run

Then call it in your application:
`dynoWaker("regular","<dyno>","<dyno>", "<dyno>")`

`"<dyno>"` would be the prefix of your heroku url

For example, with my app's url (`https://life-together-calculator.herokuapp.com/`), I would pass in `"life-together-calculator"`

To run it with my [twitter-bot](https://github.com/cpustejovsky/go_twitter_bot), I run `dynoWaker("twitter-bot","<fullURL>")`