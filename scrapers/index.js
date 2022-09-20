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

const linksUrls = {
  mains: "https://www.jamieoliver.com/recipes/category/course/mains/",
  snacks: "https://www.jamieoliver.com/recipes/category/course/snacks/",
  mealsForOne:
    "https://www.jamieoliver.com/recipes/category/course/meals-for-one/",
  quickFixes:
    "https://www.jamieoliver.com/recipes/category/course/quick-fixes/",
  cheap: "https://www.jamieoliver.com/recipes/category/course/cheap-cheerful/",
  breakfast: "https://www.jamieoliver.com/recipes/category/course/breakfast/",
  leftovers: "https://www.jamieoliver.com/recipes/category/course/leftovers/",
  onePan:
    "https://www.jamieoliver.com/recipes/category/course/one-pan-recipes/",
  juices:
    "https://www.jamieoliver.com/recipes/category/course/juices-smoothies/",
  desserts: "https://www.jamieoliver.com/recipes/category/course/desserts/",
  sides: "https://www.jamieoliver.com/recipes/category/course/sides/",
  sauces: "https://www.jamieoliver.com/recipes/category/course/sauces/",
  starters: "https://www.jamieoliver.com/recipes/category/course/starters/",
};

listScraper(linksUrl)
  .then((recipe) => {
    console.log(recipe.length);
  })
  .catch((e) => {
    console.log(e);
  });

/*
urls.forEach((url) => {
  recipeScraper(url)
    .then((recipe) => {
      // console.log(recipe);
      breakfast.push(recipe);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      // console.log(breakfast);
      fs.writeFile("recipe.json", JSON.stringify(recipes), "utf8", (err) => {
        if (err) {
          console.log("error during writing json file");
          return console.log(err);
        }
      });
    });
});
*/
