import React from "react";

function Header(){
    return(
        <header className="header">
            <a className="title" href=".">
                css
            </a>
            <div className="header-items">
                <a className="header-item" href="">A</a>
                <a className="header-item" href="">B</a>
                <a className="header-item" href="">C</a>
            </div>
        </header>
    );
}
export default Header;