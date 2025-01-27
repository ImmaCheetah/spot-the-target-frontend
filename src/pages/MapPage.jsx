import styles from "./pages.module.css";
import { useParams } from "react-router-dom"
import map1 from "../assets/carnisol.gif"
import map2 from "../assets/prehistoric.gif"
import map3 from "../assets/medieval.gif"

export default function MapPage() {
  let {mapId} = useParams();
  let imgSrc;

  console.log(mapId);
  if (mapId === '1') {
    imgSrc = map1
  } else if (mapId === '2') {
    imgSrc = map2
  } else {
    imgSrc = map3
  }

  return (
    <>
      <h2>Map page</h2>
      <img src={imgSrc} alt="" className={styles.mapImg}/>
    </>
  )
}