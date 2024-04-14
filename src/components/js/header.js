import React from 'react';
import logoImg from '../imgs/GmPlanetLogo.png';
import '../css/header.css';

function Header() {
  return (
    <header id="header">
      {/* Atribuição da Logo*/}
      <img class="Headers" src={logoImg} alt="Logo" id="LogoImg"></img>

      {/* Criação da Div que guardará as 3 opções de computadores no Header: Mercury, Neptune e Jupiter*/}
      <div class="Headers" id="PCTypesContainer">
        <buttom class="Headers PCTypesContainerClass" id="Mercury"><span id="MercurySpan">Mercury</span></buttom>
        <buttom class="Headers PCTypesContainerClass" id="Jupiter"><span id="JupiterSpan">Jupiter</span></buttom>
        <buttom class="Headers PCTypesContainerClass" id="Neptune"><span id="NeptuneSpan">Neptune</span></buttom>
      </div>

      {/* Botão de compra, que levará ao site da loja. A Landing Page busca apenas converter acessos em possíveis vendas no site oficial */}
      <buttom class="Headers" id="SiteShopButtom">Comprar</buttom>
    </header>
  );
}

export default Header;