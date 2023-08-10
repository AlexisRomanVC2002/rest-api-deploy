const express = require("express");
const LANGUAGES_JSON = require("../mocks/languages.json");
const {
  validateLanguage,
  validatePartialLanguage,
} = require("../schemas/languages");
const crypto = require("node:crypto");

const ACCEPTED_ORIGINS = [
  "https://localhost:8080",
  "https://localhost:5500",
  "http://127.0.0.1:5500",
];

const router = express.Router();

router.get("/languages", (req, res) => {
  const origin = req.headers.origin;

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { paradigm, name } = req.query;

  if (paradigm && name)
    return res
      .status(400)
      .json({ message: "La sintaxis de la consulta es incorrecta." });

  if (paradigm) {
    const languagesFiltered = LANGUAGES_JSON.filter((language) =>
      language.paradigms.some(
        (p) => p.toLowerCase() === paradigm.toLocaleLowerCase()
      )
    );

    return res.json(languagesFiltered);
  }

  if (name) {
    const languageFiltered = LANGUAGES_JSON.filter(
      (language) => language.name.toLowerCase() === name.toLowerCase()
    );

    return res.json(languageFiltered);
  }

  res.json(LANGUAGES_JSON);
});

router.get("/languages/:id", (req, res) => {

  const origin = req.headers.origin;

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { id } = req.params;
  const language = LANGUAGES_JSON.find((language) => language.id === id);

  if (!language)
    return res.status(404).json({ message: "Lenguaje no encontrado." });

  res.json(language);
});

router.post("/languages", (req, res) => {

  const origin = req.headers.origin;

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const result = validateLanguage(req.body);

  if (!result.success) return res.status(400).json(result.error);

  const newLanguage = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // Agregando el nuevo lenguaje en memoria nada mas, posteriormente se subira a una base de datos.
  LANGUAGES_JSON.push(newLanguage);

  return res.status(201).json(newLanguage);
});

router.patch("/languages/:id", (req, res) => {

  const origin = req.headers.origin;

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { id } = req.params;

  const indexLanguage = LANGUAGES_JSON.findIndex(
    (language) => language.id === id
  );

  // Si el indice es menor a 0 signicia que no se encontro ningun elemento con el id pasado.
  if (indexLanguage < 0)
    return res.status(404).json({ message: "Lenguaje no encontrado." });

  const result = validatePartialLanguage(req.body);

  if (!result.success) return res.status(400).json(result.error);

  const languageUpdated = {
    ...LANGUAGES_JSON[indexLanguage],
    ...result.data,
  };

  LANGUAGES_JSON[indexLanguage] = languageUpdated;

  return res.status(201).json(languageUpdated);
});

router.delete("/languages/:id", (req, res) => {

  const origin = req.header("origin");

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { id } = req.params;

  const indexLanguage = LANGUAGES_JSON.findIndex(
    (language) => language.id === id
  );

  if (indexLanguage < 0) return res.status(404).json({ message: "Lenguaje no encontrado." });

  const languageRemoved = LANGUAGES_JSON.splice(indexLanguage, 1);

  res.json(languageRemoved);
});

router.options("/languages/:id", (req, res) => {
  
  const origin = req.header("origin");

  if (ACCEPTED_ORIGINS.includes(origin)|| !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  }

  res.sendStatus(200);

});

module.exports = router;
