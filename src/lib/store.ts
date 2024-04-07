import RecipeSlicer from "./slicers/RecipeSlicer";
import SelectRecipeSlicer from "./slicers/SelectRecipeSlicer";
import ToastSlicer from "./slicers/ToastSlicer";
import UserPreferenceSlicer from "./slicers/UserPreferenceSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {
            recipeList: RecipeSlicer,
            userPreference: UserPreferenceSlicer,
            selectRecipe: SelectRecipeSlicer,
            toast: ToastSlicer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']