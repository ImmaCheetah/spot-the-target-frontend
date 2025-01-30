import styles from "./components.module.css";
import { useParams } from "react-router-dom";


export default function TargetCircle({coordinates}) {


  function handleClick(e) {
    
    
  }

  
  return (
    <div className={styles.targetCircle} style={{
      position: "absolute",
      left: coordinates.x - 25,
      top: coordinates.y - 25
    }}>
    </div>
  )
}