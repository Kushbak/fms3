import React from 'react'
import styles from './Settings.module.css'
import { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControl/FormControls'
import Preloader from '../../common/Preloader/Preloader' 
import deleteBtn from '../../../assets/img/icons/delete.svg'
import editBtn from '../../../assets/img/icons/edit.svg'

const NewCategoryForm = reduxForm({ form: 'newCategory' })
    ((props) => {
        return (
            <form
                className={styles.newCategoryForm}
                onSubmit={props.handleSubmit((formData) => props.addNewCategory(formData, props.type))}>
                <Field
                    component={Input}
                    type="text"
                    name='newCategory'
                    onBlur={(e) => !e.target.value && props.setNum(0)}
                    validate={[props.maxLength20]}
                    autoFocus={true}
                />
                <button onClick={(e) => e.target.value && props.setNum(0)}>{'>'}</button>
            </form>
        )
    })

const Settings = (props) => {
    const [numOfSection, setNum] = useState(0)
    const [idOfElement, setIdofElement] = useState()
    const [dValue, setValue] = useState()
    const addNewCategory = (formData, type) => { 
        switch (type) {
            case 'bankAccount': { 
                const data = {
                    name: formData.newCategory,
                    code: '1235678910',
                    balance: '10 000 сом'
                }
                props.addBankAccount(data)
                break;
            }
            case 'contragent': { 
                const data = {
                    name: formData.newCategory
                }
                props.addContragent(data)
                break;
            }
            case 'income': { 
                const data = {
                    name: formData.newCategory,
                    operationTypes: null,
                    type: 1
                }
                props.createCategory(data)
                break;
            }
            case 'expense': { 
                const data = {
                    name: formData.newCategory,
                    operationTypes: null,
                    type: 2
                }
                props.createCategory(data)
                break;
            }
            default: 
                formData.newCategory = ''
                setNum(0)
                break;
        }
        formData.newCategory = ''
        setNum(0)
    }
    const maxLength20 = maxLengthCreator(20) 
    if (props.categoriesFetching) return <Preloader /> 
    return (
        <div className={styles.settings}>

            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Счета</p>
                {props.bankAccounts.map(item => (
                    <p className={styles.settingsItem} key={item.id}> 
                        {!(idOfElement === item.id) && item.name}
                        <span>
                            { idOfElement === item.id
                                ? <input
                                    className={styles.editInput} 
                                    type="text" 
                                    onBlur={() => {
                                        props.editBankAccountSuccess({...item, name: dValue}) 
                                        setIdofElement(0) 
                                        setValue()
                                    }} 
                                    value={dValue} 
                                    autoFocus={true}
                                    onChange={(e) => setValue(e.target.value)} />
                                : <img
                                    src={editBtn}
                                    alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id)
                                        setValue(item.name)
                                    }} />
                            }
                            <img src={deleteBtn} onClick={() => props.removeBankAccount(item.name)} alt='delete' />
                        </span>
                    </p>
                ))}
                <div className={styles.btnBlock}>
                    {numOfSection === 1
                        ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type='bankAccount' addNewCategory={addNewCategory} maxLength20={maxLength20} />
                        : <button className={styles.addNewItemBtn} onClick={() => setNum(1)} >добавить +</button>
                    }
                </div>
            </div>

            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Категория дохода</p>
                {props.incomeCategories.map(item => (
                    <p className={styles.settingsItem} key={item.id}>
                        {!(idOfElement === item.id) && item.name}
                        <span> 
                            {idOfElement === item.id
                                ? <input
                                    className={styles.editInput} 
                                    type="text"
                                    onBlur={() => {
                                        props.editIncomeCategorySuccess({ ...item, name: dValue })
                                        setIdofElement(0)
                                        setValue()
                                    }}
                                    value={dValue}
                                    autoFocus={true}
                                    onChange={(e) => setValue(e.target.value)} />
                                : <img
                                    src={editBtn}
                                    alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id)
                                        setValue(item.name)
                                    }} />
                            }
                            <img src={deleteBtn} onClick={() => props.deleteCategory(item)} alt='delete' /> 
                        </span>
                    </p>
                ))}
                <div className={styles.btnBlock}>
                    {numOfSection === 2
                        ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type='income' addNewCategory={addNewCategory} maxLength20={maxLength20} />
                        : <button className={styles.addNewItemBtn} onClick={() => setNum(2)} >добавить +</button>
                    }
                </div>
            </div>

            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Категория расхода</p>
                {props.expenseCategories.map(item => (
                    <p className={styles.settingsItem} key={item.id}>
                        {!(idOfElement === item.id) && item.name}
                        <span>
                            {idOfElement === item.id
                                ? <input
                                    className={styles.editInput} 
                                    type="text"
                                    onBlur={() => {
                                        props.editExpenseCategorySuccess({ ...item, name: dValue })
                                        setIdofElement(0)
                                        setValue()
                                    }}
                                    value={dValue}
                                    autoFocus={true}
                                    onChange={(e) => setValue(e.target.value)} />
                                : <img
                                    src={editBtn}
                                    alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id)
                                        setValue(item.name)
                                    }} />
                            }
                            <img src={deleteBtn} onClick={() => props.deleteCategory(item)} alt='delete'/> 
                        </span>
                    </p>
                ))}
                <div className={styles.btnBlock}>
                    {numOfSection === 3
                        ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type='expense' addNewCategory={addNewCategory} maxLength20={maxLength20} />
                        : <button className={styles.addNewItemBtn} onClick={() => setNum(3)} >добавить +</button>
                    }
                </div>
            </div>

            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Контрагент</p>
                {props.contragents.map(item => (
                    <p className={styles.settingsItem} key={item.id}>
                        {!(idOfElement === item.id) && item.name}
                        <span>
                            {idOfElement === item.id
                                ? <input
                                    className={styles.editInput} 
                                    type="text"
                                    onBlur={() => {
                                        props.editContragentSuccess({ ...item, name: dValue })
                                        setIdofElement(0)
                                        setValue()
                                    }}
                                    value={dValue}
                                    autoFocus={true}
                                    onChange={(e) => setValue(e.target.value)} />
                                : <img
                                    src={editBtn}
                                    alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id)
                                        setValue(item.name)
                                    }} />
                            }
                            <img src={deleteBtn} onClick={() => props.removeContragent(item.name)} alt='delete' /> 
                        </span>
                    </p>
                ))}
                <div className={styles.btnBlock}>
                    {numOfSection === 4
                        ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type='contragent' addNewCategory={addNewCategory} maxLength20={maxLength20} />
                        : <button className={styles.addNewItemBtn} onClick={() => setNum(4)} >добавить +</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Settings