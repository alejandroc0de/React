import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function ShowMovie(){
    const location = useLocation()
    const data = location.state.data

    return(
        <div>
            <div className="flex flex-col text-center gap-5 bg-blue-200">
                <h1 className="text-4xl font-bold font-mono mt-3 ">Movie:{data.Title}</h1>
                <p className="font-medium">Year: {data.Year}</p>
                <img className="w-48 h-72 object-cover self-center-safe " src={data.Poster} alt="" />
                <p className="font-medium">Plot:{data.Plot}</p>
                <p className="font-medium">Country: {data.Country}</p>
                <p className="font-medium">Imdb Rating: {data.imdbRating}</p>
            </div>
        </div>
    )
}

export default ShowMovie
