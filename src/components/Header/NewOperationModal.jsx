import React, { useState } from 'react'
import { connect } from 'react-redux'
import Modal from '../common/Modal/Modal'
import styles from './Header.module.css' 
import { reduxForm, Field } from 'redux-form'  
import { createTransaction } from '../../actions/transactions'
import { getContragents } from '../../actions/contragents'
import { Input, DatetimeLocal, Select, Datalist } from '../common/FormsControl/FormControls'
import { required } from '../../utils/validators/validators'  
import { getAllCategories } from '../../actions/categories'

const OperationForm = (props) => { 
    let now = new Date()
    now.setHours(new Date().getHours() + 6)
    const [date, setDate] = useState(now.toISOString().slice(0, 16)) 
    return (
        <form onSubmit={ props.handleSubmit(props.submit) }> 
            <Field component={ DatetimeLocal } name='date' type="datetime-local" setValue={ date } onChange={ (e) => setDate(e.target.value) } />
            <Field component={ Input } name='amount' type="text" placeholder={`Сумма ${props.operationType}а`} validate={ [required] } />
            
            <Field component={ Select } name="bankAccount" id="bankAccount" validate={ [required] } >          
                <option>Счет</option>
                {props.bankAccounts.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field> 
            <Field component={ Select } name="category" validate={ [required] }>
                <option>Категория</option>
                {props.operationType === 'доход' 
                    ? props.incomeCategories.map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                    : props.expenseCategories.map(item => <option key={item.id} value={item.id} >{item.name}</option>)
                } 
            </Field>
            <Field component={Datalist} name="contragent" id='contragentsInput' list="contragentsInput" placeholder='Контрагент'>  
                {props.contragents.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
            </Field>
            <Field component={ Select } name="project">
                <option>Проект</option>
                {props.projects.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}         
            </Field>
            <Field component={ Input } name='comment' type="text" placeholder='Комментарий' /> 
            <div className={styles.btnBlock}>
                <button className={styles.operationBtn}>Сохранить</button> 
            </div>
        </form>
    )
} 

const NewOperationModal = ({ 
    bankAccounts, 
    closeModal, 
    createTransaction, 
    incomeCategories, 
    expenseCategories, 
    projects, 
    contragents, 
    isPostMsgDisplayed,
    creatingTransaction
}) => {
    const [isIncome, toggleIncome] = useState(true)  
    const submit = (formData) => { 
        let data = {
            transactionDate: formData.date 
                ? new Date(formData.date).toISOString()
                : new Date().toISOString(), 
            sum: +formData.amount || 0,
            scoreId: +formData.bankAccount,
            counterPartyId: +formData.contragent || '-',
            operationId: +formData.category || '-',
            projectId: +formData.project || '-', 
        }      
        createTransaction(data) 
    }  
 
    const ExpenseForm = reduxForm({ form: 'expense' })( 
        (props) => <OperationForm {...props} 
            operationType='расход' 
            bankAccounts={ bankAccounts } 
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            projects={projects}
            contragents={contragents}
            submit={submit}  
        /> 
    )
    const IncomeForm = reduxForm({ form: 'income' })(
        (props) => <OperationForm {...props} 
            operationType='доход' 
            bankAccounts={ bankAccounts } 
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            projects={projects}
            contragents={contragents}
            submit={submit}  
        /> 
    )  

    return(
        <Modal onClose={ closeModal }> 
            <div className={ styles.operationTabs }>
                <button className={ isIncome ? styles.activeTab : undefined } onClick={ () => toggleIncome(true) }>Доход</button>
                <button className={ !isIncome ? styles.activeTab : undefined } onClick={ () => toggleIncome(false) }>Расход</button>
            </div>
            <div className={ styles.operationBody }>
                {isIncome 
                    ? <IncomeForm />
                    : <ExpenseForm />
                }
                <p className={ [styles.alertMsg, isPostMsgDisplayed ? styles.successMsg : undefined].join(' ') }>
                    {creatingTransaction && 'Создание...'}
                    {isPostMsgDisplayed && 'Транзакция создана!'}
                </p>
            </div>
        </Modal>
    )
}

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    expenseCategories: state.categoriesReducer.expenseCategories,
    incomeCategories: state.categoriesReducer.incomeCategories,
    projects: state.projectsReducer.projects,
    contragents: state.contragentsReducer.contragents,
    isPostMsgDisplayed: state.transactionsReducer.isPostMsgDisplayed,
    creatingTransaction: state.transactionsReducer.creatingTransaction,
    
})

export default connect(mstp, { createTransaction, getContragents, getAllCategories })(NewOperationModal)
