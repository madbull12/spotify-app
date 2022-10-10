import React,{ useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShortText } from "react-icons/md";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/searchAtom";
import { useSearch } from "../lib/zustand";
import shallow from 'zustand/shallow'

interface IProps {
  search:string;
  setSearch:(term:string) => void
}


const Search = () => {
  const [search,setSearch] = useSearch((state:any)=>[state.search,state.setSearch],shallow);

  console.log(search)

  return (
    <div className="bg-black pt-4">
      <div className="max-w-4xl  relative z-50 ml-16 lg:ml-24 xl:ml-32 flex  bg-[#2e2e2e] rounded-lg overflow-hidden space-x-2 items-center p-2">
        <IoMdSearch className="text-white text-3xl animate-pulse" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white border-none w-full "
          placeholder="Search..."
        />
        {/* <div className="flex items-center divide-x  divide-gray-700">
          <div className="space-x-4 pr-5 hidden lg:flex">
            <button className="tag">Minimal</button>
            <button className="tag">House</button>

            <button className="tag">Minimal</button>
          </div>
          <div className="flex items-center space-x-2 text-[#cecece] ">
            <MdOutlineShortText className="text-3xl animate-pulse" />
            <span>Filters</span>
          </div>
        </div> */}
      </div>
      {/* <div className="space-x-4 pr-5 flex lg:hidden">
        <button className="tag">Minimal</button>
        <button className="tag">House</button>

        <button className="tag">Minimal</button>
      </div> */}
    </div>
  );
};

export default Search;
