import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";

import { toggleShowFavorites } from "../slicers/UserPreferenceSlicer";

export const FilterByFavorites = () => {

    const showFavorite = useAppSelector(state => state.userPreference.favorites.show);
    const dispatch = useAppDispatch();

    const handleToggleShowFavorites = (bool: boolean) => {
        if (showFavorite !== bool) {
            dispatch(toggleShowFavorites());
        }
    }

    return (
        <div className="filterGroupItem">
            <span>Favorites?</span>
            <div className="customRadioGroupCheckBox">
                <label htmlFor="favoriteYes">
                    <input
                        type="checkbox"
                        name="favoriteYes"
                        checked={showFavorite}
                        onChange={()=>{handleToggleShowFavorites(true)}}
                    />
                    Yes
                </label>
                <label htmlFor="favoriteNo">
                    <input
                        type="checkbox"
                        name="favoriteNo"
                        checked={!showFavorite}
                        onChange={()=>{handleToggleShowFavorites(false)}}
                    />
                    No
                </label>
            </div>
        </div>
    )
}

