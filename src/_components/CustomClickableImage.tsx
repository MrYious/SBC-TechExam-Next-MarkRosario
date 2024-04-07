import { ChangeEvent, useRef } from 'react';

import { Recipe } from '@/lib/slicers/RecipeSlicer';
import { updateSelectedRecipe } from '@/lib/slicers/SelectRecipeSlicer';
import { useAppDispatch } from '@/lib/hooks';

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
            style={{
                backgroundImage: `url('${props.recipe.image || 'images/placeholder.svg'}')`
            }}
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
