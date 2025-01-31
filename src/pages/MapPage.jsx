import styles from "./pages.module.css";
import carnisolImg from "../assets/maps/carnisol.gif"
import prehistoricImg from "../assets/maps/prehistoric.gif"
import medievalImg from "../assets/maps/medieval.gif"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Dropdown from "../components/Dropdown";
import TargetCircle from "../components/TargetCircle";


export default function MapPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [dropdownPos, setDropdownPos] = useState({x: 0, y: 0});
  const [targetCircle, setTargetCircle] = useState({x: 0, y: 0});
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let {mapId} = useParams();

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`http://localhost:8080/map/${mapId}`, {
          method: "GET",
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          const mapName = res.map.name;

          if (mapName === "Carnisol") {
            setImgSrc(carnisolImg)
          } else if (mapName === "Prehistoric") {
            setImgSrc(prehistoricImg)
          } else {
            setImgSrc(medievalImg)
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  function handleClick() {
    setIsVisible(!isVisible);
    setDropdownPos(mousePosition)
    setTargetCircle(mousePosition)
  }

  function handleMouseMove(e) {
    let rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top
    });
  }

  if (loading) return <p>Loading...</p>;

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
        {isVisible && <TargetCircle coordinates={targetCircle}/>}
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