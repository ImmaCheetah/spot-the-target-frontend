import { Link } from "react-router-dom";
import styles from "./components.module.css";

export default function MapCard({id, title, imgSrc}) {
  return (
    <div>
      <p className={styles.mapTitle}>{title}</p>
      <img src={imgSrc} alt="" className={styles.cardImg}/>
      <Link to={`map/${id}`} className={styles.playBtn}>Play</Link>
    </div>
  )
}