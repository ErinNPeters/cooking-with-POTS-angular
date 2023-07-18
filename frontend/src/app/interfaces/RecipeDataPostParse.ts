// import { http } from './http';

export interface RecipeData {
  recipeId: number;
  title: string;
  ingredients: IngredientDto[];
  userId: string;
  userName: string;
  steps: StepDto[];
  crockPot: boolean;
  sauceName?: string;
}

export interface StepDto {
  recipeId: number;
  stepId: number;
  content: string;
}

export interface IngredientDto {
  recipeId: number;
  ingredientId: number;
  content: string;
  sauceIngredient?: boolean;
}

export interface RecipeFromServer {
  recipeId: number;
  title: string;
  ingredientDtos: IngredientDto[];
  userId: string;
  userName: string;
  stepDtos: StepDto[];
  crockPot: boolean;
  sauceName?: string;
}

const recipes: RecipeData[] = [
  {
    recipeId: 1,
    title: 'Smothered Pork Chops',
    userId: '1',
    userName: 'erin@test.com',
    sauceName: 'Smothered',
    crockPot: true,
    ingredients: [
      {
        ingredientId: 1,
        recipeId: 1,
        content: '3 lb bone-in center cut pork chops',
        sauceIngredient: false,
      },
      {
        ingredientId: 2,
        recipeId: 1,
        content: '2 tsp Creole seasoning',
        sauceIngredient: true,
      },
      {
        ingredientId: 3,
        recipeId: 1,
        content: '1 can Condensed Golden Mushroom Soup',
        sauceIngredient: true,
      },
      {
        ingredientId: 4,
        recipeId: 1,
        content: '½ cup beer',
        sauceIngredient: true,
      },
      {
        ingredientId: 5,
        recipeId: 1,
        content: '¼ cup flour',
        sauceIngredient: true,
      },
      {
        ingredientId: 6,
        recipeId: 1,
        content: '2 tbsp Dijon-style mustard',
        sauceIngredient: true,
      },
      {
        ingredientId: 7,
        recipeId: 1,
        content: '1 tbsp packed brown sugar',
        sauceIngredient: true,
      },
      {
        ingredientId: 8,
        recipeId: 1,
        content: '3 cups sliced mushrooms',
        sauceIngredient: true,
      },
      {
        ingredientId: 9,
        recipeId: 1,
        content: '1 cup sliced onion',
        sauceIngredient: true,
      },
    ],
    steps: [
      {
        stepId: 1,
        recipeId: 1,
        content:
          'Season pork, if desired, then sprinkle with Creole seasoning. Stir soup, beer, flour, mustard, and born sugar in 6 qt slow cooker. Add mushrooms, onion, and pork.',
      },
      {
        stepId: 2,
        recipeId: 1,
        content:
          'Cover and cook LOW 6 hours or until pork is done. Server over hot cooked rice.',
      },
    ],
  },
];

export const mapRecipeFromServer = (recipe: RecipeFromServer): RecipeData => ({
  ...recipe,
  ingredients: recipe.ingredientDtos
    ? recipe.ingredientDtos.map((ingredient) => ({ ...ingredient }))
    : [],
  steps: recipe.stepDtos ? recipe.stepDtos.map((step) => ({ ...step })) : [],
});

export const getCrockPotRecipes = async (): Promise<RecipeData[]> => {
  await wait(500);
  return recipes.filter((r) => r.crockPot === true);
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// export const getRecipe = async (
//   recipeId: number,
// ): Promise<RecipeData | null> => {
//   await wait(500);
//   const results = recipes.filter((r) => r.recipeId === recipeId);
//   return results.length === 0 ? null : results[0];
// };

// export const getRecipe = async (
//   recipeId: number
// ): Promise<RecipeData | null> => {
//   const result = await http<RecipeFromServer>({
//     path: `RecipeAll/${recipeId}`,
//   });
//   if (result.ok && result.body) {
//     return mapRecipeFromServer(result.body);
//   } else {
//     return null;
//   }
// };

export const getRecipeNow = (recipeId: number): RecipeData => {
  const results = recipes.filter((r) => r.recipeId === recipeId);
  return results[0];
};

// export const searchRecipes = async (
//   criteria: string,
// ): Promise<RecipeData[]> => {
//   await wait(500);
//   return recipes.filter(
//     (r) =>
//       r.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
//       r.ingredients.filter(
//         (i) => i.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
//       ).length > 0 ||
//       r.steps.filter(
//         (i) => i.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
//       ).length > 0,
//   );
// };

// export const searchRecipes = async (
//   criteria: string
// ): Promise<RecipeData[]> => {
//   if (!criteria) {
//     criteria = 'ALL';
//   }
//   const result = await http<RecipeFromServer[]>({
//     path: `?search=${criteria}&page=1&pageSize=20`,
//   });
//   if (result.ok && result.body) {
//     return result.body.map(mapRecipeFromServer);
//   } else {
//     return [];
//   }
// };
