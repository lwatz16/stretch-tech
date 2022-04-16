import type {RecipeInterface} from '../App';
import { Link } from 'react-router-dom';

interface RecipeCardProps extends RecipeInterface {
  key: string,
  seeRecipe: (uri: string) => void
}

const RecipeCard = (props: RecipeCardProps) => {
  let recipeId = props.uri.split('#recipe_')[1];

  return (
    <article className="recipe-card">
      <div className="recipe-writing">
        <div className="recipe-details">
          <h3 className='recipe-title'>{props.label}</h3>
          <p className='recipe-cals'>{props.calories.toFixed(0)} cal</p>
        </div>
        <Link to={`/recipe/${recipeId}`}>
          <button>View</button>
        </Link>
      </div>
      <img className='recipe-img' src={props.images.REGULAR.url} alt={`${props.label}`}/>
    </article>
  )
}

export default RecipeCard;