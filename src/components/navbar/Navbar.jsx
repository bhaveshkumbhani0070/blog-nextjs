"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session = null } = useSession(); // Provide a default value for session

  const handleShowDropdown = () => setShowDropdown(true);
  const handleHideDropdown = () => setShowDropdown(false);

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h2 className="text-2xl">
          <Link href="/">Blogs</Link>
        </h2>
        <ul className="flex items-center space-x-4">
          {session?.user ? (
            <div className="relative">
              <img
                onClick={handleShowDropdown}
                src="/person.jpeg" // Use single quotes consistently for strings
                width="45"
                height="45"
                className="cursor-pointer w-12 h-12 rounded-full"
                alt="person image"
              />
              {showDropdown && (
                <div className="absolute right-0 top-12 bg-white border rounded-lg p-4 space-y-2 shadow-lg">
                  <AiOutlineClose
                    onClick={handleHideDropdown}
                    className="absolute top-2 right-2 cursor-pointer text-gray-500"
                  />
                  <button
                    onClick={() => {
                      signOut();
                      handleHideDropdown();
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                  <Link
                    onClick={handleHideDropdown}
                    href="/create-blog"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  signIn();
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Log in
              </button>
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
