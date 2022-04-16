import type {RecipeInterface} from '../App';
import apiCalls from '../apiCalls';
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import FilterMenu from './FilterMenu';

interface SearchResultsProps {
  recipes: RecipeInterface[],
  seeRecipe: (uri: string) => void,
  healthLabels: string[],
  applyFilter: (filter: string) => void,
  filterBy: string,
  error: string,
  // query: string
}

const SearchResults = ({recipes, seeRecipe, healthLabels, applyFilter, filterBy, error}: SearchResultsProps) => {
  let recipeCards;
  let filteredRecipes = recipes;
  
  if(filterBy) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.healthLabels.includes(filterBy))
  }

  recipeCards = filteredRecipes.map((recipe, index) => {
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

  // const [thisQuery, setQuery] = useState(query);
  
  // useEffect(() => {
  //   let search = thisQuery.split('%20');
  //   apiCalls.searchRecipes(search);
  // })
  
  return (
    <section className="search-results">
      {!!error.length && <div className='error'>{error}</div>}
      {!!recipeCards.length && 
        <div>
          <FilterMenu applyFilter={applyFilter} healthLabels={healthLabels}/>
          <div className='recipe-cards'>
            {recipeCards}
          </div> 
        </div>
      }
    </section>
  )
}

export default SearchResults;