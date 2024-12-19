import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user";
import { message } from "antd";
import Logo from "@/images/vote-eat-high-resolution-logo-grayscale-transparent.png"

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = useUserStore();
  const { token, setToken } = useUserStore(); 

  // 漢堡選單開關
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 導航功能
  const changePage = (url) => {
    navigate(url);
    setIsMenuOpen(false); // 點擊後關閉選單
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
	  message.success('登出成功')
    setToken('')
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
    
      {/* logo */}
      <div className="flex justify-center" onClick={() => changePage("/")}>
        <img
          className="w-[8rem] md:w-[15rem] hover:cursor-pointer"
          src={Logo}
          alt="logo"
        />
      </div>

      {/* 漢堡選單 */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center w-12 h-12 border rounded group"
        >
          <span
            className={`block h-1 w-8 rounded bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45" : "mb-1"
            }`}
          ></span>
          <span
            className={`block h-1 w-8 rounded bg-black transition-all duration-300 ${
              isMenuOpen ? "hidden" : "mb-1"
            }`}
          ></span>
          <span
            className={`block h-1 w-8 rounded bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 absolute" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* mobile */}
      {isMenuOpen && (
        <nav className="absolute top-20 right-0 w-8/12 h-full bg-white shadow-lg p-4 z-10 md:hidden">
          <ul className="text-xl">
            {/* 登入或登出按鈕 */}
            <li className="text-gray-700 mb-3 border-b border-solid border-gray-700 p-2">
              {token ? (
                <p onClick={handleLogout}>登出</p>
              ) : (
                <p onClick={() => changePage('/login')}>登入</p>
              )}
            </li>
            {token && (
              <li
                className="text-gray-700 mb-3 border-b border-solid border-gray-700 p-2"
                onClick={() => changePage('/shortlist')}
              >
                候選清單
              </li>
            )}
          </ul>
        </nav>
      )}


      {/*desktop*/}
      <nav className="hidden md:flex">
        <ul className="flex text-lg items-center">
          {token ? (
            <>
              <li>
                <p className="text-xl">hi, {username}</p>
              </li>
              <li
                className="mx-5 text-gray-700 hover:cursor-pointer hover:text-neutral-500"
                onClick={() => changePage('/shortlist')}
              >
                <p>候選清單</p>
              </li>
              <li
                className="mx-2 text-gray-700 hover:cursor-pointer hover:text-neutral-500"
                onClick={handleLogout}
              >
                <p>登出</p>
              </li>
            </>
        ) : (
              <li
                className="mx-2 text-gray-700 hover:cursor-pointer hover:text-neutral-500"
                onClick={() => changePage('/login')}
              >
                <p>登入</p>
              </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
