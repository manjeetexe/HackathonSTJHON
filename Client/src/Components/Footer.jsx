// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative text-white py-10">
      <div className='h-64 w-28 md:h-96 md:w-28 rounded-full bg-blue-500 rotate-[80deg] md:-bottom-[5%] bottom-[10%] left-0 blur-3xl absolute'> </div>
      <div className="px-10 mx-auto">
        <div className='flex gap-3'>
          <img className='h-9' src='' alt="" />
          <h1 className='text-3xl px-7 font-semibold'>Quantum Musing</h1>
        </div>
        <div className="border-t border-gray-600 mt-5 mb-20"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 px-10 gap-8">

          <div>
            <h4 className="text-xl text-white font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Fees</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4">Social Media</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Youtube</a></li>
              <li><a href="#" className="hover:underline">Telegram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Cookies Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Subscribe to our newsletter</a></li>
              <form className='flex gap-3' action="">
                <input type="text" placeholder='Enter your Email' className='rounded-lg bg-gray-600 py-2 px-3 w-40' />
                <button className='bg-blue-400 text-black font-semibold rounded-lg px-3 py-2'>Suscribe</button>
              </form>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-600 mt-20"></div>

        <div className="flex flex-col md:flex-row items-center px-10 justify-between mt-6">

          <div className="flex space-x-4">
            <a href="https://www.instagram.com/makeupartist_vaishnavi.k?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-white text-xl hover:opacity-80"><RiInstagramFill /></a>
            <a href="mailto:manjeetsharma9257@gmail.com" className="text-white text-xl hover:opacity-80"><MdEmail /></a>
            <a href="tel:9370612327" className="text-white rotate-90 hover:opacity-80"><FaPhone /></a>
          </div>

          <p className="text-sm text-center mt-4 md:mt-0">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
