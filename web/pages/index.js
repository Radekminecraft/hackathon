import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";


export default function Home() {
  const [pocet, setPocet] = useState(0)
  useEffect(()=>{
    setPocet(pocet+1)
  },[])
  return (
    <>
      <h1 className="text-black text-6xl text-center m-4 font-mono">
        {/*Počítaní lidí v panelovém domě*/}
        projekt name
      </h1>
      <p className="text-red-600">
          Počet lidí: {pocet}        
      </p>
      <p className="text-red-600">
          Posledni lidi: {pocet}        
      </p>
      <div>
        <button class="building-index-button">Budova 1</button>
        <br></br>
        <button class="building-index-button">Budova 2</button>
        <br></br>

      </div>

    </>
  );
}
