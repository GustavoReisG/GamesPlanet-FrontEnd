import './App.css';
import Header from './components/js/header';
import PrincipalContainer from './components/js/PrincipalContainer';

function App() {
  return (
    /* Criação do MainDiv (Div Principal para abrigar todos os componentes da Landin Page */
    <div className="MainDiv">
      <Header />

      {/* O PrincipalContainer é o responsável pela rolagem (scroll) e também pelo conteúdo da Landing Page */}
      <PrincipalContainer />
    </div>
  );
}

export default App;