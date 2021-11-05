import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <h1>LI Generator</h1>
            <a className="lorem-link" target="_new" href="https://www.lipsum.com/">Click for more Lorem Text</a>
        </div>
    )
}

export default Header