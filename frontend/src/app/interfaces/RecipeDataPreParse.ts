import { RecipeData } from './RecipeDataPostParse';

export interface RecipeDataPreParse {
  recipeId: number;
  title: string;
  ingredients: string;
  userName: string;
  created: Date;
  steps: string;
  crockPot: boolean;
}

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const recipeQueue: RecipeDataPreParse[] = new Array();
