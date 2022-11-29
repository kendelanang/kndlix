import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import kendlix from "../../src/assets/kendlix.png";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/kndlix/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center p-4 z-[100] w-full absolute">
      <Link to="/kndlix/">
        <img className="h-full w-[120px]" src={kendlix} alt="logo-kendlix" />
      </Link>

      <Link to="/kndlix/search/" className="flex text-white mr-0 ml-auto pr-4">
        <BiSearch />
      </Link>

      <div className="right-0">
        {user?.email ? (
          <div>
            <Link to="/kndlix/account">
              <button className="text-white pr-4">Akun</button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            >
              Keluar
            </button>
          </div>
        ) : (
          <div>
            <Link to="/kndlix/login">
              <button className="text-white pr-4">Masuk</button>
            </Link>
            <Link to="/kndlix/signup">
              <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
                Daftar
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
