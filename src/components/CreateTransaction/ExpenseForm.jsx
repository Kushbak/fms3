import React, { useState } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { DateInput, Input, Select, Datalist } from '../common/FormsControl/FormControls'
import styles from './CreateTransaction.module.css'

const ExpenseForm = props => {
    const now = new Date().toISOString().slice(0, 10) 
    const [datee, setDate] = useState(now)
    return (
        <form className={styles.transactionForm} onSubmit={props.handleSubmit(props.submit)}>
            <Field component={DateInput} name='date' value={datee} onChange={(e) => setDate(e.target.value)} />
            <Field component={Input} name='sum' type="text" placeholder={`Сумма ${props.operationType}а`} validate={[required]} />

            <Field component={Select} name="score1"> 
                {props.bankAccounts.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field component={Select} name="category" validate={[required]} onClick={props.getAllCategories}>
                <option>Категория(Не выбрано)</option>
                { props.expenseCategories.map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                
                }
            </Field>
            <Field component={Select} name="contragent" id='contragentsInput' list="contragentsInput" placeholder='Контрагент'>
                <option>Контрагент(Не выбрано)</option>
            { props.contragents.map(item => {
                return <option key={item.id} value={item.id} >{item.name}</option>
            })}
            </Field>
            <Field component={Select} name="project">
                <option>Проект(Не выбрано)</option>
            { props.projects.map(item => {
                return <option key={item.id} value={item.id} >{item.name}</option>
            })}
            </Field>
            <Field component={Input} name='description' type="text" placeholder='Комментарий' />
            <div className={styles.btnBlock}>
                <button className={styles.operationBtn} disabled={props.pristine || props.submitting}>{props.submitting ? 'Создание...' :'Создать'}</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'expense' })(ExpenseForm)