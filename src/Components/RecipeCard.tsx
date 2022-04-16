import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string,
  seeRecipe: (uri: string) => void
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article className="recipe-card">
      <div className="recipe-writing">
        <div className="recipe-details">
          <h3 className='recipe-title'>{props.label}</h3>
          <p className='recipe-cals'>{props.calories.toFixed(0)} cal</p>
        </div>
        <button onClick={() => props.seeRecipe(props.uri)}>View</button>
      </div>
      <img className='recipe-img' src={props.images.REGULAR.url} alt={`${props.label}`}/>
    </article>
  )
}

export default RecipeCard;