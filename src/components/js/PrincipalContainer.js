import React, { useRef, useState, useEffect } from 'react';
import '../css/PrincipalContainer.css';

// Container Principal, que guardará todas as informações da Landin Page
function PrincipalContainer() {

  // Constante que busca guardar (em array) todas as seções da página: Apresentações, Mercury, Neptune, Jupiter e Footer
  const sectionRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  // Constante que se refere a div de movimentação de imagens da tela de apresentações.
  const imagesPresentationDiv = useRef(null)

  // Variável de estado, para chamar alterações na DOM sempre que alterada. Guarda a posição atual da DIV de imagens da tela de apresentações.
  var [TranslateX, setTranslateX] = useState(0)

  // Variável de estado, guarda o estilo a ser incrementado na div quando a variável TranslateX for alterada.
  var [StyleImgDiv,SetStyleImgDiv] = useState({ transform: 'translateX('+TranslateX+'%)', transition: '1.5s'})

  // Arrow Function para a função que mostra a próxima imagem (utiliza como verificador a variável TranslateX. Precisa ter valores alterados ao inserir mais imagens).
  const NextImg = () => {
    if (TranslateX - 25 >= (-75)) {

      setTranslateX(TranslateX - 25)
    } else {
      setTranslateX(0)
    }
  }

  // Arrow Function para a função que mostra a imagem anterior (utiliza como verificador a variável TranslateX. Precisa ter valores alterados ao inserir mais imagens).
  const PrevImg = () => {
    if (TranslateX + 25 <= 0) {

      setTranslateX(TranslateX + 25)
    } else {
      setTranslateX(-75)
    }
  }

  // Um useEffect que monitora a variável TranslateX. Caso seu valor seja alterado, irá atualizar a DOM e alterar a variável StyleImgDiv, migrando para a próxima imágem (ou anterior).
  useEffect(() => {
    SetStyleImgDiv({
        transform: 'translateX(' + TranslateX + '%)',
        transition: '1s'
    });
}, [TranslateX]);

  // Constante para atribuição da Div principal do PrincipalContainer, que possuí o scroll persolanizado.
  const divMain = useRef(null)

  // Cadastramento dos tipos de efeito, em geral, de scroll, wheel, touchstart e touchmove. Todos os efeitos são para a rolagem personalizada.
  useEffect(() => {

    // Variável de controle. Sua ação principal é impedir que o wheel ou o touchmove sejam ativados multiplas vezes. Ao invés disso, a função só será eecutada se a variável for false.
    // Em contrapartida, durante a execução do código, a variável será true para impedir quaisquer outras execuções, mantendo apenas uma execução de scroll por vez.
    var DivMainCalculateIsRun = false
  
    // Variável que busca guardar o index da constante sectionRefs, para transicionar entre cada seção no scroll.
    var sectionActualy = 0;

    // Define o primeiro ponto de toque em dispositivos touch, para depois comparar com touchmove e determinar se o movimento é para cima ou para baixo.
    var StartTouchPoint;

    // Declara o DeltaY para comparar os eventos de wheel e de touchmove, essa variável guarda a variação de pixels entre esses movimentos.
    // Variações positivas indicam movimento para baixo. Negativas, indicam movimento para cima.
    var deltaY;

    // Descarta o evento de Scroll
    const DivMainScroll = (event) => { event.preventDefault() }

    // Recupera o evento wheel, calcula o deltaY e chama a função CalculateDeltaY com os parâmetros event e o deltaY calculado.
    const DivMainWheel = (event) => {

      deltaY = event.deltaY

      CalculateDeltaY(event, deltaY)
    }

    // Armazena o primeiro ponto de touch para comparar com touchmove.
    const DivMainTouchStart = (event) => {

      StartTouchPoint = event.touches[0].clientY;
    }

    // Calcula o deltaY do touchmove, subtraindo o ponto de start do ponto atual. Note que no touchmove, o deltaY é dado invertido (Negativo e Positivo).
    // Por isso a atribuição * (-1)
    const DivMainTouchMove = (event, deltaY) => {
      
      const ActualyTouchPoint = event.touches[0].clientY; // Obtém a posição vertical atual do toque
      deltaY = (ActualyTouchPoint - StartTouchPoint) * (-1);

      CalculateDeltaY(event, deltaY)
    }

    // Cálcula, pela variação do deltaY, qual seção deverá ser revelada na tela através do scroll.
    function CalculateDeltaY (event, deltaY) {

      // Verifica se a mesma função não está sendo executada.
      if (DivMainCalculateIsRun === true) {

        // Descarta o evento, não será utilizado de qualquer maneira.
        event.preventDefault();

      } else if (DivMainCalculateIsRun === false) {

        // Trava a variável em True enquanto o código está rodando, para impedir quaisquer outras execuções.
        DivMainCalculateIsRun = true

        // DeltaY positivo, irá para a próxima seção. Negativo, volta pra anterior. Simples.
        if (deltaY > 0) {
          sectionActualy++
        } else if (deltaY < 0) {
          sectionActualy--
        }

        // Não falei que seria descartado de qualquer maneira? Pois bem.
        event.preventDefault();

        // Limita as sections. A sectionActualy é o index das seções sectionRefs. Index não pode ser negativo, nem superior ao maior index da variável. Este código faz isso.
        if (sectionActualy < 0) {
          sectionActualy = 0
        } else if (sectionActualy > sectionRefs.length - 1) {
          sectionActualy = sectionRefs.length - 1
        }

        // Faz a rolagem suave para a próxima seção, ou anterior, depende do usuário.
        divMain.current.scrollTo({
          top: sectionRefs[sectionActualy].current.offsetTop,
          behavior: 'smooth'
        });

        // Estabelece um tempo mínimo entre as execuções das funções para, pelo menos, a rolagem finalizar sua animação.
        // Depois seta a variável como false novamente, para permitir outras execuções.
        setTimeout(() => { DivMainCalculateIsRun = false }, 500);
      }
    };

    // Obtem a referência a div principal #Main para adicionar eventos.
    const divMainRef = document.getElementById("Main");

    // Adiciona os eventos na montagem do componente.
    divMainRef.addEventListener('wheel', DivMainWheel);
    divMainRef.addEventListener('scroll', DivMainScroll);
    divMainRef.addEventListener('touchstart', DivMainTouchStart);
    divMainRef.addEventListener('touchmove', DivMainTouchMove);

    // Remove os eventos quando o componente é desmontado, se é que vai ser.
    return () => {
      divMainRef.removeEventListener('wheel', DivMainWheel);
      divMainRef.removeEventListener('scroll', DivMainScroll);
      divMainRef.removeEventListener('touchstart', DivMainTouchStart);
      divMainRef.addEventListener('touchmove', DivMainTouchMove);
    };
  });

  // HTML do componente.
  return (
    <div id="Main" ref={divMain}>
      {/* Seção 1: Texto de apresentação */}
      <div ref={sectionRefs[0]} className="section">
        <div class="sectionContainer" id="sectionPresentationContainer">
          <div class="PresentationContainer" id="PresentationImages">
            <div id="ImagesContainer">
              <div ref={imagesPresentationDiv} id="ImagesContainerController" style={StyleImgDiv}>
                <div class="PresentImagesFrame" id="PresentImagesFrame-1"></div>
                <div class="PresentImagesFrame" id="PresentImagesFrame-2"></div>
                <div class="PresentImagesFrame" id="PresentImagesFrame-3"></div>
                <div class="PresentImagesFrame" id="PresentImagesFrame-4"></div>
              </div>
            </div>
            <div id="ButtonsContainer">
              <button class="ButtonImageAltern" id="ButtonPrevImage" onClick={PrevImg} >AL</button>
              <button class="ButtonImageAltern" id="ButtonNextImage" onClick={NextImg} >AR</button>
            </div>
          </div>
          <div class="PresentationContainer" id="PresentationText">
            <h1>A GamesPlanet:</h1>
            <h2>Na GamesPlanet, você adquire seu setup das galáxias para explorar o universo dos games.</h2>
            <h3>Trabalhamos com o melhor do mundo do hardware e software. Computadores de última geração, montados por profissionais para profissionais.</h3>
            <h3>Aqui, cada componente do seu setup dos sonhos é escolhido cuidadosamente pensando em desempenho, capacidade, temperatura e consumo.</h3>
            <h3>Todos os nossos computadores contam com garantia de 3 anos, além da garantia do fabricante de cada componente e suporte para seu computador 24h por dia, 7 dias por semana.</h3>
          </div>
        </div>
      </div>

      {/* Seção 2: Mercury */}
      <div ref={sectionRefs[1]} className="section">
        <div class="sectionContainer" id="sectionMercuryContainer">

        </div>
      </div>

      {/* Seção 3: Neptune */}
      <div ref={sectionRefs[2]} className="section">
        <div class="sectionContainer" id="sectionNeptuneContainer">

        </div>
      </div>

      {/* Seção 4: Jupiter */}
      <div ref={sectionRefs[3]} className="section">
        <div class="sectionContainer" id="sectionJupiterContainer">

        </div>
      </div>

      {/* Seção 5: Jupiter */}
      <div ref={sectionRefs[4]} className="section">
        <div id="Footer">

        </div>
      </div>
    </div>
  );
}

export default PrincipalContainer;