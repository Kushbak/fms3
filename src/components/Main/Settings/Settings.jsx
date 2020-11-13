import React from 'react'
import styles from './Settings.module.css'
import { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControl/FormControls'
import Preloader from '../../common/Preloader/Preloader'

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
                        {item.name}
                        <span>
                            {idOfElement === item.id
                                ? <input type="text" onBlur={() => setIdofElement(0)} />
                                : <button onDoubleClick={() => setIdofElement(item.id)}>c</button>
                            }
                            <button onClick={() => props.removeBankAccount(item.name)}>x</button>

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
                        {item.name}
                        <span>
                            <button onClick={() => props.deleteCategory(item)}>x</button>
                            {/* <button>c</button> */}
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
                        {item.name}
                        <span>
                            <button onClick={() => props.deleteCategory(item)}>x</button>
                            {/* <button>c</button> */}
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
                        {item.name}
                        <span>
                            <button onClick={() => props.removeContragent(item.name)}>x</button>
                            {/* <button>c</button> */}
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