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
                <img src="/phone.svg" className="imgi"></img><a className={styles.contacti}>+420 606 659 995</a>
                <img src="/mail.svg" className="imgi"></img><a className={styles.contacti}>trackimo@company.com</a>
            </div>
            <div className={styles.links}>
                <img src="/facebook.svg" className={styles.link}></img>
                <a href="https://www.instagram.com/lukas_odehnal/"><img src="/instagram.svg" className={styles.link}></img></a>
                <a href="https://github.com/patricinocz"><img src="/github.svg" className={styles.link}></img></a>
                <a href="https://www.youtube.com"><img src="/youtube.svg" className={styles.link}></img></a>
                <img src="/tiktok.svg" className={styles.link}></img>
                <img src="/twitter-x.svg" className={styles.link}></img>
                <img src="/linkedin.svg" className={styles.link}></img>
            </div>

        </footer>
        </>
    )
}
export default Footer;