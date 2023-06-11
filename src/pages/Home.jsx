import reactLogo from "../assets/react.svg";
import PopUpForm from "../components/popUpForm/PopUpForm";
import ProductList from "../components/productList/ProductList";
import viteLogo from "/vite.svg";
import { useToggleDispatch } from "../context/togglePopUp";
import { useToggleModeDispatch } from "../context/toggleMode";
import { useSearchDispatch, useSearch } from "../context/searchContext";
import { useEffect } from "react";

const Home = () => {
  const toggleDispatch = useToggleDispatch();
  const toggleModeDispatch = useToggleModeDispatch();
  const search = useSearch();
  const searchDispatch = useSearchDispatch();
  function handleToggle() {
    toggleDispatch({
      type: "ON",
      payload: "",
    });
    toggleModeDispatch({
      type: "ISCREATE",
      payload: "create",
    });
  }
  useEffect(() => {}, [search]);
  return (
    <div className="relative">
      <header className="bg-blue-400 p-[5px] flex justify-evenly">
        <div className="flex gap-[30px]  mx-auto w-[50%] p-[4px] justify-center">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react " alt="React logo" />
          </a>
        </div>
        <input
          className="outline-none p-[5px] rounded-md"
          type="text"
          name="searchProduct"
          id="searchProduct"
          placeholder="Search"
          onChange={(e) =>
            searchDispatch({
              type: "SEARCH",
              payload: e.target.value,
            })
          }
        />
      </header>
      <main className="h-screen flex overflow-hidden">
        <ProductList />
        <button
          onClick={handleToggle}
          className="  rounded-l-3xl  h-[80%] my-auto bg-sky-950 translate-x-8 ease-out duration-300 hover:-translate-x-[1px] "
        >
          <p className="rotate-90 text-white p-[5px] ">+ Tambah Produk</p>
        </button>
      </main>
      <PopUpForm />
    </div>
  );
};

export default Home;
