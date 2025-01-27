import styles from "./pages.module.css";
import { useParams } from "react-router-dom"
import map1 from "../assets/maps/carnisol.gif"
import map2 from "../assets/maps/prehistoric.gif"
import map3 from "../assets/maps/medieval.gif"
import { useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import Dropdown from "../components/Dropdown";


export default function MapPage() {
  let {mapId} = useParams();
  let imgSrc;

  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({})
  
  if (mapId === '1') {
    imgSrc = map1
  } else if (mapId === '2') {
    imgSrc = map2
  } else {
    imgSrc = map3
  }

  console.log(mousePosition);

  function handleClick(e) {
    setIsVisible(!isVisible);
    setDropdownPos(mousePosition)
  }


  return (
    <div onClick={handleClick}>
      <h2>Map page</h2>
      <p>
        Your cursor position:
        <br />
        {JSON.stringify(mousePosition)}
      </p>
      {isVisible && <Dropdown coordinates={dropdownPos}/>}
      <img src={imgSrc} alt="" className={styles.mapImg}/>
    </div>
  )
}