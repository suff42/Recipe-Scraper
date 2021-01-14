"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping kitchenstories.com
 * @extends BaseScraper
 */
class KitchenStoriesScraper extends BaseScraper {
  constructor(url) {
    super(url);
    this.subUrl = [
      "kitchenstories.com/en/recipes",
      "kitchenstories.com/de/rezepte"
    ];
  }

  /**
   * @override
   */
  checkUrl() {
    const found = this.subUrl.reduce((found, url) => {
      if (this.url.includes(url)) {
        found = true;
      }
      return found;
    }, false);
    if (!found) {
      throw new Error(
        `url provided must include '${this.subUrl.join("' or '")}'`
      );
    }
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-title").text();

    $(".ingredients")
      .find("tr")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".step")
      .children(".text")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $(".time-cell").each((i, el) => {
      let title = $(el)
        .children(".title")
        .text();
      let time = $(el)
        .find(".time")
        .text();
      let unit = $(el)
        .find(".unit")
        .text();
      if (parseInt(time)) {
        switch (title) {
          case "Preparation":
          case "Zubereitung":
            time.prep = `${time} ${unit}`;
            break;
          case "Baking":
          case "Backzeit":
            time.cook = `${time} ${unit}`;
            break;
          case "Resting":
          case "Ruhezeit":
            time.inactive = `${time} ${unit}`;
            break;
          default:
        }
      }
    });

    this.recipe.servings = $(".stepper-value").text();
  }
}

module.exports = KitchenStoriesScraper;
