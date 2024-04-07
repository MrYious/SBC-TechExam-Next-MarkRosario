import { State, updateSelectedRecipe, updateValidation } from "../slicers/SelectRecipeSlicer"
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks"

import iconError from "../assets/inputError.svg"
import iconSuccess from "../assets/inputSuccess.svg"
import iconWarning from "../assets/inputWarning.svg"

interface FormInputProps {
    label: string
    placeholder: string
    value: string
    readonly: boolean
    type: "text" | "email"
    state: State
    objKey: string
}

export const CustomFormInput = (props: FormInputProps) => {
    const { recipe, validation } = useAppSelector(state => state.selectRecipe)
    const dispatch = useAppDispatch();

    const displayState = () => {
        return <img
            src={props.state === 'Success' ? iconSuccess : props.state === 'Warning' ? iconWarning : iconError }
            alt="icon state"
        />
    }

    const handleUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSelectedRecipe({...recipe, [props.objKey]: e.target.value}))
    }

    const handleValidateInput = (e: React.FocusEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = e.target.value;
        if (value.length === 0 || (props.type === 'email' && !emailRegex.test(value))) {
            dispatch(updateValidation({...validation, [props.objKey]: 'Warning'}))
        } else {
            dispatch(updateValidation({...validation, [props.objKey]: 'Success'}))
        }
    }

    const handleFocusInput = (_e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(updateValidation({...validation, [props.objKey]: 'Initial'}))
    }

    return (
        <div className='formInput'>
            <label>{props.label}</label>
            <div className={`${props.state} customInput`}>
                <input
                    type={"text"}
                    placeholder={props.placeholder}
                    readOnly={props.readonly}
                    value={props.value}
                    name={props.label}
                    onFocus={handleFocusInput}
                    onChange={handleUpdateValue}
                    onBlur={handleValidateInput}
                />
                {props.state !== 'Initial' && displayState()}
            </div>
        </div>
    )
}