import { TextField } from '@mui/material'
import React from 'react'


/**
 * Generic numeric text field with validation.
 *
 * @param valueState React state containing input value.
 * @param min (Default: 0) Minimum valid value.
 * @param max Maximum valid value.
 * @param onChangeHandleValue Function that takes the updated value for the field onChange and sets state(s) accordingly.
 * @param onBlurHandleValidatedValue Function that takes validated value onBlur and sets state(s) accordingly.
 * @param showLabelOnFocus (Default: true) If true, display labelText when field is focused.
 * @param labelText (Default: '⏎ Enter to set') Label text to show on focus if above prop is true.
 * @param props Any remaining props to pass to TextField component.
 * @return {Element}
 * @constructor
 */
export const NumericTextInput = ({
                                   valueState,
                                   min = 0,
                                   max,
                                   onChangeHandleValue,
                                   onBlurHandleValidatedValue,
                                   showLabelOnFocus = true,
                                   labelText = '⏎ Enter to set',
                                   sx = {},
                                   ...props
                                 }) => {
  // State keeping track of text input focus. Used to conditionally show help text on focus.
  const [textInputIsFocused, setTextInputIsFocused] = React.useState(false)

  /**
   * Select all on focus and update focus state.
   *
   * @param event
   */
  const textInputOnFocus = (event) => {
    event.target.select()
    setTextInputIsFocused(true)
  }

  /**
   * Parse the valueState as an integer, set to parsed integer valueState or '' if it could not be parsed.
   * Then pass to onChangeHandleValue().
   *
   * @param event
   */
  const textInputOnChange = (event) => {
    // Sanitize numeric valueState
    let parsedInputValue = parseInt(event.target.value)
    if (isNaN(parsedInputValue)) {
      parsedInputValue = ''
    }
    // Pass to onChangeHandleValue
    onChangeHandleValue(parsedInputValue)
  }

  /**
   * Validate that number is within range of min/max.
   *
   * @param val
   * @return {number}
   */
  const validateNumberInRange = (val) => {
    // If valueState is not an integer or less than min, set to min
    if (!Number.isInteger(val) || val < min) {
      val = min
    }
    // If valueState exceeds max, set to max
    else if (val > max) {
      val = max
    }
    return val
  }

  /**
   * Validate current value, pass validated value to onBlurHandleValidatedValue(),
   * then update focused state.
   *
   * @param event
   */
  const textInputOnBlur = (event) => {
    // Validate
    const validatedInputValue = validateNumberInRange(valueState)
    // Pass to onBlurHandleValidatedValue
    onBlurHandleValidatedValue(validatedInputValue)
    // Update focus state
    setTextInputIsFocused(false)
  }

  /**
   * If the Enter or Esc key is pressed, trigger blur on input.
   *
   * @param event
   */
  const textInputOnKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
      event.target.blur()
    }
  }

  return (
    <TextField
      value={ valueState }
      onFocus={ textInputOnFocus }
      onChange={ textInputOnChange }
      onBlur={ textInputOnBlur }
      onKeyDown={ textInputOnKeyDown }
      label={ showLabelOnFocus && textInputIsFocused ? labelText : null }
      autoComplete="off"
      size="small"
      inputProps={ {
        // Tell mobile browsers to use numeric keyboard
        inputMode: 'numeric',
        // Use enter key on mobile keyboard
        enterkeyhint: 'enter',
        style: {
          textAlign: 'right',
        }
      } }
      sx={{
        '& input::placeholder': {
          fontSize: '12px',
          textAlign: 'center',
        },
        ...sx,
      }}
      { ...props }
    />
  )
}