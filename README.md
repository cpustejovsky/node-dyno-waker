# Dyno Waker

Designed to keep Heroku free tier dynos wake from 6:00am to 9:00pm EST

I've found that you can keep two or three dynos awake with this schedule without going over Heroku's alotted hours.

## Set Up

To use run `npm i cpustejovsky-dyno-waker`

Next, require into your application:
`const dynoWaker = require("cpustejovsky-dyno-waker");`

## Run

Create an array of dynos you want to use like so:
`let dynos = [<dyno>, <dyno>, <dyno>]`

`<dyno>` would be the prefix of your heroku url

For example, with my app's url (`https://life-together-calculator.herokuapp.com/`), I would pass in `"life-together-calculator"`

Then call pass your array of dynos and a timezone and call it in your application:
`dynoWaker(dynos, "America/New_York")`

If you do not provide a timezone, dynoWaker will default to `"America/New_York"`
