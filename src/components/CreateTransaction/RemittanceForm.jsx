import React, { useState } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { DateInput, Input, Select, Datalist } from '../common/FormsControl/FormControls'
import styles from './CreateTransaction.module.css'

const RemittanceForm = props => {
    const now = new Date().toISOString().slice(0, 10)
    const [datee, setDate] = useState(now)
    const [currentAcc, setAcc] = useState(1)
    return (
        <form className={styles.remittanceForm} onSubmit={props.handleSubmit(props.onSubmit)}>
            <Field component={DateInput} name='date' setValue={datee} onChange={e => setDate(e.target.value)} />
            <Field component={Input} name='sum' type="text" placeholder={`Сумма ${props.operationType}а`} validate={[required]} />
            <Field component={Select} name="score1" onChange={e => setAcc(+e.target.value)}> 
                {props.bankAccounts.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field component={Select} name="score2"> 
                { props.bankAccounts
                   .filter(item => +item.id !== +currentAcc)
                   .map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                }
            </Field>
            <Field component={Input} name='description' type="text" placeholder='Комментарий' /> 
            <div className={styles.btnBlock}>
                <button className={styles.operationBtn}>Сохранить</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'remittance' })(RemittanceForm)