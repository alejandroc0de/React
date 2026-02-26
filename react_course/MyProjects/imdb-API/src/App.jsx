import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import GetMovie from './GetMovie'
import ShowMovie from './ShowMovie'

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetMovie />}/>
        <Route path='/showMovie' element={<ShowMovie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
