    function UserGreeting(props){
    if(props.isLoggedIn){
        return <h2>Welcome {props.username}</h2>
    }else {
        return <h2> Pls log in to continue </h2>
    }
}

//////////////////////////////////////////////

function UserGreeting(props){

    const greeting = <h2 className="welcome-message">Welcome {props.username}</h2>
    const greetingLogin = <h2 className="loginPrompt"> Pls log in to continue </h2>



    if(props.isLoggedIn){
        return greeting
    }else {
        return greetingLogin
    }
}

////////////////////////////////////////////// Sorting and map 
function List (){

    const fruits = [{name:"apple", calories:95, id :1}, 
                    {name:"orange", calories:45, id:2},
                    {name :"banana", calories: 105, id:3}, 
                    {name: "piña", calories: 159, id:4 }];

    fruits.sort((a,b) => a.name.localeCompare(b.name))  // Sort array by name
    fruits.sort((a,b) => a.calories - b.calories)  // Sort by calories 

    const lowCalFruit = fruits.filter(fruit => fruit.calories < 100 ); // filter only less than 100C
    const highCalFruit = fruits.filter(fruit => fruit.calories > 100); // Filter +100

    const listItems = fruits.map( fruit =>
        <li key={fruit.id}>{fruit.name}, Calories:{fruit.calories}</li>);

    return (
        <ul>{listItems}</ul>
    )

}

//////////////////////////////////////////////////////////
// Using a molde for list 


    function App() {


        const fruits = [{name:"apple", calories:95, id :1}, 
                        {name:"orange", calories:45, id:2},
                        {name :"banana", calories: 105, id:3}, 
                        {name: "piña", calories: 159, id:4 }];

        const vegetables = [{name:"potato", calories:915, id :5}, 
                        {name:"celery", calories:15, id:6},
                        {name :"corn", calories: 63, id:7}, 
                        {name: "brocoli", calories: 50, id:8 }];

    return(
        <>
        <List items = {fruits} categoria = "Fruits"/>
        <List items = {vegetables} categoria = "Vegetables"/>
        </>
        
    );
}


/////////////////////////////////////////////////////////////////////

function App() {

    const fruits = [{name:"apple", calories:95, id :1}, 
                    {name:"orange", calories:45, id:2},
                    {name :"banana", calories: 105, id:3}, 
                    {name: "piña", calories: 159, id:4 }];

    const vegetables = [{name:"potato", calories:915, id :5}, 
                    {name:"celery", calories:15, id:6},
                    {name :"corn", calories: 63, id:7}, 
                    {name: "brocoli", calories: 50, id:8 }];

  return(
    <>
      {fruits.length > 0 ? <List items = {fruits} categoria = "Fruits"/> : null}
      {fruits.length > 0 && <List items = {vegetables} categoria = "Vegetables"/>} 
    // Ese && hace que si el array esta vacio nada pase, no renderiza 
    </>
    
  );
}


///////////////////////////////////////////////////////////
function Button(){

    const handleClick = (event) => event.target.textContent = "OUCH"

    return (
        <button onClick={(event) => handleClick(event) }>Click meee</button>
    );
}
export default Button

///////////////////////////////////////////////////////////////
//HIDE OBJECT FROM SCREEN 

function Profile(){
    const imageUrl = './src/assets/images.jpeg'
    const handleClick = (e) => e.target.style.display = "none"
    
    return (<img onClick={(e) => handleClick(e)} src={imageUrl}></img>);

}

/////////////////////////////////////////////////////////////

//STATE HOOKKKKKK

function MyComponent(){

    const [name, setName] = useState("Guest"); //Initial State Optional
    const [age, setAge] = useState(0);

    const updateName = () => {
      setName("Daniel") // updates DOM 
    }

    const updateAge = () => {
        setAge(age+1); // We can even increase by 2 or use booleans 
    }

    return (
        <div>
            <p>Name : {name}</p>
            <button onClick={updateName}>Set Name </button>
            <p>Age : {age} </p>
            <button onClick={updateAge}>Increment Age </button>
        </div>
    )
}


///////////////////////////////////////////////////////////

// COUNTER PROGRAMMMMMMMMM

import React, {useState} from "react"

function Counter (){

    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count+1)
    }

    const decrease = () => {
        setCount(count-1)
    }

    const reset = () => {
        setCount(0)
    }
    
    return(
        <>
        <h3>{count}</h3>
        <button onClick={increase}>Increment</button>
        <button onClick={decrease}>Decrement</button>
        <button onClick={reset}>Reset</button>
        </>
    )
}

