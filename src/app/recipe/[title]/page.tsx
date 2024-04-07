'use client'

import './page.scss'

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

import { Recipe as RecipeInterface } from '@/lib/slicers/RecipeSlicer';
import { RecipePageForm } from '@/_components/RecipePageForm';
import { loadRecipe } from '@/lib/slicers/SelectRecipeSlicer';
import { updateRecipe } from '@/lib/slicers/RecipeSlicer';
import { useRouter } from 'next/navigation';

interface URLParams {
  params: { title: string }
}

export default function Recipe({params}: URLParams) {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const recipeList = useAppSelector(state => state.recipes);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const title = params.title.replace('%20', ' ');
    const selectedRecipe = recipeList.find(recipe => recipe.title.toLowerCase() === title.toLowerCase());

    if (selectedRecipe) {
      dispatch(loadRecipe(selectedRecipe));
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false)
  }, [recipeList])

  const handleSave = (recipe: RecipeInterface) => {
    if (recipe.image.startsWith(('/images/'))) {
      dispatch(updateRecipe(recipe));
    } else {
      fetch('/api/image',{
        body: JSON.stringify({
          image: recipe.image,
          title: recipe.title
        }),
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log('Response', res)
        dispatch(updateRecipe({...recipe, image: res.filePath}));
      })
      .catch(err => console.log(err))
    }
	}

  if (loading) {
    return (
      <main id='recipe' className={`${loading && 'loading'}`}>
        <h2>Loading the recipe...</h2>
      </main>
    )
  }

  if (error) {
    return (
      <main id='recipe' className={`${error && 'error'}`}>
        <h2>Recipe Not Found!</h2>
        <button onClick={() => router.back()}>Return to Previous Page</button>
      </main>
    )
  }

  return (
    <main id='recipe'>
      <RecipePageForm newRecipe={false} handleSave={handleSave}/>
    </main>
  )
}