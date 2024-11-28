import styles from "@/styles/animal.module.css";
import Header from "@/components/header";
import React from "react";


export default function Lions() {
    

    return (
        <>
        <Header></Header>
        <h1>Lev img</h1>
        <h1>Informace</h1>
        <div className={styles.animal_grid_container}>
            <div id={styles.item1} className={styles.animal_div}>
                <h2  className={styles.animal_h2}>Simba</h2>
                <p><strong>Age:</strong> 8 years</p>
                <p><strong>Arrived at the Zoo:</strong> 6 years ago</p>
                <p>Simba arrived as a cub, quickly becoming a favorite among both visitors and staff with his playful personality. As he grew, Simba developed into a strong and commanding leader within his pride. His majestic presence and confident nature make him a central figure in the zoo’s African savanna exhibit, where he enjoys basking in the sun and maintaining harmony among the other lions. His journey from a curious cub to a wise and powerful lion has been a remarkable transformation, and he now plays an essential role in the pride's social structure.</p>
                <img id={styles.img1} src="/lion1.jpeg"></img>
            </div>


            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Kovu</h2>
                <p><strong>Age:</strong> 6 years</p>
                <p><strong>Arrived at the Zoo:</strong> 4 years ago</p>
                <p>Kovu joined the zoo after being rescued from a nearby sanctuary. Raised in a different pride, Kovu faced some difficulties adjusting to his new home, but his quiet strength and steady nature helped him quickly integrate into his new environment. Known for his calm demeanor, Kovu has earned respect from his fellow lions and zoo staff alike. Although he is more reserved than others, Kovu’s presence is vital to the pride, and his thoughtful approach to leadership has made him an important figure in the zoo.</p>
                <img id={styles.img2} src="/lion2.jpg"></img>
            </div>

            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Nala</h2>
                <p><strong>Age:</strong> 7 years</p>
                <p><strong>Arrived at the Zoo:</strong> 5 years ago</p>
                <p>Nala is a sharp and resilient lioness who adapted quickly to her new surroundings. She is a skilled hunter and a strong presence within the pride. Nala’s leadership qualities and nurturing nature have made her an essential member of the group, ensuring the pride's success and well-being. She continues to guide the younger lions, providing them with the wisdom and strength they need to thrive in their environment.</p>
                <img id={styles.img3} src="/lion3.jpg"></img>
            </div>
        </div>

        <h1>Statistika</h1>
        <h1>Harmonogram</h1>
        </>
    )
}
