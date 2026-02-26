import { useEffect, useRef, useState } from "react"


function Pomodoro(){
    const [timeLeft, setTimeLeft] = useState("")
    const [isRunning, setIsRunning] = useState(false) // Is the pomodoro running? 
    const [secondsLeft, setSecondsLeft] = useState(0)
    const intervalIdRef = useRef(null) // SetInterval
    const [pomodoroStatus,setPomodoroStatus] = useState("") // Focus or break session? 

    function handleTimeInput(event){
        setTimeLeft(event.target.value)
    }

    // Logic listening to secondsLeft waiting to get to zero }
    useEffect(() => {
        if(secondsLeft<=0 && isRunning){
            setIsRunning(false)
            setPomodoroStatus(null)
        }
    },[secondsLeft]) // Run while seconds left is running


    // Logic for the countdown, use REF to save the intervalId between re renders (not the same as reload)
    useEffect(()=> {
        if(isRunning){
            intervalIdRef.current = setInterval( ()=> {
                setSecondsLeft(prevSecs => prevSecs-1)
            },1000);
        }
        return()=>{
            clearInterval(intervalIdRef.current)
        }
    },[isRunning])


    // Start is used for resume reset or start depending on the state, logic for that:
    function handleStart(){
        // I make sure time entered is correct 
        if(timeLeft==="" || Number(timeLeft<=0)){
            return
        }
        if(!isRunning && secondsLeft>0){
            setIsRunning(true)
            return
        }
        if(isRunning && secondsLeft >0){
            setIsRunning(false)
            return
        }
        setSecondsLeft(Number(timeLeft*60))
        setIsRunning(true)
    }

    function formatTime(){
        const minutos = Math.floor(secondsLeft/60)
        const segundos = secondsLeft%60
        return(<p>{String(minutos).padStart(2,'0')}:{String(segundos).padStart(2,'0')}</p>)
    }

    function handleReset(){
        setTimeLeft(0)
        setSecondsLeft(0)
        setIsRunning(false)
        setPomodoroStatus(null)
    }

    // This options will save the status either a focus or a break using a State
    function handleOnBreakTime(){
        setPomodoroStatus("Break")
    }

    function handleOnFocusTime(){
        setPomodoroStatus("Focus")
    }











    return(
        <div className= {pomodoroStatus==="Focus"? "bg-blue-400": pomodoroStatus ==="Break"? "bg-yellow-300": "bg-white"}> 
            <h1>Pomodoro</h1>
            <input onChange={handleTimeInput} value={timeLeft} placeholder="Enter your pomodoro time" type="number" name="" id="" />
            <label htmlFor=""> Minutes</label> 
            <br />
            <button onClick={handleOnFocusTime}>Focus Time</button>
            <button onClick={handleOnBreakTime}>Break </button> 
            <br />
            <button onClick={handleStart}>{isRunning ? "Pause": secondsLeft>0 ? "Resume": "Start"}</button>
            <button onClick={handleReset}>Reset</button>
            <div>{formatTime()}</div>
        </div>
    )
}


export default Pomodoro