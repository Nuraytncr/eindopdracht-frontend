export const addExtraProperties = (recipes) => {
    const numberArray = [1, 2, 3, 4];
    
    if(recipes instanceof Array)
    {
        const modifiedRecipes = recipes?.map((recipeMap) => {
            const randomNumber = numberArray[Math.floor(Math.random() * numberArray.length)];
            const selectRecipe = recipeMap?.recipe
            return {
              ...selectRecipe,
              difficulty: randomNumber,
              duration: randomNumber,
            };
          });
          return modifiedRecipes;
    }
        const randomNumber = numberArray[Math.floor(Math.random() * numberArray.length)];
        return {
          ...recipes,
          difficulty: randomNumber,
          duration: randomNumber,
        };
  };