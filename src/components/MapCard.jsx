import styles from "./components.module.css";

export default function MapCard({title, imgSrc}) {

  return (
    <div>
      <p>{title}</p>
      <img src={imgSrc} alt="" />
      <button className={styles.playBtn}>Play</button>
    </div>
  )
}