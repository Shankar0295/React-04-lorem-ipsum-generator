import React, { useState, useEffect } from 'react'
import './Home.css'

const Home = () => {
    let textCount;
    const url = 'https://lorem-server-app.herokuapp.com/loremipsum_text'
    const [paragraph, setParagraph] = useState([])
    const [count, setCount] = useState(1);
    const [render, setRender] = useState(true)
    const [clear, setClear] = useState(false)

    const fetchText = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            localStorage.setItem("initialState", JSON.stringify(data))
            textCount = parseInt(localStorage.getItem("getCount"))
            setCount(textCount)
            setParagraph(JSON.parse(localStorage.getItem("initialState")).slice(0, textCount))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchText();
    }, [])

    const generate = (e) => {
        e.preventDefault();
        textCount = count;
        if (count > 0 && count <= 20) {
            setRender(true)
            setClear(false)
            let getData = JSON.parse(localStorage.getItem("initialState"))
            localStorage.setItem("getCount", textCount)
            setParagraph(getData.slice(0, textCount))

        } else {
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
        // await navigator.clipboard.writeText(paragraph.text)
        // console.log("copied")
        const copyText = document.getElementById('copy')
        const fakeTest = document.createElement("textarea")
        fakeTest.innerText = copyText.innerText;
        document.body.appendChild(fakeTest);
        fakeTest.select();
        document.execCommand("copy")
        document.body.removeChild(fakeTest)
        alert("copied")
    }

    return (
        <div className="container">
            <h1>Get a Lorem Text Instantly</h1>
            <form className="lorem-ipsum" onSubmit={generate}>
                <label htmlFor="lorem">Paragraphs Needed : </label>
                <input className="input-box" name="lorem" type="text" value={count} onChange={(e) => setCount(e.target.value)} maxLength="2"></input>
                <button className="generate-btn" type="submit">Generate</button>
            </form>
            {render && !clear ?
                <article id="copy">
                    {paragraph.slice(0, textCount).map((item) => {
                        return <p className="lorem-text" key={item.id}>{item.text}</p>
                    })}
                </article> : <h3>Please enter numbers between 1 to 20</h3>}
            <button type="button" className="clear-btn" onClick={clearData}>Clear</button>
            <button onClick={copy} className="clipboard-btn">Copy To Clipboard</button>
        </div>
    );
}

export default Home;
