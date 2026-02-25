import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  // useRef() = When you dont want a re render when something changes value
  //            but you want it to "remember" that info

  const inputRef = useRef(null);

  // TO CHECK RE RENDERS 
  useEffect(() => {
    console.log("Component re-rendered")
  })

  // COMPONENT DOESNT RE RENDERRRR , NORMALLY IT WOULD es como un get doc by id 
  function handleClick(){
    inputRef.current.focus(); // we can even fchnage the input without render
    inputRef.current.style.backgroundColor = "yellow" // doesnt re render 
    
  }
  return(
    <div>
      <button onClick={handleClick}>Click me</button>
      <input ref={inputRef} type="text" name="" id="" />
    </div>
  )
}
export default App
