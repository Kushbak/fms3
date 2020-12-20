import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './Authorization.module.css'
import { required, minLengthCreator, emailValid, regMatchInput, latinLetters } from '../../utils/validators/validators'
import { MaterialInput } from '../common/FormsControl/FormControls'
import { connect } from 'react-redux'
import { login, register } from '../../actions/authorization'
import { Redirect } from 'react-router-dom'
import Particles from "react-tsparticles";
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    input: {
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#32b482'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid #32b482'
        }
    }
}))

const Login = reduxForm({ form: 'login' })((props) => {
    const classes = useStyles()
    const goLogin = (formData) => props.login(formData)
    return (
        <>
            <h3 className='h3'>Войти</h3>
            <form onSubmit={props.handleSubmit(goLogin)} className={[styles.form, styles.loginForm].join(' ')} >
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} label='Логин' name='username' type='text' placeholder='Введите Логин' />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} label='Пароль' name='password' type='password' placeholder='Введите Пароль' />
                <div className={styles.btnBlock}>
                    <button className='button'>{props.submitting ? 'Загрузка...' : 'Войти'}</button>
                </div>
                {props.error && <div className='wrongData'>{props.error}</div>}
            </form>
        </>
    )
})


const Register = reduxForm({ form: 'register' })((props) => {
    const minLength8 = minLengthCreator(8)
    const goRegister = (formData) => props.register(formData)
    const classes = useStyles()
    return (
        <>
            <h3 className='h3'>Зарегистрироваться</h3>
            <form onSubmit={props.handleSubmit(goRegister)} className={[styles.form, styles.registerForm].join(' ')} >
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='email' type='email' label='Email' placeholder='Введите ваш email*' validate={[required, emailValid]} />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='username' type='text' label='Логин' placeholder='Придумайте логин*' validate={[required, latinLetters]} />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='firstName' type='text' label='Имя' placeholder='Введите имя*' validate={[required]} />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='lastName' type='text' label='Фамилия' placeholder='Введите фамилию*' validate={[required]} />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='password' type='password' label='Пароль' placeholder='Придумайте пароль*' validate={[required, minLength8]} />
                <Field className={[styles.input, classes.input].join(' ')} component={MaterialInput} name='matchPassword' type='password' label='Подтверждение' placeholder='Подтвердите пароль*' validate={[required, regMatchInput]} />
                <div className={styles.btnBlock}>
                    <button className='button'>{props.submitting ? 'Загрузка...' : 'Зарегистрироваться'}</button>
                </div>
                {props.error && <div className={styles.wrongData}>{props.error}</div>}
            </form>
        </>
    )
})


const Authorization = (props) => {
    const [isLogin, setisLogin] = useState(true) 
    if (props.isAuth) return <Redirect to='/' /> 
    return (
        <section className="section">
            <div className={[styles.authorizationPage, !isLogin ? styles.authorizationPageReversed : undefined].join(' ') + ' wrapper'}>
                <div className={styles.decoration}>
                    <Particles options={{
                        background: {
                            color: {
                                value: "#f8f8f8",
                            },
                        },
                        fpsLimit: 60,
                        interactivity: {
                            detectsOn: "canvas",
                        },
                        particles: {
                            color: {
                                value: "#32b482",
                            },
                            links: {
                                color: "#32b482",
                                distance: 100,
                                enable: true,
                                opacity: 0.8,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "bounce",
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    value_area: 800,
                                },
                                value: 300,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                random: true,
                                value: 2,
                            },
                        },
                        detectRetina: true,
                    }}
                />
                </div>
                <div className={styles.authorization + ' wrapper'}>
                    {isLogin 
                        ? <Login login={props.login} isFetching={props.isFetching} /> 
                        : <Register register={props.register} isFetching={props.isFetching} />
                    }
                    <p className={styles.LogOrReg}>или
                    {isLogin
                            ? <span onClick={() => setisLogin(false)} > Зарегистрироваться</span>
                            : <span onClick={() => setisLogin(true)}> Войти</span>
                        }
                    </p>
                </div>
            </div> 
        </section> 
    )
}

const mstp = (state) => ({
    isAuth: state.profileReducer.isAuth,
})

export default connect(mstp, { login, register })(Authorization)