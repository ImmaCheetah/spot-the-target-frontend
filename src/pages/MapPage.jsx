import styles from "./pages.module.css";
import { useParams } from "react-router-dom"
import map1 from "../assets/maps/carnisol.gif"
import map2 from "../assets/maps/prehistoric.gif"
import map3 from "../assets/maps/medieval.gif"
import { useState } from "react";
import Dropdown from "../components/Dropdown";


export default function MapPage() {
  let {mapId} = useParams();
  let imgSrc;

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [dropdownPos, setDropdownPos] = useState({x: 0, y: 0});
  
  if (mapId === '1') {
    imgSrc = map1
  } else if (mapId === '2') {
    imgSrc = map2
  } else {
    imgSrc = map3
  }

  function handleClick(e) {
    setIsVisible(!isVisible);
    setDropdownPos(mousePosition)
  }

  function handleMouseMove(e) {
    let rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top
    });
  }

  return (
    <div >
      <h2>Map page</h2>
      <p>
        Your cursor position:
        <br />
        {JSON.stringify(mousePosition)}
      </p>

      <div className={styles.imgContainer}>
        {isVisible && <Dropdown coordinates={dropdownPos}/>}
        <img
          src={imgSrc}
          alt=""
          className={styles.mapImg}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  )
}