import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>2023 Spense Store All rights reserved</p>
        <p className='icons'>
          <a href="https://www.instagram.com/_suyashpatil_/" className='text-blue-500 hover:text-pink-500 hover:scale-125 transition-all ease-in-out duration-300' target="_blank" rel="noopener noreferrer"><AiFillInstagram /></a>
          <a href="https://twitter.com/_suyashpatil" className='text-blue-500 hover:text-pink-500 hover:scale-125 transition-all ease-in-out duration-300' target="_blank" rel="noreferrer"><AiOutlineTwitter /></a>  
        </p>
    </div>
  )
}

export default Footer