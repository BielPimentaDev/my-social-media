import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Feed from './pages/Feed'
import Login from './pages/Login'

import Register from './pages/Register'

function App() {
  const [userAuth, setUserAuth] = useState({})
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login userAuth={userAuth } setUserAuth = {setUserAuth} setIsAuth={setIsAuth} />}/>
          <Route path='/feed' element= {<Feed userAuth={userAuth } setUserAuth = {setUserAuth} setIsAuth={setIsAuth} isAuth={isAuth} />}/>
          <Route path='/register' element={<Register userAuth={userAuth } setUserAuth = {setUserAuth} setIsAuth={setIsAuth}/>}/>
        </Routes>
    
        </Router>
    </div>
  )
}

export default App
