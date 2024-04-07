import { SortOrder, updateSort } from "../slicers/UserPreferenceSlicer"
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks"

import downArrow from '../assets/downArrow.svg'
import upArrow from '../assets/upArrow.svg'
import { useState } from "react"

interface CustomDropdownProps {
    options: string[]
    value: SortOrder
    objKey: string
}

export const CustomDropdown = (props: CustomDropdownProps) => {

    const sort = useAppSelector(state => state.userPreference.sort);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(state => !state)
    }

    const handleUpdateValue = (sortOrder: SortOrder) => {
        dispatch(updateSort({...sort, [props.objKey]: sortOrder}));
    }

    return (
        <div onClick={()=>{}} className="dropdownGroup">
            <div className={`dropdownValue ${open && 'open'}`} onClick={handleOpen}>
                <div className={`value ${props.value || 'placeholder' }`}>
                    {props.value || "Select"}
                </div>
                <img src={open ? upArrow : downArrow} alt="dropdown icon" />
            </div>
            {
                open
                && <div className={`dropdownItemGroup`}>
                    {
                        props.options.map((option) =>
                            <button
                                key={option}
                                className={`dropdown-item ${props.value === option && 'active'}`}
                                onClick={()=>handleUpdateValue(option as SortOrder)}
                            >
                                {option}
                            </button>
                        )
                    }
                </div>
            }
        </div>
    )
}