// MORE USE STATE -------------------------------------------

function MyComponent(){


    const [name, setName] = useState("Your name");
    const [payment, setPayment] = useState()

    function handleName(event){
        setName(event.target.value)
    }//Everytime it changes it is triggered

    //Sin value={name}, si algo causa un re-render (por ejemplo otro estado cambia), 
    // el input se resetea a vacío porque React redibuja el componente desde cero y 
    // el input no tiene nada que lo ancle.

    function handlePayment(event){
        setPayment(event.target.value)
    }
    return(
        <div>
            <input value ={name} onChange={handleName} />
            <p>Name: {name}</p>

            <select value={payment} onChange={handlePayment} name="" id="">
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
            </select>
            <p> Payment: {payment}</p>
        </div>
    )
}

// -----------------------------------------------------
// UPDATER FUNCTIONS 

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


/////////////////////////////////////////////////////////////////////
// SPREAD OP ... UPDATE FUNCTION 


function Component(){

    const [car, setCar] = useState({year: 2021, make:"BMW", model: "M240I"});

    function handleMakeChange(event){
        setCar(c => ({...c, make: event.target.value})) //Spread will keep everything else and update make
    } // Al usar spread se usa ({...})

    function handleModelChange(event){
        setCar(c => ({...c, model: event.target.value}))
    }

    function handleYearChange(event){
        setCar(c => ({...c, year: event.target.value}))
    }

    return(
        <div>
            <p>Your favorite car is : {car.year} {car.make} {car.model} </p>

            <input type="number" onChange={handleYearChange} value={car.year} /> <br />
            <input type="text" onChange={handleMakeChange} value={car.make} /> <br />
            <input type="text" onChange={handleModelChange} value={car.model} /> <br />
        </div>);
}

/////////////////////////////////////////////////////////////////
// DELETE FROM ARRAY, UPDATE ARRAYS USING STATES 

function Component(){
    const[food, setFood] = useState(["Apple", "Banana"])

    function handleAddFood(){
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = ""
        setFood(f => [...f, newFood]) // Aca usamos spread, le traemos el most recent array
        // y luego le agregamos la newFood
    }

    function removeFood(index){
        setFood(food.filter((element, posicion) => posicion !== index))
    } // filtra (quita) todo lo que sea diferente a el index(to be deleted)


    // Cuando usamos un onClick o algo asi, podemos o pasar la referencia  la funcion (sin parentesis)
    // Pero si la funcion necesita args, la pasamos como arrow function 
    return(
        <>
        <div>
            <h2>List of Food</h2>
            <ul>
                {food.map((food,index) => <li key={index} 
                                        onClick={() => removeFood(index)}>   
                                        {food}</li>)}
            </ul>
            <input type="text" name="" id="foodInput" placeholder="Enter food name" />
            <button onClick={handleAddFood}>Add Food</button>
        </div>
        </>
    )
}

////////////////////////////////////////////////////////////////////////////////////
// PROGRAMA TODO ALIKE! CARS CHOOSER !!!


function Component(){

    const[cars,setCars] = useState([])
    const[carYear, setCarYear] = useState(new Date().getFullYear())
    const[carMake, setCarMake] = useState("")
    const[carModel, setCarModel] = useState("")

    function handleAddCar(){
        const newCar = {year: carYear, model: carModel, make: carMake} // current state since we are using on change on inputs, so its already saved
        setCars(c => [...c, newCar])

        setCarYear(new Date().getFullYear())
        setCarMake("")
        setCarModel("")
    }

    function handleRemoveCar(index){
        setCars(c => c.filter((car,posicion) => posicion !== index))
    }

    function handleYearChange(event){
        setCarYear(event.target.value)

    }

    function handleMakeChange(event){
        setCarMake(event.target.value)

    }

    function handleModelChange(event){
        setCarModel(event.target.value)

    }


    return(
        <div>
            <h2>List of car </h2>
            <ul>
                {cars.map((car,index) => <li onClick={()=> handleRemoveCar(index)} key={index}>{car.year} {car.make} {car.model} </li>)}

            </ul>
            <input type="number" value={carYear} onChange={handleYearChange} placeholder="Year" /> <br />
            <input type="text" value={carMake} onChange={handleMakeChange} placeholder="Make"/> <br />
            <input type="text" value={carModel} onChange={handleModelChange} placeholder="Model" /> <br />

            <button onClick={handleAddCar}>Add Car</button>
        </div>
    )
}

