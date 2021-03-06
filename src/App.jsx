import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Authorization from './components/Authorization/Authorization'
import Header from './components/Header/Header'
import Main from './components/Main/Main'  
import { useDispatch, useSelector } from 'react-redux' 
import Preloader from './components/common/Preloader/Preloader'
import { useEffect } from 'react'
import { initializeApp, loggedIn } from './actions/authorization'  

const App = () => {   
    const isInited = useSelector(state => state.appReducer.initialized)
    const isAuth = useSelector(state => state.profileReducer.isAuth) 
    const dispatch = useDispatch() 
    useEffect(() => {
        if (localStorage.getItem('id_token')){  
            dispatch(initializeApp())
        } 
    }, []) 

    if (loggedIn() && !isInited) return <Preloader /> 
    return (
        <div className="app">
            {isAuth && <Header />}
            <main className='main'>
                <Switch>
                    <Route path='/authorization' render={() => <Authorization />} />
                    <Route path='/' render={() => <Main />} />
                </Switch>
            </main>
        </div>
    )
}

export default App
