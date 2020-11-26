import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

class Modal extends React.Component { 
    constructor(props) {
        super(props)
        this.modalRoot = document.getElementById('modal-root')
    }
    componentWillMount() {
        this.root = document.createElement('div')
        this.modalRoot.appendChild(this.root) 
        this.modalRoot.classList.add("modal-window")
        document.addEventListener("keydown", this.escFunction, false)
        this.modalRoot.addEventListener('click', this.closeModal)
    } 
    componentWillUnmount() {
        this.modalRoot.removeChild(this.root)
        this.modalRoot.classList.remove("modal-window") 
        document.removeEventListener("keydown", this.escFunction, false)
        this.modalRoot.removeEventListener('click', this.closeModal)
    }   
    closeModal = (e) => { 
        if (e.target === this.modalRoot) {
            this.props.onClose()
        }
    }
    escFunction = (e) => {
        if (e.keyCode === 27) {
            this.props.onClose()
        }
    } 

    render() {
        return ReactDOM.createPortal(
            <div className={styles.modalWrapper}>
                <div className={styles.btnCloseBlock} >
                    <button className={styles.btnClose} onClick={this.props.onClose}>x</button>
                </div> 
                <div className={styles.modalBody}>
                    {this.props.children}
                </div>
            </div>,
            this.root
        )
    }
}

export default Modal