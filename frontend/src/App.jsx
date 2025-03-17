import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import HomeForm from './pages/HomeForm'
import OutingForm from './pages/OutingForm'
import Entry from './pages/Entry'
import AdminorUser from './pages/AdminorUser'
import AdminLogin from './pages/AdminLogin'
import DetailsPage from './pages/DetailsPage'
import MarkEntry from './pages/MarkEntry'
import AddStudent from './pages/AddStudent'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Entry/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin-dashboard' element={<DetailsPage/>}/>
        <Route path='/mark-entry' element={<MarkEntry/>}/>
        <Route path='/add-student' element={<AddStudent/>}/>

        <Route path='/entry' element={<AdminorUser/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/home-form' element={<HomeForm/>}/>
        <Route path='/outing-form' element={<OutingForm/>}/>
      </Routes>
    </div>
  )
}

export default App