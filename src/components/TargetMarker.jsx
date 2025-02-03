import { useState } from "react";
import { standardCoords } from "../helper/normalizeCoords";
import styles from "./components.module.css";

export default function TargetMarker({targets, dimensions}) {
  const {naturalWidth, naturalHeight, loadedWidth, loadedHeight} = dimensions;
  const [targetFoundArr1, setTargetFoundArr1] = useState([]);
  console.log(targets)

  // targets.map((target) => {
  //   const {standardX, standardY} = standardCoords(target.coordinates.x, target.coordinates.y, loadedWidth, loadedHeight, naturalWidth, naturalHeight);

  //   return {x: standardX, y: standardY}
  // })
  // console.log(targetFoundArr1)
  // setTargetFoundArr1(targetFoundArr1)
 
  return (
    <div>
      {
        targets.map((target) => {
          return (
            <div key={target.id} className={styles.targetFoundX} style={{
              position: "absolute",
              left: target.x,
              top: target.y 
            }}>X</div>
          )
        })
      }
    </div>
  )
}