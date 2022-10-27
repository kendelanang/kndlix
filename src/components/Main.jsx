import axios from 'axios'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import requests from '../Requests'

const Main = ({ }) => {
    const [movies, setMovies] = useState([])
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path,
                }),
            });
            console.log(movie.id)
            alert(`${movie.title} telah ditambahkan ke tonton nanti`)
        } else {
            alert('Harap login terlebih dahulu')
        }
    }

    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results)
        })
    }, [])

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    return (
        <div className='w-full h-[550px]'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={'movie?.title'} />
                <div className='absolute w-full top-[15%] p-4 md:p-8 md:top-[15%]'>
                    <h1 className='text-3xl md:text-5xl font-bold text-white'>{movie?.title}</h1>
                    <div className='my-4'>
                        <a href={`https://www.youtube.com/results?search_query=${movie?.title} trailer`} target="_blank" class="group inline-flex">
                            <span className="relative block px-5 py-2 overflow-hidden text-white transition-colors duration-300 ease-out group-hover:text-white border-red-600 group-hover:border-white border group-hover:text-black">
                                <span className="absolute inset-0 px-5 py-2 bg-red-600"></span>
                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
                                <span className="relative">Play</span>
                            </span>
                        </a>
                        <button onClick={saveShow} className="group inline-flex ml-4">
                            <span className="relative block px-5 py-2 overflow-hidden text-white transition-colors duration-300 ease-out group-hover:text-white border-white group-hover:border-white border group-hover:text-black">
                                <span className="absolute inset-0 px-5 py-2 bg-transparent"></span>
                                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
                                <span className="relative">Tonton Nanti</span>
                            </span>
                        </button>
                    </div>
                    <p className='text-gray-400 text-sm'>Dirilis : {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview, 150)}</p>
                </div>
            </div>
        </div>
    )
}

export default Main