import Header from "@/components/header";
import { useEffect, useState } from "react";


export default function Home() {
  const [pocet, setPocet] = useState(0)
  useEffect(()=>{
    setPocet(pocet+1)
  },[])
  return (
    <>
    <Header></Header>
      <h1 className="text-black text-6xl text-center m-4 font-mono">
        {/*Počítaní lidí v panelovém domě*/}
        Přehled osob
      </h1>
      <p className="text">
          Počet lidí: {pocet}        
      </p>
      <p className="text">
          Posledni lidi: {pocet}        
      </p>
      <a class="bulding-overview-a" href="">
        <div class="building-overview-div">
          <p>Budova 1</p>
        </div>
        <br></br>
        <div class="building-overview-div">
          <p>Budova 2</p>
        </div>
        <br></br>
        <div class="building-overview-div">
          <p>Budova 3</p>
        </div>
      </a>
    </>
  );
}