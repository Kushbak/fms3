import React from "react"
import { reduxForm, Field } from "redux-form"
import { DialogTitle, Dialog } from "@material-ui/core"
import { MaterialInput } from "../../../common/FormsControl/FormControls"
import styles from '../Profile.module.css'
import GreenButton from "../../../common/GreenButton/GreenButton"

const EditUserDataModal = (props) => {
    return ( 
        <Dialog onClose={props.handleClose} aria-labelledby="edit_profile_data_dialog" open={props.open}>
            <div className={styles.EditModalBlock}>
                <DialogTitle id="edit_profile_data_dialog">Редактировать профиль</DialogTitle>
                <form className={styles.editModalForm} onSubmit={props.handleSubmit(props.onSubmit)}>
                    <Field 
                        component={MaterialInput} 
                        name='firstName' 
                        type='text' 
                        label='Имя' 
                        labelId='edit_firstName_label' 
                    />
                    <Field 
                        component={MaterialInput} 
                        name='lastName' 
                        type='text' 
                        label='Фамилия' 
                        labelId='edit_lastName_label' 
                    />
                    <Field 
                        component={MaterialInput} 
                        name='username' 
                        type='text' 
                        label='Ник' 
                        labelId='edit_username_label' 
                    />
                    <Field 
                        component={MaterialInput} 
                        name='email' type='text' label='Почта' labelId='edit_email_label' 
                    />
                    <div className={styles.btnBlockModal}>
                        <GreenButton type='submit'>{props.submitting ? 'Изменение' : 'Изменить'}</GreenButton>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default reduxForm({ form: 'editProfile' })(EditUserDataModal)