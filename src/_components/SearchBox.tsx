'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Image from 'next/image';
import iconSearch from '../../public/assets/search.svg'
import { updateSearchString } from '@/lib/slicers/UserPreferenceSlicer';

export const SearchBox = () => {

    const searchString = useAppSelector(state => state.userPreference.searchString);
    const dispatch = useAppDispatch();

    const handleUpdateSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchString(e.target.value));
    }

    return (
        <div className="searchBox">
            <input
                type="text"
                placeholder="Search here..."
                value={searchString}
                onChange={handleUpdateSearchString}
            />
            <Image src={iconSearch} alt='search icon' />
        </div>
    )
}