import './App.css';

function SpecificCard(props) {
    return (
        <div id="main-page" className='specificcard'>
            <img alt="URL Invalid" src={props.card.url} />
            <div className='description'>{props.card.description}
            </div>
        </div>
    )
}
export default SpecificCard;