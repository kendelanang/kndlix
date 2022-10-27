
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import kendlix from '../../src/assets/kendlix.png'
import { BiSearch } from 'react-icons/bi'
import NavBarSearch from './NavBarSearch';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/kndlix/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center p-4 z-[100] w-full absolute'>
      <Link to='/kndlix/'>
        <img className='h-full w-[120px]' src={kendlix} alt='' />
      </Link>

      <div onClick={() => setSearch(!search)} className='text-white absolute right-0 mr-48 lg:w-6 md:hidden'>
        <BiSearch />
      </div>

      <div className={`absolute top-16 px-3 py-5 rounded-lg duration-500 w-auto md:hidden ${search ? "right-1 opacity-100" : "right-96 opacity-0"} `}>
        <NavBarSearch />
      </div>

      <div className='absolute right-0 mr-48 md:block hidden'>
        <NavBarSearch />
      </div>

      <div className='right-0 absolute p-4'>
        {user?.email ? (
          <div>
            <Link to='/kndlix/account'>
              <button className='text-white pr-4'>Akun</button>
            </Link>
            <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Logout</button>
          </div>
        ) : (
          <div>
            <Link to='/kndlix/login'>
              <button className='text-white pr-4'>Masuk</button>
            </Link>
            <Link to='/kndlix/signup'>
              <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Daftar</button>
            </Link>
          </div>)}
      </div>
    </div>
  )
}

export default Navbar