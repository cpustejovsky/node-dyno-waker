# Dyno Waker

Designed to keep Heroku free tier dynos wake from 6:00am to 9:00pm EST

I've found that you can keep two or three dynos awake with this schedule without going over Heroku's alotted hours.

## Set Up

To use run `npm i dyno-waker`

Next, require into your application:
`const dynoWaker = require("dyno-waker");`

## Run

Then call it in your application:
`dynoWaker("<dyno>","<dyno>", "<dyno>")`

`"<dyno>"` would be the prefix of your heroku url

For example, with my app's url (`https://life-together-calculator.herokuapp.com/`), I would pass in `"life-together-calculator"`