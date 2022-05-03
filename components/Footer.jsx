import React from 'react';
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 JB Hi-Kho All rights are reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook />
        <AiFillLinkedin />
      </p>
    </div>
  )
}

export default Footer