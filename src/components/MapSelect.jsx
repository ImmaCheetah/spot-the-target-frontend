import styles from "./components.module.css";
import MapCard from "./MapCard";
import map1 from "../assets/maps/carnisol.gif";
import map2 from "../assets/maps/prehistoric.gif";
import map3 from "../assets/maps/medieval.gif";
import { useState } from "react";

export default function MapSelect({ origin }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className={styles.selectContainer}>
        <MapCard
          id="e856e9ab-d110-4456-96eb-ccfe54176954"
          title="Carnisol"
          imgSrc={map1}
          origin={origin}
          isSelected={selectedId === 1}
          onSelect={() => setSelectedId(1)}
        />
        <MapCard
          id="b6c623b5-5778-40a9-959a-c2800877b96b"
          title="Prehistoric"
          imgSrc={map2}
          origin={origin}
          isSelected={selectedId === 2}
          onSelect={() => setSelectedId(2)}
        />
        <MapCard
          id="b2d1cf99-1068-4259-98d6-06e0eebb178b"
          title="Medieval"
          imgSrc={map3}
          origin={origin}
          isSelected={selectedId === 3}
          onSelect={() => setSelectedId(3)}
        />
      </div>
    </>
  );
}
