import styles from "./components.module.css";

export default function TargetMarker({ targets }) {
  return (
    <div>
      {targets.map((target, index) => {
        if (target.isFound) {
          return (
            <div
              key={index}
              className={styles.targetFoundX}
              style={{
                position: "absolute",
                left: target.x - 20,
                top: target.y - 20,
              }}
            >
              X
            </div>
          );
        }
      })}
    </div>
  );
}
