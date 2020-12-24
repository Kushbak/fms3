import React, { useEffect } from 'react'
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
import TostifyAlert from '../../common/TostifyAlert/TostifyAlert'
import GreenButton from '../../common/GreenButton/GreenButton'
import { Paper, Dialog, Button, DialogContent, DialogActions } from '@material-ui/core'

// TODO remove Input component and set MaterialInput instead
// TODO Form submission canceled because the form is not connected - исправить
export const NewCategoryForm =
    reduxForm({ form: 'newCategory' })
        ((props) => {
            return (
                <form
                    className={styles.newCategoryForm}
                    onSubmit={props.handleSubmit((formData) => props.addNewCategory(formData, props.type))}
                >
                    <div className={styles.formBlock}>
                        {props.type === 'bankAccount'
                            ? <div className={styles.editElementInputs}>
                                <Field
                                    component={Input}
                                    type="text"
                                    name='newCategory'
                                    onBlur={(e) => !(props.type === 'bankAccount') && (!e.target.value && props.setNum(0))}
                                    validate={[props.maxLength20]}
                                    placeholder='Название'
                                    autoFocus={true}
                                />
                                <Field
                                    component={Input}
                                    type="text"
                                    name='code'
                                    onBlur={(e) => !e.target.value && props.setNum(0)}
                                    placeholder='Номер счета'
                                />
                                <label>
                                    <Field component='input' type="checkbox" name='isOwn' />
                                    Безналичный
                                </label>
                            </div>
                            : <Field
                                component={Input}
                                type="text"
                                name='newCategory'
                                onBlur={(e) => !(props.type === 'bankAccount') && (!e.target.value && props.setNum(0))}
                                validate={[props.maxLength20]}
                                autoFocus={true}
                            />
                        }
                    </div>
                    <div className={styles.newItemBtnBlock}>
                        <button type='submit'><img src={saveBtn} onClick={(e) => props.setNum(0)} alt='save' /></button>
                        <button type='button'><img src={closeBtn} onClick={(e) => props.setNum(0)} alt='close' /></button>
                    </div>
                </form>
            )
        })

