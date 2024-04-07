import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Recipe } from "./RecipeSlicer";

export type State = 'Initial' | 'Warning' | 'Error' | 'Success'

export interface RecipeValidation {
    name: State,
    email: State,
    title: State,
    description: State,
    ingredients: State,
    instructions: State,
    image: State,
}

interface SelectRecipe {
    recipe: Recipe
    validation: RecipeValidation
}

const initialState: SelectRecipe = {
    recipe: {
        name: "",
        email: "",
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        image: "",
        dateAdded: "",
    },
    validation: {
        name: 'Initial',
        email: 'Initial',
        title: 'Initial',
        description: 'Initial',
        ingredients: 'Initial',
        instructions: 'Initial',
        image: 'Initial',
    },
}

const SelectRecipeSlicer =  createSlice({
    name: 'selectRecipe',
    initialState,
    reducers: {
        startNewRecipe: (state) => {
            state.recipe = initialState.recipe
            state.validation = initialState.validation
        },
        loadRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipe = action.payload
            state.validation = initialState.validation
        },
        updateSelectedRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipe = action.payload
        },
        updateValidation: (state, action: PayloadAction<RecipeValidation>) => {
            state.validation = action.payload
        }
    }
});

// Actions
export const {
    loadRecipe,
    startNewRecipe,
    updateSelectedRecipe,
    updateValidation
} = SelectRecipeSlicer.actions

// Reducer
export default SelectRecipeSlicer.reducer
