'use client'

import { AppStore, makeStore } from '@/lib/store'

import { Provider } from 'react-redux'
import { loadRecipes } from '@/lib/slicers/RecipeSlicer'
import { useRef } from 'react'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore();
        // Initial load recipes
        fetch('/api/data.json')
        .then((res) => res.json())
        .then((res) => storeRef.current?.dispatch(loadRecipes(res)))
        .catch((err) => console.log(err));
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}