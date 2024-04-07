import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';

import { Recipe } from '../slicers/RecipeSlicer'
import iconStarFilled from '../assets/star-filled.svg'
import iconStarOutlined from '../assets/star-outline.svg'
import imgPlaceholder from '../assets/placeholderImage.svg'
import { toggleFavoriteRecipe } from '../slicers/UserPreferenceSlicer';
import { useNavigate } from 'react-router-dom';

export const RecipeItem = (props: {recipe: Recipe}) => {

    const favorite = useAppSelector(state => state.userPreference.favorites);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formatDate = (date: Date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    const handleToggleFavoriteRecipe = (e: React.MouseEvent<HTMLButtonElement> ,title: string) => {
        e.stopPropagation();
        dispatch(toggleFavoriteRecipe(title));
    }

    const handleOpenRecipe = (title: string) => {
        navigate("recipe/" + title)
    }

    return (
        <div className='recipeItem' onClick={()=>{handleOpenRecipe(props.recipe.title)}}>
            <div className='imageHolder' style={{backgroundImage: `url('${props.recipe.image || imgPlaceholder}')`}}>
                {/* <img src={props.recipe.image || imgPlaceholder} alt="recipe image" id="cover" /> */}
                <button onClick={(e)=>{handleToggleFavoriteRecipe(e, props.recipe.title)}}>
                    {
                        favorite.list.find(title =>
                            title.toLowerCase() === props.recipe.title.toLowerCase())
                            ? <img src={iconStarFilled} alt="icon star filled " className='icon' />
                            : <img src={iconStarOutlined} alt="icon star outlined" className='icon'/>
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