import React from "react";
import DropdownMenu from "./DropdownMenu";

const AppBarGamePage = () => {
  return (
    <>
      <nav class="container flex justify-between px-4 py-3 mx-auto bg-purple-500">
        <div>
          <h3 class="text-2xl font-medium text-yellow-50">BucketDrop</h3>
        </div>
        <div class="hidden space-x-8 lg:flex mt-2">
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Blogs</a>
          <a href="">Our Team</a>
          <a href="">Contact Us</a>
        </div>

        <div>
          <button class="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded inline-flex items-center">
            <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>
            Logout
          </button>
        </div>
        <div className="lg:hidden">
          <DropdownMenu />
        </div>
      </nav>
    </>
  );
};

export default AppBarGamePage;
