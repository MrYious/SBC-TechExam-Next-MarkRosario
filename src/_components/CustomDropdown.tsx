import { SortOrder, updateSort } from '@/lib/slicers/UserPreferenceSlicer'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

import Image from 'next/image'
import downArrow from '../../public/assets/downArrow.svg'
import upArrow from '../../public/assets/upArrow.svg'
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
                <Image src={open ? upArrow : downArrow} alt="dropdown icon" />
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