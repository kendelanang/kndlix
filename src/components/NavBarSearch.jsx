import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const NavBarSearch = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if ((e).key === 'Enter') {
            window.location.reload(false);
            e.preventDefault();
        } else{
            navigate(`/kndlix/search?query=${search}`)
        }
    };

    const cari = e =>{
        navigate(`/kndlix/search?query=${search}`)
        window.location.reload(false);
    }

    return (
        <form className='flex bg-black bg-opacity-25 items-center justify-between w-full h-10 rounded px-5 text-white '>
            <label className='flex gap-1'>
                <input onChange={(e) => { setSearch(e.target.value) }} onKeyPress={handleKeyDown} type="search" placeholder={'Cari Film...'} className='bg-transparent text-white placeholder-white focus:outline-none'></input>
                <div onClick={cari} className='mt-1'>
                    <BiSearch />
                </div>
            </label>
        </form>
    )
}

export default NavBarSearch