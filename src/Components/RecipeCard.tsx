import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string,
  seeRecipe: () => void
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article className="recipe-card">
      <div className="recipe-writing">
        <div className="recipe-details">
          <h3>{props.label}</h3>
          <p>{props.calories.toFixed(0)} cal</p>
        </div>
        <button onClick={props.seeRecipe}>View</button>
      </div>
      <img src={props.images.REGULAR.url} />
    </article>
  )
}

export default RecipeCard;