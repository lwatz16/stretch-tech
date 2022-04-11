import type {RecipeInterface} from '../App';

interface RecipeCardProps extends RecipeInterface {
  key: string
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <article></article>
  )
}

export default RecipeCard;