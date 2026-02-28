import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import './App.css'
import Pomodoro from'./Pomodoro'
import Focus from './Focus'
function App() {


  return(
    <div>
        <BrowserRouter>
          <nav className='flex flex-row text-2xl font-medium justify-center p-2 bg-gray-300 gap-10'>
            <NavLink className= {({isActive})=> isActive? 'bg-gray-400 rounded-2xl p-1 text-3xl' : 'bg-gray-200 rounded-2xl p-1 hover:scale-115 transition-all duration-190'} to="/">Pomodoro</NavLink> 
           <NavLink className={({isActive})=> isActive? 'bg-gray-400 rounded-2xl p-1 text-3xl' : 'bg-gray-200 rounded-2xl p-1 hover:scale-115 transition-all duration-190'} to="/focus">Flight Focus</NavLink> 
          </nav>
          <Routes>
            <Route path='/' element={<Pomodoro />}/>
            <Route path='/focus' element={<Focus/>}/>
          </Routes>
        </BrowserRouter>
    </div>


  )


}

export default App
