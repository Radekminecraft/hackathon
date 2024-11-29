import React from "react";
import styles from "@/styles/entry.module.css"

function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.flex}>
            <img src="/rab.svg" className="img"></img>
<<<<<<< Updated upstream
            <a className={styles.title} href="./">
=======
            <a className={styles.title} href="..">
>>>>>>> Stashed changes
                Trackimal
            </a>
            </div>
            <div className={styles.header_items}>
                <a className={styles.header_item} href="..">Home</a>
                <a className={styles.header_item} href="/about">About Zoo</a>
                <a className={styles.header_item} href="/solutions">Pricelist</a>
                <a className={styles.header_item} href="..">Exhibitions</a>
                <a className={styles.header_item} href="galery">Gallery</a>
            </div>
        </header>
    );
}
export default Header;
