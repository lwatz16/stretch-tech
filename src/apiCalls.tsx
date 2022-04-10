// add the appId & appKey

const apiCalls = {
  searchRecipes(ingredient: string[]) {
    let ingredientsToSearch;
    if (ingredient.length > 1) {
      ingredientsToSearch = ingredient.join('%20');
    } else {
      ingredientsToSearch = ingredient[0];
    }

    return fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientsToSearch}&app_id=${appId}&app_key=${appKey}`)
      .then(response => response.json())
  }
}

export default apiCalls;