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
    })
    const classes = useStyles()

    useEffect(() => {
        props.getProfileData()
    }, [])

    if (!props.profile) return <Preloader />
    return (
        <div className={styles.profile}>
            <div className={classes.cardProfile}> 
                <div className={ styles.avatarBlock }>
                    <img src={avatar} alt="avatar"/>
                    <GreenButton>Выбрать фото</GreenButton>
                </div>
                <div className={ styles.descriptionBlock }>  
                    <p className={styles.fullName}>{props.profile.firstName} {props.profile.lastName}</p> 
                    <p className={styles.username}>{props.profile.username}</p>
                    <p className={styles.email}>{props.profile.email}</p>
                </div> 
            </div>
                       
            <div className={ styles.btnBlock }>
                <GreenButton onClick={() => props.logout()}>Выйти с аккаунта</GreenButton>
                <GreenButton onClick={() => setEditUserDataModalOpen(true)}>Редактировать профиль</GreenButton>
                <GreenButton onClick={() => setEditPasswordModalOpen(true)}>Изменить пароль</GreenButton>  
            </div>
            <EditUserDataModal
                handleClose={() => setEditUserDataModalOpen(false)}
                open={isEditUserModalOpen}
                onSubmit={props.handleEditUserData}
            />
            <EditPassword
                handleClose={() => setEditPasswordModalOpen(false)}
                open={isEditPasswordModalOpen}
                onSubmit={props.handleEditPassword}
            />

            <TostifyAlert
                setMsg={props.DisplayPostMsg}
                isMsgDisplayed={props.isPostMsgDisplayed}
                severity='success'
            />
        </div>
    )
} 
export default Profile 
