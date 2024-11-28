import React from "react";
import styles from "@/styles/entry.module.css"

function Header(){
    return(
        <header className={styles.header}>
            <a className="title" href=".">
                
            </a>
            <div className={styles.header_items}>
                <a className={styles.header_item} href="">About Zoo</a>
                <a className={styles.header_item} href="">Pricelist</a>
                <a className={styles.header_item} href="">Exhibitions</a>
                <a className={styles.header_item} href="">Galery</a>
            </div>
        </header>
    );
}
export default Header;