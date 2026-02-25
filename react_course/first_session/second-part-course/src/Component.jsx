import { useState } from "react"

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

export default Component