import React from 'react'
import styles from './FormControls.module.css' 

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error 
    return (
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div> <input type="text" { ...input } { ...props } autoComplete="off" /> </div>
            { hasError && <span>{ meta.error }</span> }  
        </div>
    )
}


export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div> <textarea type="text" {...input} {...props} autoComplete="off" /> </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 

export const DatetimeLocal = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <input type="datetime-local" {...input} {...props} value={props.setValue} autoComplete="off" />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Select = ({ input, meta, ...props }) => {    
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <select type="select" {...input} {...props}>
                {props.children}
            </select>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 
export const Datalist = ({ input, meta, ...props }) => { 
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <input {...input} list={props.list} placeholder={props.placeholder}/>
            <datalist id={props.id}>
                {props.children}
            </datalist>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 