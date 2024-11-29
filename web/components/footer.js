import React from "react";
import styles from "@/styles/entry.module.css"
function Footer() {
    return(
        <>
        <footer className={styles.footer}>
            <div className={styles.inner_footer}>
                <img src="/peti.svg" className="img"></img>
            <a className={styles.footer_title}>Trackimal</a>
            <img src="/rabi.svg" className="img"></img>
            </div>
            <div className={styles.contacts}>
                <a className={styles.contact}>+420 606 659 995</a>
                <a className={styles.contact}>trackimo@company.com</a>
            </div>
            <div className={styles.links}>
                <img src="/facebook.svg" className={styles.link}></img>
                <img src="/instagram.svg" className={styles.link}></img>
                <img src="/github.svg" className={styles.link}></img>
                <img src="/youtube.svg" className={styles.link}></img>
                <img src="/tiktok.svg" className={styles.link}></img>
                <img src="/twitter-x.svg" className={styles.link}></img>
                <img src="/linkedin.svg" className={styles.link}></img>
            </div>

        </footer>
        </>
    )
}
export default Footer;