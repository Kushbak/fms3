import React, { useState, useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { MaterialInput, MaterialSelect, MaterialDatePicker } from '../common/FormsControl/FormControls'
import styles from './CreateTransaction.module.css'
import GreenButton from '../common/GreenButton/GreenButton'

const RemittanceForm = props => {
    const [currentAcc1, setAcc1] = useState(1)
    const [currentAcc2, setAcc2] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const setRemittanceFormValues = () => {
        if (!!props.remittanceFormValues) {
            props.setRemittanceValues(props.remittanceFormValues)
        }
    }
    const handleDateChange = (date) => {
        setSelectedDate(date)
        setRemittanceFormValues()
    }
    useEffect(() => {
        setRemittanceFormValues()
    }, [props.remittanceFormValues])
    return (
        <form className={styles.remittanceForm} onSubmit={props.handleSubmit(props.onSubmit)}>
            <Field
                component={MaterialDatePicker}
                name='date'
                id="date-picker-remittance"
                label="Date picker remittance"
                value={selectedDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date remittance',
                }}
                onChange={handleDateChange}
            />
            <Field 
                component={MaterialInput} 
                name='sum' 
                type="text" 
                placeholder={`Сумма ${props.operationType}а`} 
                validate={[required]} 
            />
            <Field 
                component={MaterialSelect} 
                label='Со счета' 
                labelId='score1_label_id' 
                name="score1"
                validate={[required]} 
                onChange={e => setAcc1(+e.target.value)}
            >
                {props.bankAccountsIndex
                    .filter(item => +item.id !== +currentAcc2)
                    .map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                }
            </Field>
            <Field 
                component={MaterialSelect} 
                label='На счет' 
                labelId='score2_label_id' 
                name="score2"
                validate={[required]} 
                onChange={e => setAcc2(+e.target.value)}
            >
                {props.bankAccountsIndex
                    .filter(item => +item.id !== +currentAcc1)
                    .map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                }
            </Field>
            <Field 
                component={MaterialInput} 
                name='description' 
                type="text" 
                placeholder='Описание' 
            />
            <div className={styles.btnBlock}>
                <GreenButton type='submit' className={styles.operationBtn} disabled={props.submitting}>
                    {props.submitting ? 'Создание...' : 'Создать'}
                </GreenButton>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'remittance' })(RemittanceForm)