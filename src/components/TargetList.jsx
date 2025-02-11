import styles from "./components.module.css";
import testImg from "../assets/maps/targets/batman.png"
export default function TargetList({targets}) {

  console.log('targets',targets)
  return (
    <div className={styles.targetsContainer}>
      {targets === !undefined && targets.map((target, index) => {
        return (
          <div key={index}>
            <p>oi</p>
            <img src={target.imgSrc} alt="" className={styles.targetImg}/>
          </div>
      )
      })}
      <img src={testImg} alt="" />
    </div>
  )
}