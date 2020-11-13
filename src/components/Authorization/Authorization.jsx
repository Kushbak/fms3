import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './Authorization.module.css' 
import { required, minLengthCreator, emailValid, regMatchInput, latinLetters } from '../../utils/validators/validators'
import { Input } from '../common/FormsControl/FormControls'
import { connect } from 'react-redux'
import { login, register } from '../../actions/authorization'
import { Redirect } from 'react-router-dom'
import Particles from 'react-particles-js'
import svg from '../../assets/img/icons/plus.svg'
import logo from '../../assets/img/logo.svg'

const Login = reduxForm({ form: 'login' })((props) => { 
    const goLogin = (formData) => props.login(formData)  
    return (
        <>
            <h3 className='h3'>Войти</h3>
            <form onSubmit={ props.handleSubmit(goLogin) } className={ styles.form } >
                <Field className={ styles.input } component='input' name='fullName' type='text' placeholder='Введите Логин' />
                <Field className={ styles.input } component='input' name='password' type='password' placeholder='Введите Пароль' />
                <div className={ styles.btnBlock }>
                    <button className='button'>{props.isFetching ? 'Загрузка...' : 'Войти'}</button>
                </div>
                { props.error && <div className='wrongData'>{ props.error }</div> }
            </form>
        </>
    )
})


const Register = reduxForm({ form: 'register' })((props) => {  
    const minLength8 = minLengthCreator(8) 
    const goRegister = (formData) => props.register(formData) 
    return (
        <>
            <h3 className='h3'>Зарегистрироваться</h3>
            <form onSubmit={ props.handleSubmit(goRegister) } className={styles.form} > 
                <Field className={styles.input} component={ Input } name='email' type='email' placeholder='Введите ваш email*' validate={[required, emailValid] } />
                <Field className={styles.input} component={Input} name='login' type='text' placeholder='Придумайте логин*' validate={[required, latinLetters] } />
                <Field className={ styles.input } component={ Input } name='password' type='password' placeholder='Придумайте пароль*' validate={ [required, minLength8] } />
                <Field className={styles.input} component={ Input } name='matchPassword' type='password' placeholder='Подтвердите пароль*' validate={[required, regMatchInput] } />
                <div className={ styles.btnBlock }>
                    <button className='button'>{props.isFetching ? 'Загрузка...' : 'Зарегистрироваться'}</button>
                </div>
                { props.error && <div className={ styles.wrongData }>{ props.error }</div> } 
            </form>
        </>
    )
})


const Authorization = (props) => {
    const [isLogin, setisLogin] = useState(true)
    if (props.isAuth) {
        return <Redirect to='/' />
    }
    return (
        <section className="section">
            <div className={styles.authorizationPage + ' wrapper'}>
                <div className={ styles.decoration }>
                    <Particles />
                </div>
                <div className={ styles.authorization }>
                    { isLogin ? <Login login={ props.login } isFetching={ props.isFetching }/> : <Register register={ props.register } isFetching={ props.isFetching }/> }
                    <p className={ styles.LogOrReg }>или
                    { isLogin
                        ? <span onClick={ () => setisLogin(false) } > Зарегистрироваться</span>
                        : <span onClick={ () => setisLogin(true) }> Войти</span>
                    }
                    </p>
                </div>
            </div>
            
        </section>
        
    )
}

const mstp = (state) => ({
    isAuth: state.profileReducer.isAuth,
    isFetching: state.profileReducer.isFetching
})

export default connect(mstp, { login, register })(Authorization)