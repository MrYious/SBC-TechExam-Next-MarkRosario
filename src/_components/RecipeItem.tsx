import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Image from 'next/image';
import { Recipe } from '@/lib/slicers/RecipeSlicer';
import iconStarFilled from '../../public/assets/star-filled.svg'
import iconStarOutlined from '../../public/assets/star-outline.svg'
import imgPlaceholder from '../../public/assets/placeholderImage.svg'
import { toggleFavoriteRecipe } from '@/lib/slicers/UserPreferenceSlicer';
import { useRouter } from 'next/navigation';

export const RecipeItem = (props: {recipe: Recipe}) => {

    const favorite = useAppSelector(state => state.userPreference.favorites);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const formatDate = (date: Date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    const handleToggleFavoriteRecipe = (e: React.MouseEvent<HTMLButtonElement> ,title: string) => {
        e.stopPropagation();
        dispatch(toggleFavoriteRecipe(title));
    }

    const handleOpenRecipe = (title: string) => {
        router.push("recipe/" + title)
    }

    return (
        <div className='recipeItem' onClick={()=>{handleOpenRecipe(props.recipe.title)}}>
            <div className='imageHolder' style={{backgroundImage: `url('${props.recipe.image || imgPlaceholder}')`}}>
                {/* <img src={props.recipe.image || imgPlaceholder} alt="recipe image" id="cover" /> */}
                <button onClick={(e)=>{handleToggleFavoriteRecipe(e, props.recipe.title)}}>
                    {
                        favorite.list.find(title =>
                            title.toLowerCase() === props.recipe.title.toLowerCase())
                            ? <Image src={iconStarFilled} alt="icon star filled " className='icon' />
                            : <Image src={iconStarOutlined} alt="icon star outlined " className='icon' />
                    }
                </button>
            </div>
            <div className='recipeDetails'>
                <h1 className='recipeTitle'>{props.recipe.title}</h1>
                <p className='recipeDesc'>{props.recipe.description}</p>
                <p className='seeMore'>See More</p>
                <div className='footer'>
                    <p id='name'> Added by: {props.recipe.name}</p>
                    <p id='dateAdded'>Date: {formatDate(new Date(props.recipe.dateAdded))}</p>
                </div>
            </div>
        </div>
    )
}