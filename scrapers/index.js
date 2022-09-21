"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");
const fs = require("fs");

const recipeScraper = async (url) => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchRecipe();
};

const listScraper = async (url) => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchLinksList();
};

module.exports = recipeScraper;

/* UNCOMMENT LINES YOU WANT TO SCRAPE
 * MORE THAN 2 AT ONCE IS NOT SUGGESTED
 */
const linksUrls = {
  // mains: "https://www.jamieoliver.com/recipes/category/course/mains/",
  // snacks: "https://www.jamieoliver.com/recipes/category/course/snacks/",
  // mealsForOne:
  //   "https://www.jamieoliver.com/recipes/category/course/meals-for-one/",
  // quickFixes:
  //   "https://www.jamieoliver.com/recipes/category/course/quick-fixes/",
  // cheap: "https://www.jamieoliver.com/recipes/category/course/cheap-cheerful/",
  // breakfast: "https://www.jamieoliver.com/recipes/category/course/breakfast/",
  // leftovers: "https://www.jamieoliver.com/recipes/category/course/leftovers/",
  // onePan:
  // "https://www.jamieoliver.com/recipes/category/course/one-pan-recipes/",
  // juices:
  // "https://www.jamieoliver.com/recipes/category/course/juices-smoothies/",
  // desserts: "https://www.jamieoliver.com/recipes/category/course/desserts/",
  // sides: "https://www.jamieoliver.com/recipes/category/course/sides/",
  // sauces: "https://www.jamieoliver.com/recipes/category/course/sauces/",
  // starters: "https://www.jamieoliver.com/recipes/category/course/starters/",
};

const linksList = {};
const recipesList = {};

const getList = async () => {
  for await (const [key, value] of Object.entries(linksUrls)) {
    await listScraper(value)
      .then((link) => {
        linksList[key] = link;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }
  console.log("1. list obtained");
};

const getRecipes = async () => {
  for await (const [key, value] of Object.entries(linksList)) {
    recipesList[key] = [];
    for (let [index, recipe] of linksList[key].entries()) {
      await getRecipe(recipe, key, index);
    }

    fs.writeFile(key, JSON.stringify(recipesList[key]), "utf-8", (err) => {
      if (err) {
        console.log("error during writing json file");
        return console.log(err);
      }
    });
  }
  console.log("3. recipes obtained");
};

const getRecipe = async (recipe, key, index) => {
  let i = linksList[key].length - index;
  await recipeScraper(recipe)
    .then((recipe) => {
      recipesList[key].push(recipe);
      i--;
      console.log(`${key}: ${i} recipes left`);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {});
};

(async function () {
  await getList();
  await getRecipes();
})();
