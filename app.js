const axios = require("axios");
const express = require("express");
const cors = require("cors");
const charactersData = require("./characters");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.locals.characters = charactersData;
app.locals.HANK = {
  name: "HENRY SCHRADER",
  nickname: "HANK SCHRADER",
};
app.locals.FLY = {
  name: "THE FLY",
};
app.locals.STEPHEN_KING = {
  name: "STEPHEN KING",
};

const getCharacterByName = (name) => {
  // public api names are different than local api names
  if (name.toUpperCase() === app.locals.HANK.nickname) {
    return charactersData.find(
      (character) => character.name.toUpperCase() === app.locals.HANK.name
    );
  }

  return charactersData.find(
    (character) =>
      character.name.toUpperCase() === name.toUpperCase() ||
      character.nickname.toUpperCase() === name.toUpperCase()
  );
};

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/v1/quotes", async (req, res) => {
  try {
    // game is limited to 10 quotes.
    // We get 12 so that we can filter out any quotes from the fly or stephen king, characters that we do not have data for.
    const response = await axios.get(
      "https://api.breakingbadquotes.xyz/v1/quotes/12"
    );

    const filteredData = response.data.filter(
      (quote) =>
        quote.author.toUpperCase() !== app.locals.FLY.name &&
        quote.author.toUpperCase() !== app.locals.STEPHEN_KING.name
    );

    const transformedData = filteredData.map((quote) => {
      const character = getCharacterByName(quote.author);

      if (character) {
        return {
          ...quote,
          author: {
            id: character.char_id,
            name: character.name,
            image: character.image
          },
        };
      } else {
        res.status(404).send(`No characters found for author ${quote.author}`);
      }
    });

    const firstTenQuotes =
      transformedData.length > 10
        ? transformedData.slice(0, 10)
        : transformedData;

    res.json({ quotes: firstTenQuotes });
  } catch {
    res.status(404).send("Failed to load quotes.");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
