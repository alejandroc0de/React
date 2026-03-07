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
        if(timeLeft==="" || Number(timeLeft)<=0){
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
        <div className="h-full flex flex-col  items-center bg-beige-pomodoro">
            <div className="flex-1 flex flex-col items-center justify-center py-20">  
                <div id="Div for top items">
                    <h1 className="font-Bungee One text-3xl text-center font-medium text-gray-500 hover:scale-125 transition-all duration-150">Pomodoro</h1>
                </div>   
                    
                <div id="timmerDiv" className=" font-mono tabular-nums flex flex-1 items-center text-center font-extrabold" style={{fontSize:'20vw'}} >
                    {formatTime()}
                </div>

                <div id="inputDiv" className=" flex flex-row w-full justify-evenly items-center" style={{marginBottom:'5vw'}}>
                    <input className="w-5/9 p-2 font-black text-3xl text-center" onChange={handleTimeInput} value={timeLeft} placeholder="Enter your time" type="number" name="" id="" />
                    <label className="text-3x1 font-black " htmlFor=""> Minutes</label> 
                </div>

                <div id="buttonDiv" className=" flex flex-row w-full justify-around mt-auto ">
                    <button className=" text-2xl font-medium hover:scale-125 transition-all duration-150" onClick={handleOnFocusTime}>Focus</button>
                    <button className=" text-2xl font-medium hover:scale-125 transition-all duration-150" onClick={handleOnBreakTime}>Break </button> 
                    <button className=" text-2xl font-medium hover:scale-125 transition-all duration-150" onClick={handleStart}>{isRunning ? "Pause": secondsLeft>0 ? "Resume": "Start"}</button>
                    <button className=" text-2xl font-medium hover:scale-125 transition-all duration-150" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    )
}


export default Pomodoro

