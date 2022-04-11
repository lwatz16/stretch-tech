import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article>
      <img src={props.images.REGULAR.url} />
      <h3>{props.label}</h3>
      <p>{props.calories.toFixed(0)} cal</p>
      <button>See Details</button>
    </article>
  )
}

export default RecipeCard;