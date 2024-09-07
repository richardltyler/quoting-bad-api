const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.locals.HANK = {
  name: "HENRY SCHRADER",
  nickname: "Hank Schrader",
};
app.locals.HECTOR = {
  name: "HECTOR SALAMANCA",
  nickname: "Tio Salamanca",
};
app.locals.JUNIOR = {
  name: "WALTER WHITE JR.",
  nickname: "Walter White Jr",
};
app.locals.TODD = {
  name: "Todd Alquist",
  nickname: "TODD",
};
app.locals.FLY = {
  name: "THE FLY",
};
app.locals.STEPHEN_KING = {
  name: "STEPHEN KING",
};

const getCharacterByName = (name, characterList) => {
  return characterList.find(
    (character) =>
      character.name.toUpperCase() === name.toUpperCase() ||
      character.nickname.toUpperCase() === name.toUpperCase()
  );
};

const transformCharacters = (characterList) => {
  // public api names are different than local api names
  const transformedCharacters = characterList.map((char) => {
    if (char.name.toUpperCase() === app.locals.HANK.name) {
      char.name = app.locals.HANK.nickname;
    }

    if (char.name.toUpperCase() === app.locals.HECTOR.name) {
      char.name = app.locals.HECTOR.nickname;
    }

    if (char.name.toUpperCase() === app.locals.JUNIOR.name) {
      char.name = app.locals.JUNIOR.nickname;
    }

    return char;
  });

  return transformedCharacters;
};

const transformQuotes = (quotesList, charactersList, res) => {
  const filteredData = quotesList.filter(
    (quote) =>
      quote.author.toUpperCase() !== app.locals.FLY.name &&
      quote.author.toUpperCase() !== app.locals.STEPHEN_KING.name
  );

  const transformedData = filteredData.map((quote) => {
    // I mean you GOTTA account for Todd amirite?
    if (quote.author.toUpperCase() === app.locals.TODD.nickname) {
      quote.author = app.locals.TODD.name;
    }
    const character = getCharacterByName(quote.author, charactersList);

    if (character) {
      const finalResponse = {
        ...quote,
        author: {
          id: character.char_id,
          name: character.name,
          image: character.img,
        },
      };

      return finalResponse;
    } else {
      console.error(`No characters found for author ${quote.author}`);
      return {};
    }
  });

  return transformedData;
};

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/v1/quotes", async (req, res) => {
  try {
    // game is limited to 10 quotes.
    // We get 12 so that we can filter out any quotes from the fly or stephen king, characters that we do not have data for.
    const quotesResponse = await axios.get(
      "https://api.breakingbadquotes.xyz/v1/quotes/12"
    );

    const charactersResponse = await axios.get(
      "https://gist.githubusercontent.com/glitchedmob/373e1ebf69d2c90cbf1a98322b0d77b7/raw/2ab6ab26f6dd9b763ff9fe725454ed7e4492f80d/breakingbadcharacters.json"
    );

    const transformedCharacters = transformCharacters(charactersResponse.data);
    const transformedData = transformQuotes(
      quotesResponse.data,
      transformedCharacters,
      res
    );

    const firstTenQuotes =
      transformedData.length > 10
        ? transformedData.slice(0, 10)
        : transformedData;

    res.json({ quotes: firstTenQuotes });
  } catch (error) {
    res.status(404).send("Failed to load quotes.");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
