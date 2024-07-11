import { useEffect, useState } from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = ' https://www.omdbapi.com/?apikey=7fe042bd'
const App = () => {

    // state 
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // function to fetch movie with title
    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`)
            const data = await response.json()

            // console.log(data.Search)
            setMovies(data.Search)

        } catch (err) {
            console.log('Fetch err')
        }

    }

    // hook that will load as soon as component 
    // fetch data as soon as component loads
    useEffect(() => {
        // call the function to fetch movies 
        searchMovies('Spiderman')
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value= {searchTerm} //'Superman'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}

                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>

    )
}

export default App