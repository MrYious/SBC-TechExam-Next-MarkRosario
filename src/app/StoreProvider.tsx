'use client'

import { AppStore, makeStore } from '@/lib/store'

import { Provider } from 'react-redux'
import { fetchRecipes } from '@/lib/slicers/RecipeSlicer'
import { useRef } from 'react'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(fetchRecipes());
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}