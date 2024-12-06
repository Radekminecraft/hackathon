import Footer from "@/components/footer";
import Header from "@/components/header";
import react from "react";
export default function Galery() {
    return(
        <>
        <Header></Header>
        <div className="center">
            <img src="/elephant1.jpeg" className="picture"></img>
            <img src="/elephant2.jpeg" className="picture"></img>
            <img src="/elephant3.jpg" className="picture"></img>
            <img src="/hippo1.jpeg" className="picture"></img>
            <img src="/hippo2.jpeg" className="picture"></img>
            <img src="/hippo3.jpeg" className="picture"></img>
            <img src="/lion1.jpeg" className="picture"></img>
            <img src="/lion2.jpg" className="picture"></img>
            <img src="/lion3.jpg" className="picture"></img>
            <img src="/tiger1.jpeg" className="picture"></img>
            <img src="/tiger2.jpeg" className="picture"></img>
            <img src="/tiger3.jpeg" className="picture"></img>

        </div>
        <Footer></Footer>
        </>
    )
}