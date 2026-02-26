import { useEffect, useRef, useState } from "react"


function Pomodoro(){
    const [timeLeft, setTimeLeft] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(0)
    const intervalIdRef = useRef(null)

    function handleTimeInput(event){
        setTimeLeft(event.target.value)
         console.log(event.target.value)
    }


    useEffect(()=> {
            if(isRunning){
                intervalIdRef.current = setInterval( ()=> {
                    setSecondsLeft((s)=> s-1)
                    console.log(timeLeft)
                },1000);
            }
        return()=>{
            clearInterval(intervalIdRef.current)

        }
    },[isRunning])

    function handleOnBreakTime(){

    }

    function handleOnFocusTime(){

    }

    function handleStart(){
        setIsRunning(true)
        setSecondsLeft(timeLeft*60)

    }









    return(

        <div>
            <h1>Pomodoro</h1>
            <input onChange={handleTimeInput} value={timeLeft} placeholder="Enter your pomodoro time" type="number" name="" id="" />
            <label htmlFor=""> Minutes</label> 
            <br />
            <button onClick={handleOnFocusTime} >Focus Time</button>
            <button onClick={handleOnBreakTime}>Break </button> 
            <br />
            <button onClick={handleStart}>Start</button>
            <p>"00:00"</p>
        </div>
    )



}


export default Pomodoro