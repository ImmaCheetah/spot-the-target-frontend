import MapCard from "./MapCard"
import map1 from "../assets/carnisol.gif"
import map2 from "../assets/prehistoric.gif"
import map3 from "../assets/medieval.gif"

export default function MapSelect() {

  return (
    <>
      <div>
        <MapCard title="Carnisol" imgSrc={map1} />
        <MapCard title="Prehistoric" imgSrc={map2} />
        <MapCard title="Medieval" imgSrc={map3} />
      </div>
    </>
  )
}