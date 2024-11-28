import React from "react";
import styles from "@/styles/entry.module.css"

function Header(){
    return(
        <header className={styles.header}>
            <a className="title" href=".">
                
            </a>
            <div className={styles.header_items}>
                <a className={styles.header_item} href="">O Zoo</a>
                <a className={styles.header_item} href="">Ceník</a>
                <a className={styles.header_item} href="">Výběhy</a>
                <a className={styles.header_item} href="">Galerie</a>
            </div>
        </header>
    );
}
export default Header;