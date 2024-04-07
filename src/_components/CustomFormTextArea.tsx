import { State, updateSelectedRecipe, updateValidation } from "../slicers/SelectRecipeSlicer"
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks"

import iconError from "../assets/inputError.svg"
import iconSuccess from "../assets/inputSuccess.svg"
import iconWarning from "../assets/inputWarning.svg"

interface FormTextAreaProps {
    label: string
    placeholder: string
    value: string
    readonly: boolean
    rows: number
    state: State
    objKey: string
}

export const CustomFormTextArea = (props: FormTextAreaProps) => {
    const { recipe, validation } = useAppSelector(state => state.selectRecipe)
    const dispatch = useAppDispatch();

    const displayState = () => {
        return <img
            src={props.state === 'Success' ? iconSuccess : props.state === 'Warning' ? iconWarning : iconError }
            alt="icon state"
        />
    }

    const handleUpdateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateSelectedRecipe({...recipe, [props.objKey]: e.target.value}))
    }

    const handleValidateInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 0) {
            dispatch(updateValidation({...validation, [props.objKey]: 'Warning'}))
        } else {
            dispatch(updateValidation({...validation, [props.objKey]: 'Success'}))
        }
    }

    const handleFocusInput = (_e: React.FocusEvent<HTMLTextAreaElement>) => {
        dispatch(updateValidation({...validation, [props.objKey]: 'Initial'}))
    }

    return (
        <div className='formInput'>
            <label>{props.label}</label>
            <div className={`${props.state} customInput`}>
                <textarea
                    placeholder={props.placeholder}
                    name={props.label}
                    readOnly={props.readonly}
                    rows={props.rows}
                    value={props.value}
                    onChange={handleUpdateValue}
                    onBlur={handleValidateInput}
                    onFocus={handleFocusInput}
                />
                {props.state !== 'Initial' && displayState()}
            </div>
        </div>
    )
}