import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import CreateTransactionModal from '../CreateTransaction/CreateTransactionModal'
import { useSelector } from 'react-redux'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import SettingsIcon from '@material-ui/icons/Settings'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const Sidebar = (props) => {
    const [isModalOpen, toggleModal] = useState(false)
    const handleClose = () => {
        toggleModal(false)
    }
    const handleCloseDrawer = (e) => {
        if (props.toggleDrawer) {
            props.toggleDrawer(e, false)
        }
    }
    return (
        <>
            <div className={styles.sidebar}>
                <List component="aside" aria-label="aside navlinks">
                    
                    <ListItem button onClick={() => toggleModal(true)} >
                        <ListItemIcon>
                            <AddCircleIcon style={{ fill: "#32b482" }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Создать транзакцию"
                        />
                    </ListItem>

                    <NavLink to='/bankAccounts' onClick={props.toggleDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon style={{ fill: "#32b482" }} />
                            </ListItemIcon>
                            <ListItemText primary="Счета" />
                        </ListItem>
                    </NavLink>

                    <NavLink to='/statistics' onClick={props.toggleDrawer}>
                        <ListItem button> 
                                <ListItemIcon>
                                    <EqualizerIcon style={{ fill: "#32b482" }} />
                                </ListItemIcon>
                                <ListItemText primary="Статистика" /> 
                        </ListItem>
                    </NavLink>

                    <NavLink to='/settings' onClick={props.toggleDrawer}>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon style={{ fill: "#32b482" }} />
                            </ListItemIcon>
                            <ListItemText primary="Настройки" />
                        </ListItem>
                    </NavLink>

                </List>
            </div>

            <CreateTransactionModal open={isModalOpen} closeModal={handleClose} />
        </>
    )
}

export default Sidebar