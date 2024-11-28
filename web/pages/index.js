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
        {/*počet zvířat v ohradě*/}
        Přehled osob
      </h1>
      <p className="text">
          Počet lidí: {pocet}        
      </p>
      <p className="text">
          Posledni lidi: {pocet}        
      </p>
    <a className="building" href="">
      <div className="inner-building"><a className="text-build">ds</a></div>
    </a>
    <a className="building" href="">
      <div className="inner-building">ahoj</div>
    </a>
    <a className="building" href="">
      <div className="inner-building"><a className="text-build">ds</a></div>
    </a>
    </>
  );
}