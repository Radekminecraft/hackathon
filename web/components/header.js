import React from "react";
import styles from "@/styles/entry.module.css"

function Header(){
    return(
        <header className={styles.header}>
            <a className="title" href=".">
                css
            </a>
            <div className={styles.header_items}>
                <a className={styles.header_item} href="">A</a>
                <a className={styles.header_item} href="">B</a>
                <a className={styles.header_item} href="">C</a>
            </div>
        </header>
    );
}
export default Header;