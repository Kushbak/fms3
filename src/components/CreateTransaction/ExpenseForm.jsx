import React, { useState, useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { MaterialSelect, MaterialInput, MaterialDatePicker } from '../common/FormsControl/FormControls'
import styles from './CreateTransaction.module.css'
import GreenButton from '../common/GreenButton/GreenButton'

const ExpenseForm = props => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const setExpenseFormValues = () => {
        if (!!props.expenseFormValues) {
            props.setExpenseValues(props.expenseFormValues)
        }
    }
    const handleDateChange = (date) => {
        setSelectedDate(date)
        setExpenseFormValues()
    }
    useEffect(() => {
        setExpenseFormValues()
    }, [props.expenseFormValues])
    return (
        <form className={styles.transactionForm} onSubmit={props.handleSubmit(props.submit)} onChange={setExpenseFormValues}>
            <Field
                className={props.classes.greenInputLabel}
                component={MaterialDatePicker}
                name='date'
                id="date-picker-expense"
                label="Date picker expense"
                value={selectedDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date expense',
                }}
                onChange={handleDateChange}
            />
            <Field
                className={props.classes.greenInputLabel}
                component={MaterialInput}
                name='sum'
                label='Сумма'
                type='number'
                placeholder={`Сумма ${props.operationType}а`}
                validate={[required]}
            />
            <Field
                className={props.classes.greenSelectLabel}
                component={MaterialSelect}
                label='Счет'
                labelId='BankAccs_label_id'
                name="score1"
                onClick={props.getBankAccounts}
            >
                {props.bankAccountsIndex.map((item) => <option key={item.id} value={item.id} label={item.name}>{item.name}</option>)}
            </Field>
            <Field
                className={props.classes.greenSelectLabel}
                component={MaterialSelect}
                label='Категории'
                labelId='Categories_label_id'
                name="category"
                validate={[required]}
                onClick={props.getAllCategories}
            >
                {props.expenseCategories.map(item => <option key={item.id} value={item.id} label={item.name}>{item.name}</option>)}
            </Field>
            <Field
                className={props.classes.greenSelectLabel}
                component={MaterialSelect}
                label='Контрагент'
                labelId='Contragents_label_id'
                name="contragent"
                id='contragentsInput'
                list="contragentsInput"
                placeholder='Контрагент'
                onClick={props.getContragents}
            >
                {props.contragents.map(item => <option key={item.id} value={item.id} label={item.name}>{item.name}</option>)}
            </Field>
            <Field
                component={MaterialSelect}
                label='Проект'
                labelId='Projects_label_id'
                name="project"
                onClick={props.getProjects}
                className={props.classes.greenSelectLabel}
            >
                {props.projects.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field
                component={MaterialInput}
                value={props.incomeValues?.description || ''}
                name='description'
                type="text"
                placeholder='Описание'
                className={props.classes.greenInputLabel}
            />
            <div className={styles.btnBlock}>
                <GreenButton type='submit' className={styles.operationBtn} disabled={props.submitting}>
                    {props.submitting ? 'Создание...' : 'Создать'}
                </GreenButton>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'expense',
    enableReinitialize: true
})(ExpenseForm)