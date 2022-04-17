import type {RecipeInterface} from '../App';
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import FilterMenu from './FilterMenu';
import ReactLoading from 'react-loading';

interface SearchResultsProps {
  recipes: RecipeInterface[],
  healthLabels: string[],
  applyFilter: (filter: string) => void,
  filterBy: string,
  error: string,
  query: string,
  searchForRecipes: (ingredients: string[]) => void,
  isLoading: boolean,
}

const SearchResults = ({ recipes, healthLabels, applyFilter, filterBy, error, query, searchForRecipes, isLoading }: SearchResultsProps) => {
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
      />
      )
  });

  useEffect(() => {
    let search = query.split('%20');
    searchForRecipes(search);
  }, [])
  
  return (
    <section className="search-results">
      {
        isLoading ? (
          <div className='recipe-cards'>
            <ReactLoading className='loading' type='cylon' color='#EB7F02' height={667} width={375} />
          </div>
        ) : (
          <>
            {!!error.length && <div className='error'>{error}</div>}
            {!!recipeCards.length && 
              <div>
                <FilterMenu applyFilter={applyFilter} healthLabels={healthLabels}/>
                <div className='recipe-cards'>
                  {recipeCards}
                </div> 
              </div>
            }
          </>
        )
      }
    </section>
  )
}

export default SearchResults;