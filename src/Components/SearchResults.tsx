import type {RecipeInterface} from '../App';
import RecipeCard from './RecipeCard';

interface SearchResults {
  recipes: RecipeInterface[]
}

const SearchResults = ({recipes}: SearchResults) => {
  const recipeCards = recipes.map((recipe, index) => {
    return (<RecipeCard 
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
            />)
  });
  return (
    <section className="search-results">{recipeCards}</section>
  )
}

export default SearchResults;