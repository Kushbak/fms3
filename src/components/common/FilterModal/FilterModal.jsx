import React, { useState } from 'react'
import styles from './FilterModal.module.css'
import { reduxForm, Field } from 'redux-form' 
import { MenuItem } from '@material-ui/core'
import { MaterialSelect, MaterialDatePicker } from '../FormsControl/FormControls'  
import GreenButton from '../GreenButton/GreenButton'

const FilterModalComponent = (props) => {   
    const reset = (isCllicked) => {
        if (isCllicked >= 1) {
            props.setFilterTransactionValues(null)
            props.reset()
            if (isCllicked != 3) {
                reset(3)
            }
        }        
    }  
    const [date1, setDate1] = useState()
    const [date2, setDate2] = useState()
    // TODO Зарефакторить код для пользования во всех местах
    // TODO Добавить условие на показ только нужных полей из всех
    // TODO Возможность отправлять в пропсы свои функции вместо захардкоженных(к примеру тот же setFilterValues())
    return (
        <div className={styles.filterBlock}>
            <h3>Фильтрация</h3>
            <form className={styles.form} onSubmit={props.handleSubmit(props.onSubmit)} onChange={() => props.setFilterFormValues()}>

                <div className={styles.dates}>
                    От
                    <Field  
                        component={MaterialDatePicker}
                        className={props.classes.input}
                        value={date1}
                        onChange={(e) => setDate1(e)}
                        name='StartDate'
                        id="date-picker-filtering-start"
                        label="Date picker filtering start"
                        KeyboardButtonProps={{
                            'aria-label': 'change date filtering',
                        }}
                    />
                До
                    <Field      
                        component={MaterialDatePicker}
                        className={props.classes.input}
                        value={date2}
                        onChange={(e) => setDate2(e)}
                        name='EndDate'
                        id="date-picker-filtering-end"
                        label="Date picker filtering end"
                        KeyboardButtonProps={{
                            'aria-label': 'change date filtering',
                        }}
                    />
                </div>
                <Field 
                    component={MaterialSelect} 
                    className={props.classes.greenSelectedOption}
                    name='OperationsId'  
                    label='Категория'
                    labelId='Category_label_id'
                    onClick={props.getAllCategories}
                    multiple
                >  
                    {props.incomes.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}  
                </Field>
                <Field
                    component={MaterialSelect}
                    className={props.classes.greenSelectedOption}
                    name='CounterPartiesId' 
                    label='Контрагент'
                    labelId='Contragent_label_id'
                    onClick={props.getContragents}
                    multiple
                >
                    {props.contragents.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={MaterialSelect}
                    className={props.classes.greenSelectedOption}
                    name='ScoresId' 
                    label='Счет'
                    labelId='BankAccount_label_id'
                    onClick={props.getBankAccounts}
                    multiple
                >
                    {props.bankAccountsIndex.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={MaterialSelect}
                    className={props.classes.greenSelectedOption}
                    name='ProjectsId' 
                    label='Проект'
                    labelId='Project_label_id'
                    onClick={props.getProjects}
                    multiple
                >
                    {props.projects.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Field>
                
                <div className={styles.btnBlock}>
                    <GreenButton type='submit'>Применить</GreenButton>
                    <GreenButton onClick={() => reset(1)}>Очистить</GreenButton>  
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'filter',
    enableReinitialize: true
})(FilterModalComponent)

