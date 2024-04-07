import { ChangeEvent, useRef } from 'react';

import { Recipe } from '../slicers/RecipeSlicer';
import imgPlaceholder from '../assets/placeholderImage.svg'
import { updateSelectedRecipe } from '../slicers/SelectRecipeSlicer';
import { useAppDispatch } from '../hooks/useReduxHooks';

export const CustomClickableImage = (props: {recipe: Recipe}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataURL = reader.result as string;
                dispatch(updateSelectedRecipe({...props.recipe, image: imageDataURL}))
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleClickImage = () => {
        fileInputRef.current?.click();
    }

    return (
        <div
            id='recipeImageContainer'
            onClick={handleClickImage}
            style={{backgroundImage: `url('${props.recipe.image || imgPlaceholder}')`}}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
            />
        </div>
    )
}
