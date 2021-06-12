import { useState } from 'react';
import './App.css';
import CardList from './CardList';
import AboutPage from './AboutPage';
import SpecificCard from './SpecificCard';

function App() {
  const [page, setPage] = useState('2');
  const [card, renderCardDescription] = useState('');
  const renderCard = () => {
    if (card) {
      return <SpecificCard card={card} />
    }
    return <CardList renderCardDescription={renderCardDescription} />
  }
  return (
    <div className="page">
      <div className="paper">
        <span className="navItem" onClick={() => { setPage('1'); renderCardDescription('') }}>Main</span>
        <span className="navItem" onClick={() => { setPage('2'); renderCardDescription('') }} >Cards</span>
      </div>
      {page === '2' && renderCard()}
      {page === '1' && <AboutPage />}
    </div>
  );
}

export default App;
