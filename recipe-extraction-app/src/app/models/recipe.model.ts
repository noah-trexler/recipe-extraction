export interface Recipe {
  url: string;
  ingredients: {
    ingredient: string;
    amount: number;
    amount_unit: string;
  }[];
  steps: string[];
}
