"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async (url) => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchRecipe();
};

const listScraper = async (url) => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchLinksList();
};

module.exports = recipeScraper;

const url =
  "https://www.jamieoliver.com/recipes/pancake-recipes/crispy-rice-pancakes/";

// recipeScraper(url)
//   .then((recipe) => {
//     console.log(recipe);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const linksUrl =
  "https://www.jamieoliver.com/recipes/category/course/breakfast/";

listScraper(linksUrl)
  .then((recipe) => {
    console.log(recipe.length);
  })
  .catch((e) => {
    console.log(e);
  });
