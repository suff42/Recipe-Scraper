"use strict";

const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("../scrapers/101CookbooksScraper"),
  allrecipes: require("../scrapers/AllRecipesScraper"),
  ambitiouskitchen: require("../scrapers/AmbitiousKitchenScraper"),
  averiecooks: require("../scrapers/AverieCooksScraper"),
  bbc: require("../scrapers/BbcScraper"),
  bbcgoodfood: require("../scrapers/BbcGoodFoodScraper"),
  bonappetit: require("../scrapers/BonAppetitScraper"),
  budgetbytes: require("../scrapers/BudgetBytesScraper"),
  centraltexasfoodbank: require("../scrapers/CentralTexasFoodBankScraper"),
  closetcooking: require("../scrapers/ClosetCookingScraper"),
  cookieandkate: require("../scrapers/CookieAndKateScraper"),
  copykat: require("../scrapers/CopyKatScraper"),
  damndelicious: require("../scrapers/DamnDeliciousScraper"),
  eatingwell: require("../scrapers/EatingWellScraper"),
  epicurious: require("../scrapers/EpicuriousScraper"),
  food: require("../scrapers/FoodScraper"),
  foodandwine: require("../scrapers/FoodAndWineScraper"),
  foodnetwork: require("../scrapers/FoodNetworkScraper"),
  gimmedelicious: require("../scrapers/GimmeDeliciousScraper"),
  gimmesomeoven: require("../scrapers/GimmeSomeOvenScraper"),
  julieblanner: require("../scrapers/JulieBlannerScraper"),
  kitchenstories: require("../scrapers/KitchenStoriesScraper"),
  melskitchencafe: require("../scrapers/melskitchencafe"),
  minimalistbaker: require("../scrapers/minimalistbaker"),
  myrecipes: require("../scrapers/myrecipes"),
  nomnompaleo: require("../scrapers/NomNomPaleoScraper"),
  omnivorescookbook: require("../scrapers/omnivorescookbook"),
  pinchofyum: require("../scrapers/pinchofyum"),
  recipetineats: require("../scrapers/recipetineats"),
  seriouseats: require("../scrapers/seriouseats"),
  simplyrecipes: require("../scrapers/simplyrecipes"),
  smittenkitchen: require("../scrapers/smittenkitchen"),
  tastesbetterfromscratch: require("../scrapers/TastesBetterFromScratchScraper"),
  tasteofhome: require("../scrapers/tasteofhome"),
  theblackpeppercorn: require("../scrapers/theblackpeppercorn"),
  therecipecritic: require("../scrapers/therecipecritic"),
  thepioneerwoman: require("../scrapers/thepioneerwoman"),
  therealfoodrds: require("../scrapers/TheRealFoodDrsScraper"),
  thespruceeats: require("../scrapers/thespruceeats"),
  whatsgabycooking: require("../scrapers/whatsgabycooking"),
  woolworths: require("../scrapers/woolworths"),
  yummly: require("../scrapers/YummlyScraper")
};

/**
 * A Singleton Factory to whom supplies an instance of a scraper based on a give URL
 */
class ScraperFactory {
  getScraper(url) {
    let parse = parseDomain(url);
    if (parse) {
      let domain = parse.domain;
      if (domains[domain] !== undefined) {
        return new domains[domain](url);
      } else {
        throw new Error("Site not yet supported");
      }
    } else {
      throw new Error("Failed to parse domain");
    }
  }
}

const singletonFactory = new ScraperFactory();
Object.freeze(singletonFactory);

module.exports = singletonFactory;
