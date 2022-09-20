class Recipe {
  constructor() {
    this.name = "";
    this.subName = "";
    this.specialDiets = [];
    this.metaDescription = "";
    this.description = "";

    this.servings = "";
    this.time = 0;
    this.difficulty = "";
    this.tags = [];

    this.ingredients = [];
    this.instructions = [];

    this.image = "";
    this.imageAlt = "";
  }
}

module.exports = Recipe;
