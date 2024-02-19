# Quoting Bad API

This app is the back-end server for my Breaking Bad trivia app, [Quoting Bad](https://github.com/richardltyler/quoting-bad).

## Raison d'etre

The frontend of the app was originally built on the public [Breaking Bad Quotes API](https://breakingbadquotes.xyz/) and another public API to get images that correspond with the characters. However, one of those api's has been deprecated, so I rebuilt it using the [character data that glitchedmob has posted here](https://gist.github.com/glitchedmob/373e1ebf69d2c90cbf1a98322b0d77b7). This new api takes in the `quotes` api and adds corresponding `character` id's based on the `character` information stored in this app. That way, the `quotes` and `characters` will by in sync.

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

| url                      | verb | options    | sample response                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ---- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/v1/characters`     | GET  | not needed | Array of all characters: `{characters: [{ char_id: 1, name: "Walter White", image: "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg"}]}`                                                                                                                                                                                         |
| `/api/v1/characters/:id` | GET  | not needed | gets a specific character: `{character: { char_id: 1, name: "Walter White", birthday: "09-07-1958", occupation: ["High School Chemistry Teacher", "Meth King Pin"], 04/cast_bb_700x1000_walter-white-lg.jpg", status: "Presumed dead", nickname: "Heisenberg", appearance: [1, 2, 3, 4, 5], portrayed: "Bryan Cranston", category: "Breaking Bad", better_call_saul_appearance: [], }}` |
| `/api/v1/quotes`         | GET  | not needed | Array of 10 random quotes: `{quotes: [{"quote": "To all law enforcement entities, this is not an admission of guilt.", "author": "Walter White"}]}`                                                                                                                                                                                                                                     |

Note: All of these endpoints will return semantic errors if something is wrong with the request.
