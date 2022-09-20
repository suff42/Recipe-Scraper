class Recipe {
  constructor() {
    this.name = "";
    this.subName = "";
    this.specialDiets = [];
    this.metaDescription = "";
    this.description = "";

    this.servings = "";
    this.time = "";
    this.difficulty = "";
    this.tags = [];

    this.ingredients = [];
    this.instructions = [];

    this.image = "";
    this.imageAlt = "";
  }
}

module.exports = Recipe;
