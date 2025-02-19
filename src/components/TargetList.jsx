import styles from "./components.module.css";

export default function TargetList({ targets }) {
  return (
    <div className={styles.targetsContainer}>
      {targets !== undefined &&
        targets.map((target, index) => {
          return (
            <div key={index} className={styles.targets}>
              <img src={target.imgSrc} alt="" className={styles.targetImg} />
              <p className={styles.targetName}>{target.name}</p>
            </div>
          );
        })}
    </div>
  );
}
