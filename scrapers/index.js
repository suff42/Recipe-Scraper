"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async (url) => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchRecipe();
};

module.exports = recipeScraper;

const url =
  "https://www.jamieoliver.com/recipes/pancake-recipes/crispy-rice-pancakes/";

recipeScraper(url)
  .then((recipe) => {
    console.log(recipe);
  })
  .catch((e) => {
    console.log(e);
  });
