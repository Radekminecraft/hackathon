import Footer from "@/components/footer";
import Header from "@/components/header";
import PetImage from "../../web/public/pet.png"
import { useEffect, useState } from "react";


export default function Home() {
  const [pocet, setPocet] = useState(0)
  useEffect(()=>{
    setPocet(pocet+1)
  },[])
  function Dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  return (
    <>
    <Header></Header>
    <div className="main-title">
      <img src="/pet.png" className="img"></img>
      <h1 className="title">Výběhy</h1>
      <img src="/arrow.png" id="arrow" onClick={Dropdown}></img>
    </div>
    <a className="inner-building" href="">
      <div className="buildingi">
        <p className="house-text">lvi</p>
        <p className="build-text">Počet zvířat: {pocet}</p>
      </div>
    </a>
    <a className="inner-building" href="">
      <div className="building">
        <p className="house-text">krokodyli</p>
        <p className="build-text">Počet zvířat: {pocet}</p>
      </div>
    </a>
    <a className="inner-building" href="">
      <div className="building">
        <p className="house-text">hadi</p>
        <p className="build-text">Počet zvířat: {pocet}</p>
      </div>
    </a>
    <Footer></Footer>
    </>
  );
}