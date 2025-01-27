import MapCard from "./MapCard"
import map1 from "../assets/maps/carnisol.gif"
import map2 from "../assets/maps/prehistoric.gif"
import map3 from "../assets/maps/medieval.gif"

export default function MapSelect() {

  return (
    <>
      <div>
        <MapCard id="1" title="Carnisol" imgSrc={map1} />
        <MapCard id="2" title="Prehistoric" imgSrc={map2} />
        <MapCard id="3" title="Medieval" imgSrc={map3} />
      </div>
    </>
  )
}