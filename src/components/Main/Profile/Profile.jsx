import React from 'react'
import styles from './Profile.module.css' 
import avatar from '../../../assets/img/avatar.jpg' 
import { useState } from 'react' 
import EditUserDataModal from './EditUserData/EditUserDataModal'
import EditPassword from './EditPassword/EditPassword'
import { makeStyles } from '@material-ui/core/styles';
import GreenButton from '../../common/GreenButton/GreenButton'
import TostifyAlert from '../../common/TostifyAlert/TostifyAlert'
import { useEffect } from 'react'
import Preloader from '../../common/Preloader/Preloader'

const Profile = (props) => { 
    const [isEditUserModalOpen, setEditUserDataModalOpen] = useState(false)
    const [isEditPasswordModalOpen, setEditPasswordModalOpen] = useState(false)
    const useStyles = makeStyles({
        cardProfile: {
            maxWidth: '475px',
            display: 'flex',
            flexDirection: 'row',
        },
        input: {
            '& .MuiFormLabel-root.Mui-focused': {
                color: '#32b482'
            },
            '& .MuiInput-underline:after': {
                borderBottom: '2px solid #32b482'
            }
        },
    })
    const classes = useStyles()

    useEffect(() => {
        props.getProfileData()
    }, [])

    if (!props.profile) return <Preloader />
    return (
        <div className={styles.profile}>
            <div className={ styles.descriptionBlock }>  
                <p className={styles.fullName}>ФИО: {props.profile.name} {props.profile.surname}</p> 
                <p className={styles.username}>Ник: {props.profile.username}</p>
                <p className={styles.email}>Email: {props.profile.email}</p>
            </div> 
                       
            <div className={ styles.btnBlock }>
                <GreenButton onClick={() => setEditUserDataModalOpen(true)}>Редактировать профиль</GreenButton>
                <GreenButton onClick={() => setEditPasswordModalOpen(true)}>Изменить пароль</GreenButton>  
                <GreenButton onClick={() => props.logout()}>Выйти с аккаунта</GreenButton>
            </div>
            
            <EditUserDataModal
                handleClose={() => setEditUserDataModalOpen(false)}
                open={isEditUserModalOpen}
                onSubmit={props.handleEditUserData}
                input={classes.input}
            />
            <EditPassword
                handleClose={() => setEditPasswordModalOpen(false)}
                open={isEditPasswordModalOpen}
                onSubmit={props.handleEditPassword}
                input={classes.input}
            />

            <TostifyAlert
                setMsg={props.DisplayPostMsg}
                displayedMsg={props.displayedMsg[0]}
                severity={props.displayedMsg[1] ? 'success' : 'error'}
            />
        </div>
    )
} 
export default Profile 
