import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Recipe {
    name: string
    email: string
    title: string
    description: string
    ingredients: string
    instructions: string
    image: string
    dateAdded: string
}

const initialState: Recipe[] = []

const RecipeSlicer =  createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        loadRecipes: (_state, action: PayloadAction<Recipe[]>) => action.payload,
        deleteRecipe: (state, action: PayloadAction<string>) =>
            state.filter((recipe) => recipe.title !== action.payload),
        updateRecipe: (state, action: PayloadAction<Recipe>) =>
            state.map((recipe) => {
                if (recipe.title === action.payload.title) {
                    return action.payload
                } else {
                    return recipe
                }
            }),
        createNewRecipe: (state, action: PayloadAction<Recipe>) =>
            [...state, {...action.payload, dateAdded: new Date().toLocaleDateString()}],
    }
});

// Actions
export const { loadRecipes, deleteRecipe, updateRecipe, createNewRecipe } = RecipeSlicer.actions

// Reducer
export default RecipeSlicer.reducer
