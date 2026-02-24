import { useState } from 'react'
import './App.css'



function App() {

  const [count, setCount] = useState(0)

  // This only increase the counter by one, since for performance its processed as a block
  function increment(){
    setCount(count+1)
    setCount(count+1)
    setCount(count+1)
  }
// Aca como si hay una funcion react la procesa uan por una. Por convencion no se le pasa 
// la misma variable. Se le pasa o la inicial o un PrevCount para mejorar legibilidad 
// USAR CUANDO EL VALOR SE CAMBIA ANTES, O HAY ASYNCCCC, REACT TOMA SNAPSHOT DE TODAS LAS VARIABLES AL CREAR FUNCIONES  

function decrease(){
    setCount(c => c-1)
    setCount(c => c-1)
    setCount(c => c-1)
  }

  return(
    <>
      <p>Count = {count}</p>
      <button value={count} onClick={increment}>Increase</button>
      <button value={count} onClick={decrease}>Decrease</button>
    </>
  )

}

export default App
