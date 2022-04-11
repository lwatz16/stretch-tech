import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article>
      <img src={props.images.REGULAR.url} />
      <h3>{props.label}</h3>
    </article>
  )
}

export default RecipeCard;