import React from 'react';
import logoImg from '../imgs/GmPlanetLogo.png';
import '../css/header.css';

function Header() {
  return (
    <header id="header">
      <img class="Headers" src={logoImg} alt="Logo" id="LogoImg"></img>
      <div class="Headers" id="PCTypesContainer">
        <buttom class="Headers PCTypesContainerClass" id="Mercury"><span id="MercurySpan">Mercury</span></buttom>
        <buttom class="Headers PCTypesContainerClass" id="Jupiter"><span id="JupiterSpan">Jupiter</span></buttom>
        <buttom class="Headers PCTypesContainerClass" id="Neptune"><span id="NeptuneSpan">Neptune</span></buttom>
      </div>
      <buttom class="Headers" id="SiteShopButtom">Buy</buttom>
    </header>
  );
}

export default Header;