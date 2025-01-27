import { Link } from "react-router-dom";
import styles from "./components.module.css";


export default function MapCard({id, title, imgSrc}) {

  return (
    <div>
      <p>{title}</p>
      <img src={imgSrc} alt="" className={styles.cardImg}/>
      {/* <button className={styles.playBtn}>Play</button> */}
      <Link to={`map/${id}`}>Play</Link>
    </div>
  )
}