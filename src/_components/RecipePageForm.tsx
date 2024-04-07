import { Recipe, deleteRecipe } from '../slicers/RecipeSlicer';
import { RecipeValidation, updateValidation } from '../slicers/SelectRecipeSlicer';
import { Toast as ToastInterface, openToast } from "../slicers/ToastSlicer"
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';

import { CustomClickableImage } from './CustomClickableImage';
import { CustomFormButton } from './CustomFormButton';
import { CustomFormInput } from './CustomFormInput';
import { CustomFormTextArea } from './CustomFormTextArea';
import { Toast } from './Toast';
import iconBackArrow from '../assets/backArrow.svg';
import { useNavigate } from "react-router-dom";

interface RecipeFormProps {
    newRecipe: boolean
    handleSave: (recipe: Recipe) => void
}

export const RecipePageForm = (props: RecipeFormProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const toast = useAppSelector(state => state.toast);
    const recipeList = useAppSelector(state => state.recipes);
    const { recipe, validation } = useAppSelector(state => state.selectRecipe)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showValidations();

        var newToast: ToastInterface;
        if(executeValidateAllInput(recipe)){
            props.handleSave(recipe)
            if (props.newRecipe)
                return navigate("/")
            newToast = {
                show: true,
                message: 'Success: Recipe Saved',
                type: 'SUCCESS'
            }
        } else if(props.newRecipe && !isUniqueTitle(recipe.title)){
            newToast = {
                show: true,
                message: 'Error: Enter a unique title!',
                type: 'ERROR'
            }
        } else if(!recipe.image){
            newToast = {
                show: true,
                message: 'Error: Select an image',
                type: 'ERROR'
            }
        } else {
            newToast = {
                show: true,
                message: 'Error: Invalid Field(s)',
                type: 'ERROR'
            }
        }
        dispatch(openToast(newToast));
    }

    const handleDelete = () => {
        dispatch(deleteRecipe(recipe.title));
        returnHomePage()
    }

    const returnHomePage = () => {
        navigate("/")
    }

    const showValidations = () => {

        var isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var checkState = (bool: boolean | string) => bool ? "Success" : 'Error'

        const newValidation: RecipeValidation = {
            ...validation,
            name: checkState(recipe.name),
            email: checkState(recipe.email && isValidEmail(recipe.email)),
            title: checkState((!props.newRecipe || (props.newRecipe && recipe.title && isUniqueTitle(recipe.title)))),
            description:checkState(recipe.description),
            ingredients: checkState(recipe.ingredients),
            instructions: checkState(recipe.instructions),
            // image: 'Initial',
        }
        dispatch(updateValidation(newValidation));
    }

    const executeValidateAllInput = (recipe: Recipe) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValidEmail = emailRegex.test(recipe.email);

        if (
            (!props.newRecipe || (props.newRecipe && isUniqueTitle(recipe.title)))
            && recipe.title
            && recipe.name
            && recipe.email
            && isValidEmail
            && recipe.description
            && recipe.ingredients
            && recipe.instructions
            && recipe.image
        ) {
            return true;
        }
        return false;
    }

    const isUniqueTitle = (title: string) => {
        return !recipeList.find(recipe => recipe.title.toLowerCase() === title.toLowerCase())
    }

    return (<form onSubmit={handleSubmit}>
        {
            toast.show
            && <Toast toast={toast}/>
        }
        <section id='leftImageContainer'>
            <button onClick={returnHomePage} id='goBackButton'>
                <img src={iconBackArrow} alt="icon back arrow" className="icon"/>
                Back
            </button>
            <CustomClickableImage recipe={recipe}/>
        </section>
        <section id='rightInputContainer'>
            <CustomFormInput
                objKey={'name'}
                state={validation.name}
                value={recipe.name}
                placeholder='Text field data'
                label='YOUR NAME'
                type={"text"}
                readonly={false}
            />
            <CustomFormInput
                objKey={'email'}
                state={validation.email}
                value={recipe.email}
                placeholder='Text field data'
                label='EMAIL ADDRESS'
                type={"email"}
                readonly={false}
            />
            <CustomFormInput
                objKey={'title'}
                state={validation.title}
                value={recipe.title}
                placeholder='Text field data'
                label='TITLE'
                type={"text"}
                readonly={!props.newRecipe}
            />
            <CustomFormTextArea
                objKey={'description'}
                state={validation.description}
                value={recipe.description}
                placeholder='Description here'
                label='DESCRIPTION'
                readonly={false}
                rows={3}
            />
            <CustomFormTextArea
                objKey={'ingredients'}
                state={validation.ingredients}
                value={recipe.ingredients}
                placeholder='Description here'
                label='INGREDIENTS'
                readonly={false}
                rows={4}
            />
            <CustomFormTextArea
                objKey={'instructions'}
                state={validation.instructions}
                value={recipe.instructions}
                placeholder='Description here'
                label='INSTRUCTIONS'
                readonly={false}
                rows={4}
            />
            <div className='buttonGroup'>
                {
                    !props.newRecipe
                    && <CustomFormButton text='Delete' type='delete' action={handleDelete}/>
                }
                <CustomFormButton text='Save' type='save' action={()=>{}}/>
            </div>
        </section>
    </form>)
}