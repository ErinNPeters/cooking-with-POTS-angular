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

export const recipeTestDataPostParse: RecipeFromServer[] = [
  {
    recipeId: 1,
    title: 'Smothered Pork Chops',
    userId: '1',
    userName: 'erin@test.com',
    sauceName: 'Smothered',
    crockPot: true,
    ingredientDtos: [
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
    stepDtos: [
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
