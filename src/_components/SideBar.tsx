import { FilterByFavorites } from "./FilterByFavorites"
import { SortByTitle } from "./SortByTitle"

export const SideBar = () => {

    return (
        <aside id="sidebar">
            <SortByTitle />

            <div className="preference">
                <h3>Filter</h3>
                <div id="filterGroup">
                    <FilterByFavorites />
                </div>
            </div>
        </aside>
    )
}