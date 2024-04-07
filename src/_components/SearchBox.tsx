import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'

import iconSearch from '../assets/search.svg'
import { updateSearchString } from '../slicers/UserPreferenceSlicer';

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
            <img src={iconSearch} alt="search icon" />
        </div>
    )
}