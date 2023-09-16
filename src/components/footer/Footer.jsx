import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between space-x-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">About the App</h2>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
            velit fuga perspiciatis itaque iste, aliquid dignissimos voluptate
            modi, tempore assumenda adipisci dolor hic atque quod consequuntur
            cupiditate. Quasi, nobis veritatis!
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <p className="mt-2">
            <span className="block">Phone: [Your Phone Number]</span>
            <span className="block">GitHub: [Your GitHub Profile]</span>
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Location</h2>
          <address className="mt-2">
            <span className="block">Country: Bharat</span>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
