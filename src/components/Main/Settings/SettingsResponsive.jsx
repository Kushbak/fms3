import React from 'react'
import styles from './Settings.module.css'
import { useState } from 'react'
import { maxLengthCreator } from '../../../utils/validators/validators'
import deleteBtn from '../../../assets/img/icons/delete.svg'
import editBtn from '../../../assets/img/icons/edit.svg'
import saveBtn from '../../../assets/img/icons/save.svg'
import closeBtn from '../../../assets/img/icons/close.svg'
import TostifyAlert from '../../common/TostifyAlert/TostifyAlert'
import GreenButton from '../../common/GreenButton/GreenButton'
import { Paper, Accordion, AccordionActions, AccordionDetails, AccordionSummary, makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { NewCategoryForm } from './Settings'

// TODO remove Input component and set MaterialInput instead
// TODO Form submission canceled because the form is not connected - исправить

const useStyles = makeStyles(() => ({
    details: {
        flexDirection: 'column'
    },
    paper: {
        height: '30px',
        display: 'flex',
    }
}))

const SettingsResponsive = (props) => {
    const [idOfElement, setIdofElement] = useState()
    const [inputValue, setInputValue] = useState()
    const [bankNumberValue, setBankNumberValue] = useState()
    const [paymentType, setPaymentType] = useState(1)
    const maxLength20 = maxLengthCreator(20)
    // TODO Доделать Tostify Alert для создания и редактирования
    const classes = useStyles()

    return (
        <div className={styles.settings}>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <p className={styles.settingsTitle}>Счета</p>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    {props.bankAccountDetails.map(item => (
                        <Paper className={styles.settingsItem} key={item.id}>
                            {!(idOfElement === item.id + item.name) && item.name}

                            {idOfElement === item.id + item.name
                                ? <>
                                    <div className={styles.editElementInputs}>
                                        <label><input type="checkbox" name='paymentType' onChange={e => e.target.checked ? setPaymentType(2) : setPaymentType(1)} />Безналичный</label>
                                        <input className={styles.editInput} type="text" value={inputValue} autoFocus={true} onChange={(e) => setInputValue(e.target.value)} placeholder='Название счета' />
                                        <input className={styles.editInput} type="text" value={bankNumberValue} onChange={(e) => setBankNumberValue(e.target.value)} placeholder='Номер счета'/>
                                    </div>
                                    <span className={styles.editElementBtns}>
                                        <img src={saveBtn} alt="save" onClick={() => {
                                            (inputValue !== item.name || bankNumberValue !== item.code)
                                                && props.editBankAccount({ ...item, name: inputValue, code: bankNumberValue, paymentTypeId: paymentType })
                                            setInputValue()
                                            setBankNumberValue()
                                            setIdofElement(0)
                                        }} />
                                        <img src={closeBtn} alt="cancel" onClick={() => setIdofElement(0)} />
                                    </span>
                                </>
                                : <span>
                                    <img src={editBtn} alt='edit'
                                        onClick={() => {
                                            setIdofElement(item.id + item.name)
                                            setInputValue(item.name)
                                            setBankNumberValue(item.code)
                                        }} />
                                    <img src={deleteBtn} onClick={() => props.deleteBankAccount(item.id)} alt='delete' />
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
                </AccordionDetails>
                {/* <AccordionActions>
                </AccordionActions> */}
            </Accordion>
            
                



            
            {props.entities.map(entity => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <p className={styles.settingsTitle}>{entity.title}</p>
                    </AccordionSummary>

                    <AccordionDetails className={classes.details}>
                        {props[entity.reducerName].map(item => (
                            <Paper className={styles.settingsItem} key={item.id}>
                                {!(idOfElement === item.id + item.name) && item.name}

                                {idOfElement === item.id + item.name
                                    ? <>
                                        <input className={styles.editInput} type="text" value={inputValue} autoFocus={true} onChange={(e) => setInputValue(e.target.value)} />
                                        <img src={saveBtn} alt="save" onClick={() => {
                                            inputValue !== item.name && entity.editFunc({ ...item, name: inputValue })
                                            setInputValue()
                                            setIdofElement(0)
                                        }} />
                                        <img src={closeBtn} alt="cancel" onClick={() => setIdofElement(0)} />
                                    </>
                                    : <span>
                                        <img src={editBtn} alt='edit'
                                            onClick={() => {
                                                setIdofElement(item.id + item.name)
                                                setInputValue(item.name)
                                            }} />
                                        <img src={deleteBtn} onClick={() => entity.deleteFunc(item.id)} alt='delete' />
                                    </span>
                                }
                            </Paper>
                        ))}
                    </AccordionDetails>

                    <AccordionActions>
                        <div className={styles.btnBlock}>
                            {props.numOfSection === entity.id
                                ? <NewCategoryForm numOfSection={props.numOfSection} setNum={props.setNum} type={entity.type} addNewCategory={props.addNewCategory} maxLength20={maxLength20} />
                                : <GreenButton className={styles.addNewItemBtn} onClick={() => props.setNum(entity.id)} >добавить +</GreenButton>
                            }
                        </div>
                    </AccordionActions>
                </Accordion>
            ))}   

            <TostifyAlert
                setMsg={props.DisplayPostMsg}
                isMsgDisplayed={props.isPostMsgDisplayed}
                severity='success'
            />
        </div>
    )
}

export default SettingsResponsive