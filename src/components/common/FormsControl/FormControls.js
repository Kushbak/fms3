import React, {  } from 'react'
import styles from './FormControls.module.css' 
import { TextField, FormHelperText, FormControl, InputLabel, Select, RadioGroup, FormLabel } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import format from "date-fns/format"
import frLocale from "date-fns/locale/fr"
import ruLocale from "date-fns/locale/ru"
import enLocale from "date-fns/locale/en-US"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'


const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
}

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "LLLL", { locale: this.locale })
    }

    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM", { locale: this.locale })
    }
}

class FrLocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "d MMM yyyy", { locale: this.locale })
    }
}

const localeUtilsMap = {
    en: DateFnsUtils,
    fr: FrLocalizedUtils,
    ru: RuLocalizedUtils,
}

const localeFormatMap = {
    en: "MMMM d, yyyy",
    fr: "d MMM yyyy",
    ru: "d MMM yyyy",
}

const localeCancelLabelMap = {
    en: "cancel",
    fr: "annuler",
    ru: "отмена",
}

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}


export const MaterialDatePicker = ({ label, input, ...custom }) => {
    const now = new Date()
    const nextMonth = new Date().setMonth(now.getMonth() + 1)
    const endOfMonth = new Date(nextMonth).setDate(now.getDate() - now.getDate())
    const valueProp = 
        input.value === '' 
            ? input.name === 'StartDate'
                ? new Date(new Date().setDate(1))
                : input.name === 'EndDate' 
                    ? new Date(new Date(endOfMonth)) 
                    : new Date()
            : input.value 
    const inputData = {...input, value: valueProp}
    return (
        <MuiPickersUtilsProvider utils={localeUtilsMap["ru"]} locale={localeMap["ru"]}>
            <KeyboardDatePicker
                disableToolbar
                format={localeFormatMap["ru"]}
                cancelLabel={localeCancelLabelMap["ru"]}
                margin="normal"
                onChange={input.onChange}
                {...custom}
                {...inputData}
            />
        </MuiPickersUtilsProvider>
    )
}

export const MaterialInput = ({label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

export const MaterialSelect = ({ label, meta: { touched, error }, children, input, ...custom }) => { 
    let valueProp = (input.value === '' && custom.multiple) ? [] : input.value 
    return (
        <FormControl error={touched && error}>
            <InputLabel id={custom.labelId}>{label}</InputLabel>
            <Select 
                {...input}
                {...custom}
                value={valueProp}
                inputProps={{
                    name: input.name
                }} 
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    ) 
}

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error   
    return (
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div> <input {...input} {...props} value={props.propsvalue} autoComplete="off" /> </div>
            { hasError && <span>{ meta.error }</span> }  
        </div>
    )
}

export const MaterialRadioGroup = ({ label, children, input, ...custom }) => {
    return (
        <FormControl component="fieldset" className={custom.className}>
            <FormLabel component="legend">{custom.label}</FormLabel>
            <RadioGroup aria-label={custom.ariaLabel} name={custom.name} {...custom}>
                {children}
            </RadioGroup>
        </FormControl>
    )
}