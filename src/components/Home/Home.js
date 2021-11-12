import React, { useState } from 'react'
import JsonData from '../../data.json'
import useLocalStorage from '../../hooks/useLocalStorage'
import './Home.css'

const Home = () => {
    const [paragraph, setParagraph] = useLocalStorage("text", [])
    const [count, setCount] = useLocalStorage("count", "");
    const [render, setRender] = useState(true);
    const [clear, setClear] = useState(false);

    const generate = (e) => {
        e.preventDefault();
        let textCount = parseInt(count);
        console.log(textCount, "count")
        if (count > 0 && count <= 20) {
            setRender(true)
            setClear(false)
            setParagraph(JsonData.slice(0, count))
            console.log(paragraph)
        } else {
            console.log("hello")
            setRender(false)
        }
    }

    const clearData = (e) => {
        e.preventDefault();
        setClear(true)
        setCount(0);
        setParagraph([]);

    }

    const copy = () => {
        if (count > 0) {
            // get value form html
            const copyText = document.getElementById('copy')

            // Create a fake element.
            const fakeTest = document.createElement("textarea")

            // Set the value to the fake element.
            fakeTest.innerText = copyText.innerText;
            document.body.appendChild(fakeTest);

            // Select the element.
            fakeTest.select();

            // Copy the value and remove the element.
            document.execCommand("copy")
            document.body.removeChild(fakeTest)
            alert("copied")
        } else {
            alert("Oops! No items to copy")
        }

    }

    return (
        <div className="container">
            <h1>Get a Lorem Text Instantly</h1>
            <form className="lorem-ipsum" onSubmit={generate}>
                <label htmlFor="lorem">Paragraphs Needed : </label>
                <input className="input-box" name="lorem" type="number" id="num" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20"></input>
                <button className="generate-btn" type="submit">Generate</button>
                {render && !clear ?
                    <article id="copy">
                        {paragraph.map((item, idx) => {
                            return <p className="lorem-text" key={idx}>{item}</p>
                        })}
                    </article> : <h3>Please enter numbers between 1 to 20</h3>}
            </form>
            <button type="button" className="clear-btn" onClick={clearData}>Clear</button>
            <button onClick={copy} className="clipboard-btn">Copy To Clipboard</button>
        </div>
    );
}

export default Home