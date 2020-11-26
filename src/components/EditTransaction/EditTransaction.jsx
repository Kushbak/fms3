import React, { useState } from 'react'
import Modal from '../common/Modal/Modal'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { openEditModal, editTransaction } from '../../actions/transactions'
import { editRemittance } from '../../actions/remittance'
import { DateInput, Select, Input } from '../common/FormsControl/FormControls'
import { required } from '../../utils/validators/validators'
import styles from './EditTransaction.module.css'
import { getContragents } from '../../actions/contragents'
import { getAllCategories } from '../../actions/categories' 
import { getBankAccounts } from '../../actions/bankAccounts'
import { getProjects } from '../../actions/projects' 

const EditTransactionModal = props => {
    const now = new Date().toISOString().slice(0, 10)
    const [transactionData, setTransactionData] = useState(props.editedTransaction)
    const [currentAcc, setAcc] = useState(1)
    const [datee, setDate] = useState(now)
    const submit = (formData) => {
        let data = {
            id: props.editedTransaction.id,
            transactionDate: formData.actionDate
                ? new Date(formData.actionDate).toISOString()
                : new Date().toISOString(),
            actionDate: formData.actionDate
                ? new Date(formData.actionDate).toISOString()
                : new Date().toISOString(),
            sum: +formData.sum || null,
            scoreId: +formData.score || null,
            score2Id: +formData.score2 || null,
            targetEntity: +formData.targetEntity || null,
            operationId: +formData.operationName || null,
            projectId: +formData.projectName || null,
            description: formData.description || null,
        }
        if (props.editedTransaction.transactionType !== 'Перевод') {
            props.editTransaction(data)
        } else {
            props.editRemittance(data)
        }
    } 
    return (
        <Modal onClose={() => props.openEditModal(false)}>
            <h3 className={styles.title}>Редактирование транзакции</h3>
            <form className={styles.editTransactionForm} onSubmit={props.handleSubmit(submit)}>
                {transactionData.actionDate
                    && <Field
                        component={DateInput}
                        name='actionDate'
                        value={datee}
                        onChange={(e) => setDate(e.target.value)}
                    />
                }
                {transactionData.sum
                    && <Field
                        component={Input}
                        name='sum'
                        type="text"
                        placeholder='Сумма'
                        validate={[required]}
                    />
                }
                {transactionData.score
                    && <Field component={Select} name="score" onClick={props.getBankAccounts}>
                        {props.bankAccounts.map(item => <option key={item.id} value={item.id} label={item.name}>{item.name}</option>)}
                    </Field>
                }
                {(transactionData.operationName && transactionData.discriminator !== 'Remittance')
                    && <Field component={Select} name="operationName" validate={[required]} onClick={props.getAllCategories}> 
                        {props[props.editedTransaction.transactionType === 'Доход' ? 'incomeCategories' : 'expenseCategories']
                            .map(item => <option key={item.id} value={item.id} label={item.name}>{item.name}</option>)}
                    </Field>
                }
                {(transactionData.projectName && transactionData.discriminator !== 'Remittance')
                    && <Field component={Select} name="projectName" onClick={props.getProjects}> 
                            {props.projects.map(item => {
                                return <option key={item.id} value={item.id} label={item.name}>{item.name}</option>
                            })} 
                    </Field>
                }
                {transactionData.targetEntity
                    && <Field component={Select} name="targetEntity" id='contragentsInput' list="contragentsInput" placeholder='Контрагент' onClick={props.getContragents}>
                            {props.contragents.map((item) => { 
                                return <option key={item.id} value={item.id} label={item.name}>{item.name}</option>
                            })}
                    </Field>
                }
                <Field component={Input} name='description' type="text" placeholder='Комментарий' />
                <div className={styles.btnBlock}>
                    <button>Сохранить</button>
                </div>
            </form>
        </Modal>
    )
}

const mstp = state => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    expenseCategories: state.categoriesReducer.expenseCategories,
    incomeCategories: state.categoriesReducer.incomeCategories,
    projects: state.projectsReducer.projects,
    contragents: state.contragentsReducer.contragents,
    editedTransaction: state.transactionsReducer.editedTransaction,
    initialValues: state.transactionsReducer.editedTransaction,
    currentFormValues: getFormValues('editTransaction')(state),
})

export default compose(
    connect(mstp, {
        openEditModal, 
        editTransaction, 
        editRemittance, 
        getContragents, 
        getAllCategories, 
        getBankAccounts, 
        getProjects 
    }),
    reduxForm({
        form: 'editTransaction',
        enableReinitialize: true
    })
)(EditTransactionModal)