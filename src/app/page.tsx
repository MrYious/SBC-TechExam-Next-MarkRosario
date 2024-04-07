'use client'

import "./page.module.scss";

import { NewRecipeButton } from "@/_components/NewRecipeButton";
import React from "react";
import { RecipeItem } from "@/_components/RecipeItem";
import { SideBar } from "@/_components/SideBar";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {

  const recipes = useAppSelector((state) => state.recipes);
  const userPreference = useAppSelector((state) => state.userPreference);

  const sortRecipesBySortOrder = (unsortedList: typeof recipes, order: typeof userPreference.sort) => {
    if(order.byTitle) {
      const sortedList = [...unsortedList].sort((a, b) => {
        if (order.byTitle === 'ASC') {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        } else {
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        }
      });
      return sortedList;
    } else {
      return unsortedList;
    }
  }

  const filteredRecipeList = () => {
    return sortRecipesBySortOrder(recipes, userPreference.sort)
    .filter((recipe) => {
      if (userPreference.favorites.show) {
        return userPreference.favorites.list.find(title => title.toLowerCase() === recipe.title.toLowerCase())
      }
      return true;
    })
    .filter((recipe)=> {
      if (userPreference.searchString) {
        return recipe.title.toLowerCase().includes(userPreference.searchString.toLowerCase());
      }
      return true;
    })
  }

  return (
    <main id='home'>
      Home
      {recipes.length !== 0 ? <SideBar /> : <aside></aside>}
      <section>
        <div id='recipeList' className={`${(recipes.length === 0 || filteredRecipeList().length === 0) && 'empty'}`}>
          <NewRecipeButton />
          {
            filteredRecipeList().length === 0 ?
              <h1 className='emptyRecipe'>No Record Found!</h1>
            :
              filteredRecipeList()
              .map((recipe) => <React.Fragment key={recipe.title}>
                <RecipeItem recipe={recipe} />
                <div className='line'></div>
              </React.Fragment>)
          }
        </div>
      </section>
    </main>
  )
}
