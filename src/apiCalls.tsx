// add the appId & appKey

const apiCalls = {
  searchRecipes(ingredient1: string) {
    return fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient1}&app_id=${appId}&app_key=${appKey}`)
      .then(response => response.json())
  }
}

export default apiCalls;