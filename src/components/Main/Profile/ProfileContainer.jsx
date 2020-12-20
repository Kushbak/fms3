import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux' 
import { logout, getProfileData } from '../../../actions/authorization'
import { editUserData, editPassword } from '../../../actions/profile'
import { DisplayPostMsg } from '../../../actions/transactions' 
import { Redirect } from 'react-router-dom'

const ProfileContainer = (props) => {
    const handleEditPassword = (formData) => {
        const data = {
            oldPassword: formData.oldPassword,
            newPassword: formData.matchNewPassword,
        }
        props.editPassword(data)
        props.getProfileData()
    }

    const handleEditUserData = (formData) => {
        const data = {
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            username: formData.username,
        }
        props.editUserData(data)
        props.getProfileData()
    }


    if(!props.isAuth) return <Redirect to='/' />
    return <Profile {...props} handleEditPassword={handleEditPassword} handleEditUserData={handleEditUserData} />
}

const mstp = state => ({
    isAuth: state.profileReducer.isAuth,
    userData: state.profileReducer.userData,
    displayedMsg: state.transactionsReducer.displayedMsg,
    profile: state.profileReducer.profile
})

export default connect(mstp, { logout, editUserData, editPassword, DisplayPostMsg, getProfileData })(ProfileContainer)