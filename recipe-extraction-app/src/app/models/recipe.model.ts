export interface Recipe {
  url: string;
  ingredients: {
    ingredient: string;
    amount: string;
    amount_unit: string;
  }[];
  // ingredients: string[];
  steps: string[];
}
