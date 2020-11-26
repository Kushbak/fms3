import React, { useState, useRef } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { DateInput, Input, Select, Datalist } from '../common/FormsControl/FormControls'
import styles from './CreateTransaction.module.css'
import { useEffect } from 'react'

const IncomeForm = props => {
    const now = new Date().toISOString().slice(0, 10)
    const [datee, setDate] = useState(now)
    const currentFormValues = useRef();
    currentFormValues.current = props.incomeValues;
    const setIncomeFormValues = () => {
        if (!!props.incomeFormValues) { 
            props.setIncomeValues(props.incomeFormValues)
        } 
    } 
    // console.log(props.incomeValues);
    // console.log(props.incomeFormValues);    
    // console.log(currentFormValues.current);
    return (
        <form className={styles.transactionForm} onSubmit={props.handleSubmit(props.submit)} onChange={setIncomeFormValues}>  
            <Field 
                component={DateInput} 
                name='date' 
                propsvalue={props.incomeValues?.date || datee} 
                onChange={(e) => setDate(e.target.value)} 
            />
            <Field 
                component={Input}  
                propsvalue={currentFormValues.current?.sum} 
                name='sum'  
                placeholder={`Сумма ${props.operationType}а`} 
                validate={[required]} 
            />
            <Field 
                component={Select} 
                name="score1"  
                onClick={props.getBankAccounts}
            > 
                {props.bankAccounts.map((item, i) => {
                    if (currentFormValues.current?.bankAccount === item.id){ 
                        return <option key={item.id} value={item.id} selected>{item.name}</option>}
                    if (currentFormValues.current?.bankAccount && i === 0) {
                        return <option key={item.id} value={item.id} selected>{item.name}</option>}
                    return <option key={item.id} value={item.id} >{item.name}</option>
                })}
            </Field>
            <Field 
                component={Select} 
                name="category" 
                validate={[required]}
                onClick={props.getAllCategories}
            > 
                { props.incomeCategories.map(item => {
                    if (+item.id === 2) return <option key={item.id} value={item.id} selected>{item.name}</option>
                    return <option key={item.id} value={item.id} >{item.name}</option>
                })}
            </Field>
            <Field 
                component={Select} 
                name="contragent" 
                id='contragentsInput' 
                list="contragentsInput" 
                placeholder='Контрагент'
                onClick={props.getContragents}
            >
                <option>Контрагент(Не выбрано)</option>
                {props.contragents.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field 
                component={Select} 
                name="project"
                onClick={props.getProjects}
            >
                <option>Проект(Не выбрано)</option>
                {props.projects.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field 
                component={Input} 
                value={props.incomeValues?.description || ''} 
                name='description' 
                type="text" 
                placeholder='Комментарий' 
            />
            <div className={styles.btnBlock}>
                <button className={styles.operationBtn} disabled={props.pristine || props.submitting}>{props.submitting ? 'Создание...' : 'Создать'}</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'income' })(IncomeForm)