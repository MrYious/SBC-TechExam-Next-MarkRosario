import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

interface RecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    try {
        const response = await fetch('/api/data.json');
        const data = await response.json()
        console.log("AsyncThunk: ", data);
        return data;
    } catch (error) {
        throw Error('Failed to fetch recipes');
    }
});

const RecipeSlicer =  createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        // loadRecipes: (_state, action: PayloadAction<Recipe[]>) => action.payload,
        deleteRecipe: (state, action: PayloadAction<string>) => {
            state.recipes.filter((recipe) => recipe.title !== action.payload)
        },
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.map((recipe) => {
                if (recipe.title === action.payload.title) {
                    return action.payload
                } else {
                    return recipe
                }
            })
        },
        createNewRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes = [...state.recipes, {...action.payload, dateAdded: new Date().toLocaleDateString()}]
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle loading state and update recipes on success
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch recipes';
            });
    },
});

// Actions
export const { deleteRecipe, updateRecipe, createNewRecipe } = RecipeSlicer.actions

// Reducer
export default RecipeSlicer.reducer
