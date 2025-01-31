import styles from "./components.module.css";
import { useParams } from "react-router-dom";


export default function Dropdown({targets, coordinates}) {
  const {mapId} = useParams();

  function handleClick(e) {
    e.preventDefault();

    const targetId = e.target.id;
    console.log(targetId, coordinates.x, coordinates.y)

    verifyTargetReq(targetId, coordinates.x, coordinates.y)
    
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
            return (
              <li key={index}>
                <button type="submit" id={target.id} onClick={handleClick}>
                  {target.name}
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}