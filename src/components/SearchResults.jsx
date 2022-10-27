import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Movie from './Movie';
import { useLocation } from 'react-router-dom'

const SearchResults = ({ title, rowID }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        const carifilm = async () => {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=723611760df2f88b05c9cdbbb7d845e3&language=en-US&query=${query}&include_adult=true`);
                setMovies(data.results);
            } catch (error) {
                setError(error.response?.data?.message);
            }
        };
        carifilm();
    }, []);

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={slideLeft} className='bg-white left-4 rounded-full absolute opacity-30 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40} />
                <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item} />
                    ))}
                </div>
                <MdChevronRight onClick={slideRight} className='bg-white right-4 rounded-full absolute opacity-30 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40} />
            </div>
        </>
    );
}

export default SearchResults