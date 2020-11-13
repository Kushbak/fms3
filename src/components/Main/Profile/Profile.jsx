import React from 'react'
import styles from './Profile.module.css'
import avatar from '../../../assets/img/avatar.jpg'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../common/FormsControl/FormControls'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/authorization'
import { Redirect } from 'react-router-dom'

const Profile = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.profileReducer.isAuth)
    if (!isAuth){
        return <Redirect to='/'/>
    }
    return (
        <div className={ styles.profile }>
            <div className={ styles.avatarBlock }>
                <img src={avatar} alt="avatar"/>
                <button>Выбрать фото</button>
            </div>
            <div className={ styles.descriptionBlock }>
                <form onSubmit={ props.handleSubmit }>
                    <div className={ styles.formItem }>
                        <p>ФИО</p>
                        <Field component={ Input } type="text" placeholder='ФИО'/>
                    </div>
                    <div className={ styles.formItem }>
                        <p>Логин</p>
                        <Field component={ Input } type="text" placeholder='Логин'/>
                    </div>
                    <div className={ styles.formItem }>
                        <p>Пароль</p>
                        <Field component={ Input } type="text" placeholder='Пароль'/>
                    </div>
                    <button>Сохранить</button>
                </form>
            </div>
            <div className={ styles.btnBlock }>
                <button className="button" onClick={() => dispatch(logout())}>Выйти с аккаунта</button>
            </div>
        </div>
    )
}

export default reduxForm({ form: 'profile' })(Profile)