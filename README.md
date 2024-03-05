# Quoting Bad API

This app is the back-end server for my Breaking Bad trivia app, [Quoting Bad](https://github.com/richardltyler/quoting-bad).

## Raison d'etre

The frontend of the app was originally built on the public [Breaking Bad Quotes API](https://breakingbadquotes.xyz/) and another public API to get images that correspond with the characters. However, one of those api's has been deprecated, so I built this service layer using the [character data that glitchedmob has posted here](https://gist.github.com/glitchedmob/373e1ebf69d2c90cbf1a98322b0d77b7). It adds an image and an id to each quote's author.

## Getting started

### Installation

1. Clone down this repository.
   - `git clone git@github.com:richardltyler/quoting-bad-api.git`
2. Change into the new directory.
   - `cd quoting-bad-api`
3. Install the dependencies.
   - `npm install`

### Usage

1. To fire up the server, run `npm start`.

### Endpoints

| url              | verb | options    | sample response                                                                                                                                                                                                                                                     |
| ---------------- | ---- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/v1/quotes` | GET  | not needed | Array of 10 random quotes: `{quotes: [{"quote": "To all law enforcement entities, this is not an admission of guilt.", "author": "Walter White", image: "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg"}]} |
