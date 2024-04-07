import RecipeSlicer from "@/_slicers/RecipeSlicer";
import SelectRecipeSlicer from "@/_slicers/SelectRecipeSlicer";
import ToastSlicer from "@/_slicers/ToastSlicer";
import UserPreferenceSlicer from "@/_slicers/UserPreferenceSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        recipes: RecipeSlicer,
        userPreference: UserPreferenceSlicer,
        selectRecipe: SelectRecipeSlicer,
        toast: ToastSlicer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch