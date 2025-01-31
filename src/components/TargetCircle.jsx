import styles from "./components.module.css";

export default function TargetCircle({coordinates}) {
 
  return (
    <div className={styles.targetCircle} style={{
      position: "absolute",
      left: coordinates.x - 25,
      top: coordinates.y - 25
    }}>
    </div>
  )
}