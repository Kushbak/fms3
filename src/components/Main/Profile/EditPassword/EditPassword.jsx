import React from "react"
import { reduxForm, Field } from "redux-form"
import { DialogTitle, Dialog } from "@material-ui/core"
import { MaterialInput } from "../../../common/FormsControl/FormControls"
import styles from '../Profile.module.css'
import { required, minLengthCreator, newCannotBeOld, regMatchInput } from "../../../../utils/validators/validators"
import GreenButton from "../../../common/GreenButton/GreenButton"

const EditPassword = (props) => {
    const minLength8 = minLengthCreator(8)
    return (
        <Dialog onClose={props.handleClose} aria-labelledby="edit_password_dialog" open={props.open}>
            <div className={styles.EditModalBlock}>
                <DialogTitle id="edit_password_dialog">Изменить пароль</DialogTitle>
                <form className={styles.editModalForm} onSubmit={props.handleSubmit(props.onSubmit)}>
                    <Field
                        component={MaterialInput}
                        name='oldPassword'
                        type='password'
                        label='Старый пароль'
                        labelId='old_password_label'
                        validate={[required,]}
                    />
                    <Field
                        component={MaterialInput}
                        name='password'
                        type='password'
                        label='Новый пароль'
                        labelId='new_password_label'
                        validate={[required, minLength8, newCannotBeOld]}
                    />
                    <Field
                        component={MaterialInput}
                        name='matchNewPassword'
                        type='password'
                        label='Подтвердите новый пароль'
                        labelId='match_new_password_label'
                        validate={[required, regMatchInput]}
                    />
                    <div className={styles.btnBlockModal}>
                        <GreenButton type='submit'>{props.submitting ? 'Изменение' : 'Изменить'}</GreenButton>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default reduxForm({ form: 'editPassword' })(EditPassword)