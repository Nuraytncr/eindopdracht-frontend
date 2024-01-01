export const addExtraProperties = (recipes) => {
    const modifiedRecipes = recipes.map((recipeMap) => {
      const numberArray = [1, 2, 3, 4];
      const randomNumber = numberArray[Math.floor(Math.random() * numberArray.length)];
      const selectRecipe = recipeMap.recipe
      return {
        ...selectRecipe,
        difficulty: randomNumber,
        duration: randomNumber,
      };
    });
    return modifiedRecipes;
  };