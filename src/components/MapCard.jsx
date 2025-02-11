import { Link } from "react-router-dom";
import styles from "./components.module.css";

export default function MapCard({id, title, imgSrc, origin}) {
 
  return (
    <div>
      <p className={styles.mapTitle}>{title}</p>
      <img src={imgSrc} alt="" className={styles.cardImg}/>
      {
        origin === 'home' ? 
        <Link to={`map/${id}`} className={styles.playBtn}>Play</Link>
        :
        <Link to={`/leaderboard/map/${id}`} className={styles.playBtn}>Leaderboard</Link>
      }
      
    </div>
  )
}