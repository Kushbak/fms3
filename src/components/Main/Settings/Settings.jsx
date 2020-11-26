import React from 'react'
import styles from './Settings.module.css'
import { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControl/FormControls'
import Preloader from '../../common/Preloader/Preloader'
import deleteBtn from '../../../assets/img/icons/delete.svg'
import editBtn from '../../../assets/img/icons/edit.svg'
import saveBtn from '../../../assets/img/icons/save.svg'
import closeBtn from '../../../assets/img/icons/close.svg'

const NewCategoryForm =
    reduxForm({ form: 'newCategory' })
        ((props) => {
            return (
                <form
                className={styles.newCategoryForm}
                onSubmit={props.handleSubmit((formData) =>
                    props.addNewCategory(formData, props.type))}>

                    <div className={ styles.formBlock }> 
                        <Field
                            component={Input}
                            type="text"
                            name='newCategory'
                            onBlur={(e) => !(props.type === 'bankAccount') && (!e.target.value && props.setNum(0))}
                            validate={[props.maxLength20]}
                            autoFocus={true}
                        />
                        {props.type === 'bankAccount' &&
                            <>  
                                <Field
                                    component={Input}
                                    type="text"
                                    name='code'
                                    onBlur={(e) => !e.target.value && props.setNum(0)}  
                                    placeholder='Номер счета'
                                />
                                <Field component='input' type="checkbox" name='isOwn' />
                                Наш счет
                            </>
                        }
                    </div> 
                    <button><img src={saveBtn} onClick={(e) => props.setNum(0)} alt='save' /></button>
                </form>
            )
        })

const Settings = (props) => {
    const [numOfSection, setNum] = useState(0)
    const [idOfElement, setIdofElement] = useState()
    const [dValue, setValue] = useState()
    const [BAvalue, setBAvalue] = useState()
    const addNewCategory = (formData, type) => {
        switch (type) {
            case 'bankAccount': { 
                props.addBankAccount({
                    name: formData.newCategory,
                    code: formData.code
                })
                break;
            }
            case 'contragent': { 
                props.addContragent({ name: formData.newCategory })
                break;
            }
            case 'income': { 
                props.createCategory({
                    name: formData.newCategory,
                    operationTypes: null,
                    type: 1
                })
                break;
            }
            case 'expense': { 
                props.createCategory({
                    name: formData.newCategory,
                    operationTypes: null,
                    type: 2
                })
                break;
            }
            case 'project': { 
                props.createProject({ name: formData.newCategory})
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
    const entities = [
        {
            id: 2,
            title: 'Категория дохода',
            reducerName: 'incomeCategories',
            editFunc: function(value) {
                props.editCategory(value)
            },
            deleteFunc: function(value) {
                props.deleteCategory(value)
            }, 
            type: 'income'
        },
        {
            id: 3,
            title: 'Категория расхода',
            reducerName: 'expenseCategories',
            editFunc: function (value) {
                props.editCategory(value)
            },
            deleteFunc: function (value) {
                props.deleteCategory(value)
            }, 
            type: 'expense'
        },
        {
            id: 4,
            title: 'Контрагент',
            reducerName: 'contragents',
            editFunc: function (value) {
                props.editContragent(value)
            },
            deleteFunc: function (value) {
                props.deleteContragent(value)
            }, 
            type: 'contragent'
        },
    ]
    // TODO при создании счета добавлять наш ли этот счет или внешний
    if (props.categoriesFetching) return <Preloader />
    return (
        <div className={styles.settings}>
            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Счета</p>
                {props.bankAccounts.map(item => (
                    <div className={styles.settingsItem} key={item.id}>
                        {!(idOfElement === item.id + item.name) && item.name}
                        {idOfElement === item.id + item.name
                            ? <>
                                <div className={styles.inputs}>
                                    <input className={styles.editInput} type="text" value={dValue} autoFocus={true} onChange={(e) => setValue(e.target.value)} />
                                    <input className={styles.editInput} type="text" value={BAvalue} onChange={(e) => setBAvalue(e.target.value)} />
                                </div>
                                <img src={saveBtn} alt="save" onClick={() => {
                                    (dValue !== item.name || BAvalue !== item.code) && props.editBankAccount({ ...item, name: dValue, code: BAvalue })
                                    setValue()
                                    setBAvalue()
                                    setIdofElement(0)
                                }} />
                                <img src={closeBtn} alt="cancel" onClick={() => setIdofElement(0)} />
                            </>
                            : <span>
                                <img src={editBtn} alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id + item.name)
                                        setValue(item.name)
                                        setBAvalue(item.code)
                                    }} />
                                <img src={deleteBtn} onClick={() => props.deleteBankAccount(item.name)} alt='delete' />
                            </span>
                        }
                    </div>
                ))}
                <div className={styles.btnBlock}>
                    {numOfSection === 1
                        ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type='bankAccount' addNewCategory={addNewCategory} maxLength20={maxLength20} />
                        : <button className={styles.addNewItemBtn} onClick={() => setNum(1)} >добавить +</button>
                    }
                </div>
            </div>

            {entities.map(entity => (
                <div className={styles.settingsSection}>
                    <p className={styles.settingsTitle}>{entity.title}</p>
                    {props[entity.reducerName].map(item => (
                        <div className={styles.settingsItem} key={item.id}>
                            {!(idOfElement === item.id + item.name) && item.name}

                            {idOfElement === item.id + item.name
                                ? <>
                                    <input className={styles.editInput} type="text" value={dValue} autoFocus={true} onChange={(e) => setValue(e.target.value)} />
                                    <img src={saveBtn} alt="save" onClick={() => {
                                        dValue !== item.name && entity.editFunc({ ...item, name: dValue })
                                        setValue()
                                        setIdofElement(0)
                                    }} />
                                    <img src={closeBtn} alt="cancel" onClick={() => setIdofElement(0)} />
                                </>
                                : <span>
                                    <img src={editBtn} alt='edit'
                                        onClick={() => {
                                            setIdofElement(item.id + item.name)
                                            setValue(item.name)
                                        }} />
                                    <img src={deleteBtn} onClick={() => entity.deleteFunc(item)} alt='delete' />
                                </span>
                            }
                        </div>
                    ))}
                    <div className={styles.btnBlock}>
                        {numOfSection === entity.id
                            ? <NewCategoryForm numOfSection={numOfSection} setNum={setNum} type={entity.type} addNewCategory={addNewCategory} maxLength20={maxLength20} />
                            : <button className={styles.addNewItemBtn} onClick={() => setNum(entity.id)} >добавить +</button>
                        }
                    </div>
                </div>
            ))}  
        </div>
    )
}

export default Settings
// строки до рефакторинга 235
// строки после рефакторинга 200