<<<<<<< Updated upstream
=======
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
      <p className="text">
          Počet lidí: {pocet}        
      </p>
      <p className="text">
          Posledni lidi: {pocet}        
      </p>
      <a href="entry_1">
        <div>
          css
        </div>
      </a>
    </>
  );
}
>>>>>>> Stashed changes
