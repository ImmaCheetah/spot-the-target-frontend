import styles from "./pages.module.css";
import carnisolImg from "../assets/maps/carnisol.gif"
import prehistoricImg from "../assets/maps/prehistoric.gif"
import medievalImg from "../assets/maps/medieval.gif"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Dropdown from "../components/Dropdown";
import TargetCircle from "../components/TargetCircle";
import { standardCoords } from "../helper/normalizeCoords";
import TargetMarker from "../components/TargetMarker";
import Stopwatch from "../components/Stopwatch";



export default function MapPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [clickedPos, setClickedPos] = useState({x: 0, y: 0});
  const [dimensions, setDimensions] = useState({ naturalWidth: 0, naturalHeight: 0, loadedWidth: 0, loadedHeight: 0 });
  const [targets, setTargets] = useState([]);
  const [foundTargets, setFoundTargets] = useState([]);
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let {mapId} = useParams();

  useEffect(() => {
    let controller = new AbortController();
    console.log(controller)
    const data = async () => {
      try {
        const response = await fetch(`http://localhost:8080/map/${mapId}`, {
          method: "GET",
        });

        const timeResponse = await fetch(`http://localhost:8080/map/${mapId}`, {
          method: "POST",
          signal: controller.signal
        });


        if (response.status >= 400 || timeResponse.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          console.log(res)
          const timeRes = await timeResponse.json();
          console.log('START TIME REQUEST', timeRes)
          const mapName = res.map.name;
          const targets = res.map.targets;

          setTargets(targets)

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
    return () => controller?.abort();
  }, []);

  // Create a new array that calculates the reverse normalized coordinates of each target
  // Set that in a state variable and update based on target or dimension change
  useEffect(() => {
    const foundTargetsList = targets.map((target) => {
      const {naturalWidth, naturalHeight, loadedWidth, loadedHeight} = dimensions;
      const {standardX, standardY} = standardCoords(target.coordinates.x, target.coordinates.y, naturalWidth, naturalHeight, loadedWidth, loadedHeight);

      return {x: standardX, y: standardY, isFound: target.isFound}
    })

    setFoundTargets(foundTargetsList)
  }, [targets, dimensions])

  function handleClick() {
    setIsVisible(!isVisible);
    setClickedPos(mousePosition)
  }

  function handleMouseMove(e) {
    let rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top
    });
  }

  // This is to update dropdown state locally after finding a target instead of making a new request each time
  function handleTargets(targetId) {
    setTargets(
      targets.filter((target) => {
        return target.id !== targetId;
      })
    )

    const newTargets = [...targets];
    const target = newTargets.find(
      t => t.id === targetId
    )
    target.isFound = true;
    setTargets(newTargets);
    setIsVisible(false)
  }

  function handleImageLoad(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const { naturalHeight, naturalWidth } = e.target;
   
    setDimensions({ naturalWidth, naturalHeight, loadedWidth: rect.width, loadedHeight: rect.height });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div >
      <h2>Map page</h2>
      <Stopwatch />
      <div className={styles.imgContainer}>
        {isVisible && 
        <Dropdown 
          coordinates={clickedPos} 
          targets={targets} 
          dimensions={dimensions}
          handleTargets={handleTargets}
        />}
        {isVisible && <TargetCircle coordinates={clickedPos}/>}
        <TargetMarker targets={foundTargets} />
        <img
          src={imgSrc}
          alt=""
          className={styles.mapImg}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  )
}