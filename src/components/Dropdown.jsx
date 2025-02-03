import normalizeCoords, { standardCoords } from "../helper/normalizeCoords";
import styles from "./components.module.css";
import { useParams } from "react-router-dom";

export default function Dropdown({targets, coordinates, dimensions, handleTargets, targetFoundArr, setTargetFoundArr}) {
  const {mapId} = useParams();

  function handleClick(e) {
    e.preventDefault();
    const targetId = e.target.id;
    const {naturalWidth, naturalHeight, loadedWidth, loadedHeight} = dimensions;
    const {normX, normY} = normalizeCoords(coordinates.x, coordinates.y, loadedWidth, loadedHeight, naturalWidth, naturalHeight);

    verifyTargetReq(targetId, normX, normY);
  }

  async function verifyTargetReq(targetId, x, y) {
    try {
      const response = await fetch(`http://localhost:8080/map/${mapId}/target/${targetId}`, {
        method: 'POST',
        body: JSON.stringify({
          id: targetId,
          x: x,
          y: y
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      const res = await response.json();

      if (response.status === 200) {
        console.log(res)

        // Check if target is found and only then delete from dropdown locally
        if (res.isFound) {
          console.log('IN VERIFY FOUND', x, y)
          console.log(targetFoundArr)

          // setTargetFoundArr((prevArr) => {
          //   console.log(prevArr); 
          //   return [
          //     ...prevArr,
          //     { x: x, y: y }
          //   ];
          // });
          handleTargets(targetId)
        }
      }
      // console.log(response.json());
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return (
    <div style={{
      position: "absolute",
      left: coordinates.x + 25,
      top: coordinates.y - 25
    }}>
      <ul className={styles.dropdownList}>
        {
          targets.map((target, index) => {
            if (!target.isFound) {
              return (
                <li key={index}>
                  <button type="submit" id={target.id} onClick={handleClick}>
                    {target.name}
                  </button>
                </li>
              )
            }
          })
        }
      </ul>
    </div>
  )
}