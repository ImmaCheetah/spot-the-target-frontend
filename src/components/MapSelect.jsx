import MapCard from "./MapCard"
import map1 from "../assets/carnisol.gif"
import map2 from "../assets/prehistoric.gif"
import map3 from "../assets/medieval.gif"

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