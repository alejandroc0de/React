import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function GetMovie(){

  const[movie, setMovie] = useState("")
  const navigate = useNavigate()
  const [notfound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleName(event){
    setMovie(event.target.value)
  }

  async function handleSearch(){
    try {
        setLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=b81d442e&t=${movie}`)
        const data = await res.json()
        if(data.Response== "False"){
            setLoading(false)
            setNotFound(true)
            return
        }
        console.log(data)
        navigate('/showMovie',{state:{data:data}}) // We now go to the other site 
        setNotFound(true)
    } catch (error) {console.log("Error al fetch the movie, server side")
    }finally{
        setLoading(false)
    }

  }

    return(
        <div className=" flex flex-col content-center gap-3 mt-5">
            <h1 className="text-center text-3xl font-bold font-mono ">Welcome to the movie infomart</h1>
            <input className="bg-gray-500 text-center h-9.5 rounded-2xl  " onChange={handleName}value={movie} placeholder="Enter movie name" type="text" name="" id="" /> <br />
            <button className="bg-green-300 rounded-2xl w-2xs self-center-safe  " onClick={handleSearch}>Search</button>
            {notfound && <p className="text-center text-red-600 font-medium">Movie not found, please check again</p>}
            {loading && <p className="text-center text-green-600 font-medium"> Loading results ..... </p>}
        </div>
    )
}


export default GetMovie