import React from 'react'
import EditTransaction from './EditTransaction'
import { getContragents } from '../../actions/contragents'
import { getAllCategories } from '../../actions/categories'
import { getBankAccounts } from '../../actions/bankAccounts'
import { getProjects } from '../../actions/projects'
import { connect } from 'react-redux'
import { openEditModal, editTransaction, DisplayPostMsg, setEditedTransaction } from '../../actions/transactions'
import { editRemittance } from '../../actions/remittance'
import { getFormValues } from 'redux-form'
import Preloader from '../common/Preloader/Preloader'
import { makeStyles } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { Fade, Backdrop } from '@material-ui/core'
import TostifyAlert from '../common/TostifyAlert/TostifyAlert'
import styles from './EditTransaction.module.css'

const useStyles = makeStyles((theme) => ({
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


const EditTransactionContainer = (props) => {
    const classes = useStyles()
    const submit = (formData) => {
        let data = {
            id: props.editedTransaction.id,
            actionDate: formData.actionDate
                ? new Date(formData.actionDate).toISOString()
                : new Date().toISOString(),
            sum: +formData.sum || null,
            scoreId: +formData.scoreId || null,
            score2Id: +formData.score2Id || null,
            counterPartyId: +formData.counterPartyId || null,
            operationId: +formData.operationId || null,
            projectId: +formData.projectId || null,
            description: formData.description || null,
        }
        if (!props.editedTransaction.score2Id) {
            props.editTransaction(data)
        } else {
            props.editRemittance(data)
        }
    }
    return (
        <Modal
            open={props.isModalOpen}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            onClose={() => {
                props.setEditModal(false)
                props.setEditedTransaction(null, null)
            }}
        >
            <Fade in={props.isModalOpen}>
                <div className={[styles.editedTransactionWrapper, !props.editedTransaction ? styles.wrapperOnLoad : undefined].join(' ')}>
                    <h3 className={styles.title}>Редактирование транзакции</h3>
                    {!props.editedTransaction 
                        ? < Preloader />
                        : <EditTransaction {...props}
                            onSubmit={submit}
                            classes={classes}
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
}

const mstp = state => ({
    bankAccountsIndex: state.bankAccountsReducer.bankAccountsIndex,
    expenseCategories: state.categoriesReducer.expenseCategories,
    incomeCategories: state.categoriesReducer.incomeCategories,
    projects: state.projectsReducer.projects,
    contragents: state.contragentsReducer.contragents,
    displayedMsg: state.transactionsReducer.displayedMsg,
    editedTransaction: state.transactionsReducer.editedTransaction,
    initialValues: state.transactionsReducer.editedTransaction,
    typeOfEditedTransaction: state.transactionsReducer.typeOfEditedTransaction,
    
})

export default connect(mstp, {
    editTransaction,
    editRemittance,
    getContragents,
    setEditedTransaction,
    getAllCategories,
    getBankAccounts,
    getProjects,
    DisplayPostMsg,
})(EditTransactionContainer)