import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import styles from './CreateTransaction.module.css'
import Modal from '../common/Modal/Modal'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import RemittanceForm from './RemittanceForm'
import { createTransaction } from '../../actions/transactions'
import { createRemittance } from '../../actions/remittance'
import { getContragents } from '../../actions/contragents'
import { getAllCategories } from '../../actions/categories'
import { getFormValues } from 'redux-form'
import { getBankAccounts } from '../../actions/bankAccounts'
import { getProjects } from '../../actions/projects' 
import {
    setIncomeValues,
    setExpenseValues,
    setRemittanceValues
} from '../../actions/currentValues' 

const CreateTransactionModal = memo((props) => { 
    const [Tab, setTab] = useState(1)
    const submit = (formData) => {
        let data = {
            actionDate: formData.date
                ? new Date(formData.date).toISOString()
                : new Date().toISOString(),
            sum: +formData.sum,
            scoreId: +formData.score1,
            score2Id: +formData.score2,
            counterPartyId: +formData.contragent || null,
            operationId: +formData.category,
            projectId: +formData.project || null,
            description: formData.description || "",
        }  
        props.createTransaction(data)
    }
    const submitRemittance = (formData) => {
        let data = {
            date: formData.date
                ? new Date(formData.date).toISOString()
                : new Date().toISOString(),
            sum: +formData.sum,
            scoreId: +formData.score1,
            score2Id: +formData.score2,
            description: formData.description,  
        } 
        props.createRemittance(data)
    } 
    return (
        <Modal className={styles.createTransactionModal} onClose={props.closeModal}>
            <div className={styles.operationTabs}>
                <button className={Tab === 1 ? styles.activeTab : undefined} onClick={() => setTab(1)}>Доход</button>
                <button className={Tab === 2 ? styles.activeTab : undefined} onClick={() => setTab(2)}>Расход</button>
                <button className={Tab === 3 ? styles.activeTab : undefined} onClick={() => setTab(3)}>Перевод</button>
            </div>
            <div className={styles.operationBody}>

                { Tab === 1 
                    && <IncomeForm {...props}
                      incomeValues={props.currentValuesReducer.currentIncomeFields} 
                      operationType='доход' 
                      onSubmit={submit} 
                    />
                }
                { Tab === 2 
                    && <ExpenseForm {...props}
                      expenseValues={props.currentValuesReducer.currentExpenseFields} 
                      operationType='расход' 
                      onSubmit={submit} 
                    />
                }
                { Tab === 3 
                    && <RemittanceForm {...props}
                      remittanceValues={props.currentValuesReducer.currentRemittanceFields} 
                      operationType='перевод' 
                      onSubmit={submitRemittance} 
                    />
                }

                <p className={[styles.alertMsg, props.isPostMsgDisplayed ? styles.successMsg : undefined].join(' ')}> 
                    {props.isPostMsgDisplayed}
                </p>

            </div>
        </Modal>
    )
})

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    expenseCategories: state.categoriesReducer.expenseCategories,
    incomeCategories: state.categoriesReducer.incomeCategories,
    projects: state.projectsReducer.projects,
    contragents: state.contragentsReducer.contragents,
    isPostMsgDisplayed: state.transactionsReducer.isPostMsgDisplayed,
    creatingTransaction: state.transactionsReducer.creatingTransaction,
    incomeFormValues: getFormValues('income')(state),
    expenseFormValues: getFormValues('expense')(state),
    remittanceFormValues: getFormValues('remittance')(state),
    currentValuesReducer: state.currentValuesReducer
})

export default connect(mstp, {
    createTransaction,
    createRemittance,
    getContragents,
    getBankAccounts,
    getProjects,
    getAllCategories,
    setIncomeValues,
    setExpenseValues,
    setRemittanceValues
})(CreateTransactionModal)