////////////////////////////////////////////////////////////////////////////////////////////
/// TODO-APP

function App() {
  const [todos, setNewTodo] = useState([])
  const [todoName, setTodoName] = useState("")
  const [todoDate, setNewDate] = useState("")
  const [todoDescription, setNewDescription] = useState("")

  function handleAddTodo(){
    const newTodo = {name:todoName, fecha:todoDate, Description:todoDescription}
    setNewTodo( (t)=> [...t, newTodo] )
    setTodoName("")
    setNewDate("")
    setNewDescription("")
  }

  function handleAddName(event){
    setTodoName(event.target.value)
  }

  function handleAddDate(event){
    setNewDate(event.target.value)
  }

  function handleAddDescription(event){
    setNewDescription(event.target.value)
  }

  function removeTodo(index){
    setNewTodo(t => t.filter((objeto,posicion) => posicion !== index))
  }
  

  return(
    <div>
      <h1>Welcome Todo App</h1>

      <input value={todoName} onChange={handleAddName} type="text" placeholder='Enter To-do' /> <br />
      <input value={todoDate} onChange={handleAddDate} type="date" placeholder='Enter Deadline' /> <br />
      <input value={todoDescription} onChange={handleAddDescription} type="text" placeholder='Enter description' /> <br />
      <button onClick={handleAddTodo}>Submit Task</button>

      <div>
        <h3>Todos Pending</h3>
          <ul>
            {todos.map((todo,index) => <li key={index} className='liTodo' onClick={() => {removeTodo(index)}}> {todo.name}, due for {todo.fecha} , description : {todo.Description} </li>)}
          </ul>
      </div>


    </div>
  )

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// useEffect() or Use Side Code
//  useEffect(() => {}) : After every re-render // useEffect(() => {},[]) : Runs only on mount
// useEffect(() => {},[value]): runs when mount + when value changes


function App() {
  const [count, setCount] = useState(0)

  // Run when component App re renders
  useEffect(()=> {
    document.title = `count ${count}`
  })

  function addCount(){
    setCount(c => c+1)
  }
  
  return(
    <div>
      <p> Count: {count}</p>
      <button onClick={addCount}>Add</button>
    </div>
  )
}
// But we can also do a clean up after each re render
  window.addEventListener("resize",handleResize);
  console.log("EVENT LISTENER ADDED")
  // Aca por ejemplo si ponemos ese codigo, cada rerender añade un listener = 1k event listeners atm 

  useEffect(() => {
    window.addEventListener("resize",handleResize);
    console.log("EVENT LISTENER ADDED")
    // RETURN para quitar el event listener cuando se desmonte el componente 
    return() => {
      window.removeEventListener("resize", handleResize)
      console.log("Event removed")
    }
  },[])
  // Asi solo lo creamos 1 vez cuando el componente se monte, y no en cada re render
  
  ////// CLOCK PROGRAMMM ////////////////////////////////////////////////////////

  function DigitalClock(){



    const[time,setTime] = useState(new Date());


    useEffect(()=> {
        const intervalId = setInterval(()=> {
            setTime(new Date());
        },1000);

        return()=>{
            clearInterval(intervalId)
        }
    },[]);

    function formatTime(){
        let hours = time.getHours()
        let minutes = time.getMinutes()
        const seconds = time.getSeconds()
        const meridiem = hours >=12 ? "PM" : "AM"

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number){   
        return (number < 10 ? "0":"")+number
    }

    return(

        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    )
}

////////////////////////////////////////////////////////////////////////////////
// USE CONTEXT TO PASS INFO 

function componentA(){
    // useContext lets us send values accross components 
    // A is the provider component
    const [user, setUser] = useState("Alejandro")
    return(
        <div className="box">
            <h1>ComponentA</h1>
            <h2>{`Hello ${user}`}</h2>
            <UserContext.Provider value={user}>
                <ComponentB/>
            </UserContext.Provider>   
        </div>
    )
    // We wrap the first child 
}

import { useContext } from "react"
import { UserContext } from "./ComponentA" 
// WE IMPORT THE EXPORT FROM A
function componentC(){
    const user = useContext(UserContext); // Then we declare it
    return(
        <div className="box">
            <h1>ComponentC</h1>
            <h2>bye{user}</h2>
        </div>
    )
}

////////////////////////////////////////////////////////////////////////////////
// USE REF, NOT RE RENDER 
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

/////////////////////////////////////////////////////////////////////////////////////
