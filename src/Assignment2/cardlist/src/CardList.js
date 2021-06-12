import { useState } from "react";
import './App.css';

const jsonList = JSON.stringify([{ "name": "cat", "description": "fluffy white cat", "url": "https://www.thesprucepets.com/thmb/wWZ_Mympqnlq6hUbrnK6p2wIERk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg" },
{ "name": "black dog", "description": "3000 dollar dog", "url": "https://www.sritch.com/images/dogs-vancouver-20141108-0574.jpg" }]);

function CardPage(props) {
    const [nameValidation, setNameValidation] = useState('');
    const [urlValidation, setUrlValidation] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCard] = useState(JSON.parse(jsonList));

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
                <button type="button" className="button" onClick={(e) => customValidation() ? e.preventDefault() : setCard(cards.concat([{ name: name, url: url, description: description }]))}>Submit</button>
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
                            <td onClick={() => props.renderCardDescription(card)}>{card.name}</td>
                            <td><img alt="URL Invalid" src={card.url} onClick={() => props.renderCardDescription(card)} /></td>
                            <td><button type="button" onClick={() => setCard(cards.filter(c => c.name !== card.name))}> Delete </button></td>
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