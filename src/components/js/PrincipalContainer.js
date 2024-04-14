import React, { useRef, useEffect } from 'react';
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

  // Constante para atribuição da Div principal do PrincipalContainer, que possuí o scroll persolanizado.
  const divMain = useRef(null)

  // Temporário, será excluido.
  const scrollToSection = (index) => {
    const section = sectionRefs[index].current;
    divMain.current.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  };

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
        <h1>Seção 1</h1>
        <p>Texto de apresentação...</p>
        <button onClick={() => scrollToSection(1)}>Próxima Seção</button>
      </div>

      {/* Seção 2: Mercury */}
      <div ref={sectionRefs[1]} className="section">
        <h1>Seção 2</h1>
        <p>Produto 1...</p>
        <button onClick={() => scrollToSection(2)}>Próxima Seção</button>
        <button onClick={() => scrollToSection(0)}>Seção Anterior</button>
      </div>

      {/* Seção 3: Neptune */}
      <div ref={sectionRefs[2]} className="section">
        <h1>Seção 3</h1>
        <p>Produto 2...</p>
        <button onClick={() => scrollToSection(3)}>Próxima Seção</button>
        <button onClick={() => scrollToSection(1)}>Seção Anterior</button>
      </div>

      {/* Seção 4: Jupiter */}
      <div ref={sectionRefs[3]} className="section">
        <h1>Seção 4</h1>
        <p>Produto 3...</p>
        <button onClick={() => scrollToSection(4)}>Próxima Seção</button>
        <button onClick={() => scrollToSection(2)}>Seção Anterior</button>
      </div>

      {/* Seção 5: Footer */}
      <div ref={sectionRefs[4]} className="section">
        <h1>Footer</h1>
        <p>Rodapé...</p>
        <button onClick={() => scrollToSection(3)}>Seção Anterior</button>
      </div>
    </div>
  );
}

export default PrincipalContainer;