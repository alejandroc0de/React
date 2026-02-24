import React, {useState} from "react"

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

export default MyComponent