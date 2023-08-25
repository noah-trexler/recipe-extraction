export interface Recipe {
  url: string;
  // ingredients: {
  //   ingredient: string;
  //   amount: number;
  //   amount_unit: string;
  // }[];
  ingredients: string[];
  steps: string[];
}
