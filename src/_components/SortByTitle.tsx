import { CustomDropdown } from "./CustomDropdown";
import { useAppSelector } from "../hooks/useReduxHooks"

export const SortByTitle = () => {

    const sort = useAppSelector(state => state.userPreference.sort);
    const options: string[] = ["ASC", "DESC"];

    return (
        <div className="preference">
            <h3>Sort by Title</h3>
            <CustomDropdown
                options={options}
                value={sort.byTitle}
                objKey={'byTitle'}
            />
        </div>
    )
}

