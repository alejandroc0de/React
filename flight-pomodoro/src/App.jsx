import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import './App.css'
import Pomodoro from'./Pomodoro'
import Focus from './Focus'
function App() {


  return(
    <div className='h-screen flex flex-col overflow-hidden'>
        <BrowserRouter>
          <nav className='flex flex-row text-2xl font-medium justify-center p-2 border-b bg-beige-pomodoro gap-10 shrink-0'>
            <NavLink className= {({isActive})=> isActive? 'bg-gray-400 rounded-2xl p-1 text-3xl' : 'backdrop-blur-xs  rounded-2xl p-1 hover:scale-115 transition-all duration-190'} to="/">Pomodoro</NavLink> 
           <NavLink className={({isActive})=> isActive? 'bg-gray-400 rounded-2xl p-1 text-3xl' : 'backdrop-blur-xs rounded-2xl p-1 hover:scale-115 transition-all duration-190'} to="/focus">Flight Focus</NavLink> 
          </nav>
          <div className='flex-1 overflow-hidden'>
            <Routes>
              <Route path='/' element={<Pomodoro />}/>
              <Route path='/focus' element={<Focus/>}/>
            </Routes>
          </div>

        </BrowserRouter>
    </div>


  )


}

export default App