const Settings = (props) => {
    const [idOfElement, setIdofElement] = useState()
    const [inputValue, setInputValue] = useState()
    const [bankNumberValue, setBankNumberValue] = useState()
    const [paymentType, setPaymentType] = useState(1)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDel, setIdToDel] = useState()
    const maxLength20 = maxLengthCreator(20) 
    // TODO Доделать Tostify Alert для создания и редактирования
    const handleDialogClose = () => {
        setIdToDel()
        setOpenDialog(false)
    }
    let deleteFunc
    const [delFunc, setDelFunc] = useState({ delFunc: function () { } })
    return (
        <div className={styles.settings}>
            <div className={styles.settingsSection}>
                <p className={styles.settingsTitle}>Счета</p>
                {props.bankAccountDetails.map(item => (
                    <Paper className={styles.settingsItem} key={item.id}>
                        {!(idOfElement === item.id + item.name) && item.name}

                        {idOfElement === item.id + item.name
                            ? <>
                                <div className={styles.editElementInputs}>
                                    <label><input type="checkbox" name='paymentType' onChange={e => e.target.checked ? setPaymentType(2) : setPaymentType(1)} />Безналичный</label>
                                    <input className={styles.editInput} type="text" value={inputValue} autoFocus={true} onChange={(e) => setInputValue(e.target.value)} />
                                    <input className={styles.editInput} type="text" value={bankNumberValue} onChange={(e) => setBankNumberValue(e.target.value)} />
                                </div>
                                <img 
                                    src={saveBtn} 
                                    alt="save" 
                                    onClick={() => {
                                        (inputValue !== item.name || bankNumberValue !== item.code)
                                            && props.editBankAccount({ ...item, name: inputValue, code: bankNumberValue, paymentTypeId: paymentType })
                                        setInputValue()
                                        setBankNumberValue()
                                        setIdofElement(0)
                                    }} 
                                />
                                <img src={closeBtn} alt="cancel" onClick={() => setIdofElement(0)} />
                            </>
                            : <span>
                                <img 
                                    src={editBtn} 
                                    alt='edit'
                                    onClick={() => {
                                        setIdofElement(item.id + item.name)
                                        setInputValue(item.name)
                                        setBankNumberValue(item.code)
                                    }} 
                                />
                                <img 
                                    src={deleteBtn} 
                                    alt='delete'
                                    onClick={() => {
                                        setOpenDialog(true)
                                        setDelFunc({ deleteFunc: props.deleteBankAccount })
                                        setIdToDel(item.id)
                                    }} 
                                />
                            </span>
                        }
                    </Paper>
                ))}
                <div className={styles.btnBlock}>
                    {props.numOfSection === 1
                        ? <NewCategoryForm numOfSection={props.numOfSection} setNum={props.setNum} type='bankAccount' onSubmit={props.addNewCategory} maxLength20={maxLength20} />
                        : <GreenButton className={styles.addNewItemBtn} onClick={() => props.setNum(1)} >добавить +</GreenButton>
                    }
                </div>
            </div>

            {props.entities.map(entity => (
                <div className={styles.settingsSection}>
                    <p className={styles.settingsTitle}>{entity.title}</p>
                    {props[entity.reducerName].map(item => (
                        <Paper className={styles.settingsItem} key={item.id}>
                            {!(idOfElement === item.id + item.name) && item.name}

                            {idOfElement === item.id + item.name
                                ? <>
                                    <input className={styles.editInput} type="text" value={inputValue} autoFocus={true} onChange={(e) => setInputValue(e.target.value)} />
                                    <img 
                                        src={saveBtn} 
                                        alt="save" 
                                        onClick={() => {
                                            inputValue !== item.name && entity.editFunc({ ...item, name: inputValue })
                                            setInputValue()
                                            setIdofElement(0)
                                        }} 
                                    />
                                    <img 
                                        src={closeBtn} 
                                        alt="cancel" 
                                        onClick={() => setIdofElement(0)} 
                                    />
                                </>
                                : <span>
                                    <img 
                                        src={editBtn} 
                                        alt='edit'
                                        onClick={() => {
                                            setIdofElement(item.id + item.name)
                                            setInputValue(item.name)
                                        }} 
                                    />
                                    <img 
                                        alt='delete'
                                        src={deleteBtn}
                                        onClick={() => {
                                            setOpenDialog(true)
                                            setDelFunc({ deleteFunc: entity.deleteFunc })
                                            setIdToDel(item.id)
                                        }}
                                    />
                                </span>
                            }
                        </Paper>
                    ))}
                    <div className={[styles.btnBlock, props.numOfSection === entity.id ? styles.newItemBlock : undefined].join(' ')}>
                        {props.numOfSection === entity.id
                            ? <NewCategoryForm numOfSection={props.numOfSection} setNum={props.setNum} type={entity.type} addNewCategory={props.addNewCategory} maxLength20={maxLength20} />
                            : <GreenButton className={styles.addNewItemBtn} onClick={() => props.setNum(entity.id)} >добавить +</GreenButton>
                        }
                    </div>
                </div>
            ))}

            <TostifyAlert
                setMsg={props.DisplayPostMsg}
                displayedMsg={props.displayedMsg[0]}
                severity={props.displayedMsg[1] ? 'success' : 'error'}
            />

            <Dialog onClose={() => setOpenDialog(false)} aria-labelledby="delete_settings_item_dialog" open={openDialog}>
                <DialogContent>
                    <p>Вы уверены что хотите удалить элемент?</p>
                </DialogContent>
                <DialogActions>
                    <GreenButton color="error" onClick={() => {
                        handleDialogClose()
                        delFunc.deleteFunc(idToDel)
                    }}>
                        Удалить
                    </GreenButton>
                    <Button color="primary" onClick={() => handleDialogClose()}>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Settings