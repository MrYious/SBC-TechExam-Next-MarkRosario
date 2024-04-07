import iconCross from '../assets/cross.svg'
import { useNavigate } from 'react-router-dom'

export const NewRecipeButton = () => {

    const navigate = useNavigate();

    const handleCreateNewRecipe = () => {
        navigate('create');
    }

    return (
        <button onClick={handleCreateNewRecipe} className='newRecipeButton'>
            <img src={iconCross} alt="icon cross" />
        </button>
    )
}