import { useEffect, useState } from "react";
import './App.css';

async function addCard(data, setCard) {
    fetch('http://localhost:3001/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.text()).then(res => setCard(JSON.parse(res)));
}

async function deleteCard(setCard, name) {
    fetch(`http://localhost:3001/cards/${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.text()).then(res => setCard(JSON.parse(res)));
}

function CardPage(props) {
    const [nameValidation, setNameValidation] = useState('');
    const [urlValidation, setUrlValidation] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCard] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/cards").then(res => res.text()).then(res => setCard(JSON.parse(res)));
    }, []);

    const customValidation = () => {
        let failed = false;
        const repeated = cards.find(x => x.name === name)
        if (name === '') {
            setNameValidation("empty");
            failed = true;
        } else if (repeated) {
            setNameValidation("repeated");
            failed = true;
        }
        if (url === '') {
            setUrlValidation("empty");
            failed = true;
        }
        return failed;
    }
    return (
        <div id="card-page" className="paper">
            <form className="form" >
                <label id="name">Name</label><br />
                <input type="text" id="name" value={name} onChange={(event) => { setName(event.target.value); setNameValidation('') }} /><br />
                {nameValidation && <div className="validation">{nameValidation === "empty" ? "Name cannot be empty" : "Name is already in use"}</div>}
                <label id="image">Image Link</label><br />
                <input type="text" id="image" value={url} onChange={(event) => { setUrl(event.target.value); setUrlValidation('') }} /><br />
                {urlValidation && <div className="validation"> Url cannot be empty </div>}
                <label id="description">Description</label><br />
                <input type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} /> <br /><br />
                <input type="reset" className="button" value="Clear" onClick={() => { setName(''); setUrl(''); setDescription(''); setUrlValidation(''); setNameValidation('') }} />
                <button type="button" className="button" onClick={(e) => customValidation() ? e.preventDefault() : addCard({ name: name, url: url, description: description }, setCard)}>Submit</button>
            </form>
            <table id="card-list" border="3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="image">Image</th>
                        <th>Delete </th>
                    </tr>
                </thead>
                <tbody id="card-body">
                    {cards.map((card, index) => (
                        <tr key={index}>
                            <td onClick={() => props.renderCardDescription(card.name)}>{card.name}</td>
                            <td><img alt="URL Invalid" src={card.url} onClick={() => props.renderCardDescription(card.name)} /></td>
                            <td><button type="button" onClick={() => deleteCard(setCard, card.name)}> Delete </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="clearButton">
                <button className="button" type="button" onClick={() => setCard([])}>Clear List</button>
            </div>
        </div>
    )
}

export default CardPage;