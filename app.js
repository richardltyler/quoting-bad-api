const axios = require("axios");
const express = require("express");
const cors = require("cors");
const charactersData = require("./characters");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.locals.characters = charactersData;

const getCharacterByName = (name) =>
  charactersData.find(
    (character) => character.name.toUpperCase() === name.toUpperCase()
  );

const getCharacterById = (id) =>
  charactersData.find((character) => `${character.char_id}` === id);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/v1/quotes", async (req, res) => {
  try {
    // currently limited at 10 quotes
    const response = await axios.get(
      "https://api.breakingbadquotes.xyz/v1/quotes/10"
    );

    const data = response.data;
    const transformedData = data.map((quote) => {
      const characterId = getCharacterByName(quote.author).char_id;

      return {
        ...quote,
        author: {
          id: characterId,
          name: quote.author,
        },
      };
    });

    res.json(transformedData);
  } catch {
    // TODO: error handling
    // what if the name doesn't exist?
  }
});

app.get("/api/v1/characters/:id", (req, res) => {
  // client should encode name to account for spaces
  const requestedId = req.params.id;

  const character = getCharacterById(requestedId);

  res.json(character);
});

app.get("/api/v1/characters", (req, res) => {
  const transformedCharacterList = app.locals.characters.map((char) => ({
    id: char.char_id,
    name: char.name,
    image: char.img,
  }));

  res.json({ characters: transformedCharacterList });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
