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