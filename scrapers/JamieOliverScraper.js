"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

class JamieOliverScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "jamieoliver.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { specialDiets, time, tags, ingredients, instructions } = this.recipe;
    this.recipe.name = $(".single-recipe-details h1").text();
    this.recipe.subName = $(".single-recipe-details p").text();

    $(
      ".single-recipe-details .float-wrapper .special-diets-wrapper .special-diets-list li a .full-name"
    ).each((i, el) => {
      const specialDiet = $(el).text().replace(/\s\s+/g, " ").trim();
      if (specialDiet !== "") {
        specialDiets.push(specialDiet);
      }
    });

    this.recipe.metaDescription = $("meta[property='og:description']").attr(
      "content"
    );

    this.recipe.description = $(".recipe-intro")
      .text()
      .replace(/\s\s+/g, " ")
      .replace(/\"/g, "")
      .trim();

    this.recipe.servings = $(".recipe-detail.serves")
      .text()
      .replace(/\s\s+/g, " ")
      .replace("Serves Serves", "")
      .trim();

    time.cook = $(".recipe-detail.time")
      .text()
      .replace("Cooks In", "")
      .replace("Time", "")
      .replace(/\s\s+/g, " ")
      .trim();

    time.total = time.cook;

    this.recipe.difficulty = $(".recipe-detail.difficulty")
      .text()
      .replace(/\s\s+/g, " ")
      .replace("Difficulty", "")
      .trim();

    $(".tags-list a").each((i, el) => {
      const tag = $(el).text().replace(/\s\s+/g, " ").trim();
      if (tag !== "") {
        tags.push(tag);
      }
    });

    $("ul.ingred-list li").each((i, el) => {
      const item = $(el).text().replace(/\s\s+/g, " ").trim();
      if (item !== "") {
        ingredients.push(item);
      }
    });

    $("ol.recipeSteps li").each((i, el) => {
      const step = $(el).text().replace(/\s\s+/g, " ").trim();
      if (step !== "") {
        instructions.push(step);
      }
    });

    this.recipe.imageAlt = $(".recipe-header-left .hero-wrapper img").attr(
      "alt"
    );
  }

  getList($) {
    $(
      ".row.recipe-row.infinite-scroll div.col-lg-4.col-md-6.col-xs-6.col-sm-6.recipe-col.item div.recipe-block a"
    )
      // .slice(0, 20)
      .each((i, el) => {
        this.recipe.push("https://www.jamieoliver.com" + $(el).attr("href"));
      });
  }
}

module.exports = JamieOliverScraper;
