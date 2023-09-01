export interface Recipe {
  url: string;
  ingredients: Ingredient[];
  steps: string[];
}

//https://www.npmjs.com/package/parse-ingredient

interface Ingredient {
  /**
   * The primary quantity (the lower quantity in a range, if applicable)
   */
  quantity: number | null;
  /**
   * The secondary quantity (the upper quantity in a range, or `null` if not applicable)
   */
  quantity2: number | null;
  /**
   * The unit of measure identifier (see `unitsOfMeasure`)
   */
  unitOfMeasureID: string | null;
  /**
   * The unit of measure
   */
  unitOfMeasure: string | null;
  /**
   * The description
   */
  description: string;
  /**
   * Whether the "ingredient" is actually a group header, e.g. "For icing:"
   */
  isGroupHeader: boolean;

  _quantity: number | null;
  _quantity2: number | null;
}
