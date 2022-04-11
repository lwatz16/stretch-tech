import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article>{props.uri}</article>
  )
}

export default RecipeCard;