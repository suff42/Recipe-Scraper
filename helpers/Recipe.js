class Recipe {
  constructor() {
    this.name = "";
    this.subName = "";
    this.specialDiets = [];
    this.metaDescription = "";
    this.description = "";

    this.servings = "";
    this.time = {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: "",
    };
    this.difficulty = "";
    this.tags = [];

    this.ingredients = [];
    this.instructions = [];

    this.image = "";
    this.imageAlt = "";
  }
}

module.exports = Recipe;
