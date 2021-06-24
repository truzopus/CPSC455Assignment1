import { useEffect, useState } from 'react';
import './App.css';



function SpecificCard(props) {
    const [card, setCard] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/cards/${props.cardName}`).then(res => res.text()).then(res => setCard(JSON.parse(res)));
    }, [props.cardName]);

    return (
        <div id="main-page" className='specificcard'>
            <img alt="URL Invalid" src={card.url} />
            <div className='description'>{card.description}
            </div>
        </div>
    )
}
export default SpecificCard;