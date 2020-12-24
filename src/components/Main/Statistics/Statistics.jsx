import React, { useState, useEffect } from 'react'
import styles from './Statistics.module.css'
import StatisticsChart from './StatisticsChart'
import Preloader from '../../common/Preloader/Preloader'
import { FormControlLabel, Radio, MenuItem, withStyles } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import GreenButton from '../../common/GreenButton/GreenButton'
import { reduxForm, Field } from 'redux-form'
import { MaterialDatePicker, MaterialSelect, MaterialRadioGroup } from '../../common/FormsControl/FormControls'

const FilterStatisticsForm = reduxForm({ form: 'filterStatistics' })((props) => {
    const [date1, setDate1] = useState()
    const [date2, setDate2] = useState()
    return (
        <form className={styles.form} onSubmit={props.handleSubmit(props.onSubmit)}>
            <div className={styles.dates}>
                От
                <Field
                    component={MaterialDatePicker}
                    value={date1}
                    onChange={(e) => setDate1(e)}
                    name='StartDate'
                    id="date-picker-statistics-start"
                    label="Date picker statistics start"
                    KeyboardButtonProps={{
                        'aria-label': 'change date statistics',
                    }}
                />
                До
                <Field
                    component={MaterialDatePicker}
                    value={date2}
                    onChange={(e) => setDate2(e)}
                    name='EndDate'
                    id="date-picker-statistics-end"
                    label="Date picker statistics end"
                    KeyboardButtonProps={{
                        'aria-label': 'change date statistics',
                    }}
                />
            </div>

            <Field row
                label='Тип'
                component={MaterialRadioGroup}
                defaultValue='1'
                aria-label='type'
                name='OperationTypesId'
                onChange={(e) => props.setFilterType(+e.target.value)}
            >
                <FormControlLabel value='1' control={<Radio />} label="Доходы" />
                <FormControlLabel value='2' control={<Radio />} label="Расходы" />
            </Field>


            <div className={styles.selectsBlock}>
                <Field
                    component={MaterialSelect}
                    label='Категории'
                    labelId='Categories_label_id'
                    name="OperationsId"
                    multiple
                >
                    {props[props.filterType ? 'incomeCategories' : 'expenseCategories'].map(item => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={MaterialSelect}
                    label='Контрагент'
                    labelId='Contragents_label_id'
                    name="CounterPartiesId"
                    id='contragentsStatistics'
                    list="contragentsStatistics"
                    placeholder='Контрагент'
                    multiple
                >
                    {props.contragents.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Field>
                <Field
                    component={MaterialSelect}
                    label='Проект'
                    labelId='Projects_label_id'
                    name="ProjectsId"
                    multiple
                >
                    {props.projects.map(item => <MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>)}
                </Field>
                <div className="btnBlock">
                    <GreenButton type='submit'>Применить</GreenButton>
                </div>
            </div>
        </form>
    )
})


const Statistics = (props) => {
    useEffect(() => {
        props.getStatistics()
    }, [])

    const now = new Date()
    const nextMonth = new Date().setMonth(new Date().getMonth() + 1)

    return (
        <div className={styles.statistics} >
            <div className={styles.tabsBlock}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <GreenButton {...bindTrigger(popupState)}>
                                Фильтр
                            </GreenButton>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                            >
                                <div className={styles.filterBlock}>
                                    <FilterStatisticsForm
                                        incomeCategories={props.incomeCategories}
                                        expenseCategories={props.expenseCategories}
                                        contragents={props.contragents}
                                        projects={props.projects}
                                        onSubmit={props.submit}
                                        filterType={props.filterType}
                                        setFilterType={props.setFilterType}
                                    />
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
                
            </div>
            <div className={styles.statisticsBlock}>
                {!props.statisticsFetching
                    ? <Preloader />     
                    : <>
                        <div className={styles.statisticsLabel}>
                            <h3 className='h3'>Категории</h3>
                            <StatisticsChart
                                statisticsData={props.statisticsData}
                                filterStat='operationName'
                            />
                        </div>
                        <div className={styles.statisticsLabel}>
                            <h3 className='h3'>Счета</h3>
                            <StatisticsChart statisticsData={props.statisticsData} filterStat='score' />
                        </div>
                        <div className={styles.statisticsLabel}>
                            <h3 className='h3'>Контрагенты</h3>
                            <StatisticsChart statisticsData={props.statisticsData} filterStat='targetEntity' />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Statistics