'use client'

import './page.scss'

import { Recipe, createNewRecipe } from '@/lib/slicers/RecipeSlicer';
import { startNewRecipe, updateSelectedRecipe } from '@/lib/slicers/SelectRecipeSlicer';
import { useEffect, useState } from 'react';

import { RecipePageForm } from '@/_components/RecipePageForm';
import { useAppDispatch } from '@/lib/hooks';

export default function NewRecipe() {

	const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)

	const handleSave = (recipe: Recipe) => {
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
      dispatch(createNewRecipe({...recipe, image: res.filePath}));
    })
    .catch(err => console.log(err))
	}

  useEffect(() => {
    // Resets the state incase it contains state of accessed recipes
    dispatch(startNewRecipe());
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main id='recipe' className={`${loading && 'loading'}`}>
        <h2>Loading the recipe...</h2>
      </main>
    )
  }

  return (
    <main id='newRecipe'>
      <RecipePageForm newRecipe={true} handleSave={handleSave}/>
    </main>
  )
}
