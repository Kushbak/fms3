import React from 'react'
import styles from './FilterModal.module.css'
import { reduxForm, Field } from 'redux-form'
import categoriesReducer from '../../../reducers/categories'
import { useReducer } from 'react'
import { connect } from 'react-redux'
import { Checkbox } from '../FormsControl/FormControls'

const FilterModal = props => { 
    const submit = formData => {
        console.table(formData)
    }  
    return (
        <div className={styles.filterBlock}>
            <h3>Filter</h3>
            <form className={styles.form} onSubmit={props.handleSubmit(submit)}> 
                {props.incomes && <div className="filterItem">
                    <h4 className="filterTitle">Доходы</h4>
                    {props.incomes.map(item => (
                        <div className="">
                            <label>
                                <Field component={Checkbox} type='checkbox' name='доходы' value={String(item.id)}/>{item.name}
                            </label>
                        </div>
                    ))}    
                </div>}

                {props.expenses && <div className="filterItem">
                    <h4 className="filterTitle">Расходы</h4>
                    {props.expenses.map(item => (
                        <div className="">
                            <label>
                                <Field component={Checkbox} type='checkbox' name='расходы' value={String(item.id)}/>{item.name}
                            </label>
                        </div>
                    ))}
                </div>}


                {props.contragents && <div className="filterItem">
                    <h4 className="filterTitle">Контрагенты</h4>
                    {props.contragents.map(item => (
                        <div className="">
                            <label>
                                <Field component={Checkbox} type='checkbox' name='контрагенты' value={String(item.id)}/>{item.name}
                            </label>
                        </div>
                    ))}
                </div>}
                
                <div className="btnBlock">
                    <button className='button'>Log</button>
                </div>
            </form>
        </div>
    )
}

const mstp = state => ({
    incomes: state.categoriesReducer.incomeCategories,
    expenses: state.categoriesReducer.expenseCategories,
    contragents: state.contragentsReducer.contragents
})

export default connect(mstp)(reduxForm({form: 'filter'})(FilterModal))