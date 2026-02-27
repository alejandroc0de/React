import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Pomodoro from'./Pomodoro'
import Focus from './Focus'
function App() {


  return(
    <div>
      <nav className='flex flex-row gap-2.5 text-2xl font-medium justify-center p-2 bg-gray-300'>
        <ul>Pomodoro</ul>
        <ul>Focus</ul>
      </nav>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Pomodoro />}/>
            <Route path='/Focus' element={<Focus/>}/>
          </Routes>
        </BrowserRouter>
    </div>


  )


}

export default App
