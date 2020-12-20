import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import styles from './CreateTransaction.module.css'
import Modal from '@material-ui/core/Modal'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import RemittanceForm from './RemittanceForm'
import { createTransaction, DisplayPostMsg } from '../../actions/transactions'
import { createRemittance } from '../../actions/remittance'
import { getContragents } from '../../actions/contragents'
import { getAllCategories } from '../../actions/categories'
import { getFormValues } from 'redux-form'
import { getBankAccounts } from '../../actions/bankAccounts'
import { getProjects } from '../../actions/projects' 
import TostifyAlert from '../common/TostifyAlert/TostifyAlert'
import { Fade, Backdrop, makeStyles } from '@material-ui/core'
import {
    setIncomeValues,
    setExpenseValues,
    setRemittanceValues
} from '../../actions/currentValues'

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#32b482'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid #32b482'
        }
    },
}))

const CreateTransactionModal = memo((props) => { 
    const [Tab, setTab] = useState(1)
    const classes = useStyles()
    const submit = (formData) => {
        const now = new Date()
        let data = {
            actionDate: formData.date
                ? new Date(formData.date.setHours(formData.date.getHours() + 6)).toISOString()
                : new Date(now.setHours(now.getHours() + 6)).toISOString(),
            sum: +formData.sum,
            scoreId: +formData.score1,
            score2Id: +formData.score2 || null,
            counterPartyId: +formData.contragent || null,
            operationId: +formData.category || null,
            projectId: +formData.project || null,
            description: formData.description || "",
        }  
        if (data.score2Id) {
            props.createRemittance(data) 
        } else {
            props.createTransaction(data)
        }
    }
    
    const { currentIncomeFields, currentExpenseFields, currentRemittanceFields } = props.currentValuesReducer

    return (
        <Modal 
            className={classes.modal}
            onClose={props.closeModal} 
            open={props.open} 
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={styles.createTransactionModal}> 
                    <div className={styles.operationTabs}>
                        <button className={Tab === 1 ? styles.activeTab : undefined} onClick={() => setTab(1)}>Доход</button>
                        <button className={Tab === 2 ? styles.activeTab : undefined} onClick={() => setTab(2)}>Расход</button>
                        <button className={Tab === 3 ? styles.activeTab : undefined} onClick={() => setTab(3)}>Перевод</button>
                    </div>
                    { Tab === 1 
                        && <IncomeForm {...props}
                            initialValues={currentIncomeFields} 
                            incomeFormValues={props.incomeFormValues}
                            operationType='доход' 
                            onSubmit={submit} 
                            input={classes.input}
                        />
                    }
                    { Tab === 2 
                        && <ExpenseForm {...props}
                            initialValues={currentExpenseFields}
                            expenseFormValues={props.expenseFormValues} 
                            operationType='расход' 
                            onSubmit={submit}
                            input={classes.input}
                        />
                    }
                    { Tab === 3 
                        && <RemittanceForm {...props}
                            initialValues={currentRemittanceFields} 
                            remittanceFormValues={props.remittanceFormValues}
                            operationType='перевод' 
                            onSubmit={submit}
                            input={classes.input}
                        />
                    } 
                    <TostifyAlert 
                        setMsg={props.DisplayPostMsg}
                        displayedMsg={props.displayedMsg[0]}
                        severity={props.displayedMsg[1] ? 'success' : 'error'}
                    />
                </div>
            </Fade>
        </Modal>
    )
})

const mstp = (state) => ({
    bankAccountsIndex: state.bankAccountsReducer.bankAccountsIndex,
    expenseCategories: state.categoriesReducer.expenseCategories,
    incomeCategories: state.categoriesReducer.incomeCategories,
    projects: state.projectsReducer.projects,
    contragents: state.contragentsReducer.contragents,
    displayedMsg: state.transactionsReducer.displayedMsg,
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
    setRemittanceValues,
    DisplayPostMsg
})(CreateTransactionModal)
