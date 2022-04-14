import type {RecipeInterface} from '../App';
import RecipeCard from './RecipeCard';

interface SearchResults {
  recipes: RecipeInterface[],
  seeRecipe: (uri: string) => void
}

const SearchResults = ({recipes, seeRecipe}: SearchResults) => {
  const recipeCards = recipes.map((recipe, index) => {
    return (
      <RecipeCard 
        key={index.toString()}
        uri={recipe.uri}
        label={recipe.label}
        images={recipe.images}
        url={recipe.url}
        yield={recipe.yield}
        dietLabels={recipe.dietLabels}
        healthLabels={recipe.healthLabels}
        calories={recipe.calories}
        mealType={recipe.mealType}
        cuisineType={recipe.cuisineType}
        seeRecipe={seeRecipe}
      />
      )
  });
  
  return (
    <section className="search-results">
      {recipeCards.length && 
        <div className='recipe-cards'>
          {recipeCards}
        </div> 
      }
    </section>
  )
}

export default SearchResults;