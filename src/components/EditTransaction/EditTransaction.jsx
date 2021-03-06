import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { MaterialDatePicker, MaterialSelect, MaterialInput } from '../common/FormsControl/FormControls'
import { required } from '../../utils/validators/validators'
import styles from './EditTransaction.module.css'
import GreenButton from '../common/GreenButton/GreenButton'

const EditTransactionModal = props => {
    const [currentAcc, setAcc] = useState(1)
    const [formData, setFormData] = useState(props.editedTransaction)
    const data = props.editedTransaction
    // TODO Добить defaultValue like an object {value: id, label: name}
    return (
        <form className={styles.editTransactionForm} onSubmit={props.handleSubmit(props.onSubmit)}>
            <Field
                className={props.classes.input}
                component={MaterialDatePicker}
                name='actionDate'
                label='Дата'
                ariaLabel='change date'
                valuee={formData.actionDate}
                onChange={(e) => setFormData({ ...formData, actionDate: e.target.value })}
                KeyboardButtonProps={{
                    'aria-label': 'change date edit',
                }}
            />
            <Field
                className={props.classes.input}
                component={MaterialInput}
                name='sum'
                type="text"
                label='Сумма'
                placeholder='Сумма'
                validate={[required]}
                onChange={(e) => setFormData({ ...formData, sum: e.target.value })}
            />
            {props.editedTransaction.scoreId
                && <Field
                    className={props.classes.input}
                    component={MaterialSelect}
                    name="scoreId"
                    label='Счет'
                    labelId='Score_label_id'
                    onClick={props.getBankAccounts}
                    onChange={e => setAcc(+e.target.value)}
                >
                    {props.bankAccountsIndex.map(item => <option key={item.id} value={item.id} label={item.name}>
                        {item.name}
                    </option>)}
                </Field>
            }
            {/* --------------------------------- */}
            {(props.editedTransaction.operationId && props.typeOfEditedTransaction !== 'Перевод')
                && <Field
                    className={props.classes.input}
                    component={MaterialSelect}
                    name='operationId'
                    label='Категория'
                    labelId='Operation_label_id'
                    validate={[required]}
                    onChange={(e) => setFormData({ ...formData, operationId: e.target.value })}
                    onClick={props.getAllCategories}
                >
                    {props[props.typeOfEditedTransaction === 'Доход' ? 'incomeCategories' : 'expenseCategories']
                        .map(item => <option key={item.id} value={item.id} label={item.name}>
                            {item.name}
                        </option>)
                    }
                </Field>
            }
            {(props.editedTransaction.projectId && props.typeOfEditedTransaction !== 'Перевод')
                && <Field
                    className={props.classes.input}
                    component={MaterialSelect}
                    name="projectId"
                    label='Проект'
                    labelId='Project_label_id'
                    onClick={props.getProjects}
                >
                    {props.projects.map(item => <option key={item.id} value={item.id}>
                        {item.name}
                    </option>)}
                </Field>
            }
            {props.editedTransaction.counterPartyId && props.typeOfEditedTransaction !== 'Перевод'
                ? <Field
                    className={props.classes.input}
                    component={MaterialSelect}
                    name="counterPartyId"
                    label='Контрагент'
                    labelId='Target_label_id'
                    id='contragentsInput'
                    list="contragentsInput"
                    placeholder='Контрагент'
                    onClick={props.getContragents}
                >
                    {props.contragents.map(item => <option key={item.id} value={item.id} label={item.name}>
                        {item.name}
                    </option>)}
                </Field>
                : <Field
                    className={props.classes.input}
                    component={MaterialSelect}
                    name="score2Id"
                    label='Счет 2'
                    labelId='Target_label_id'
                    id='scores2Input'
                    list="scores2Input"
                    placeholder='Контрагент'
                    onClick={props.getContragents}
                >
                    {props.bankAccountsIndex
                        .filter(item => +item.id !== +currentAcc)
                        .map(item => <option key={item.id} value={item.id} label={item.name}>
                            {item.name}
                        </option>)
                    }
                </Field>
            }
            <Field
                className={props.classes.input}
                component={MaterialInput}
                name='description'
                type="text"
                placeholder='Описание'
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className={styles.btnBlock}>
                <GreenButton type='submit' className={styles.operationBtn} disabled={props.pristine || props.submitting}>
                    {props.submitting ? 'Сохранение...' : 'Редактировать'}
                </GreenButton>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'editTransaction',
    enableReinitialize: true
})(EditTransactionModal)