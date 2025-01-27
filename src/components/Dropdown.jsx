
export default function Dropdown({targets, coordinates}) {

  let mockTargets = [
    {
      name: 'target1'
    },
    {
      name: 'target2'
    },
    {
      name: 'target3'
    }
  ]

  return (
    <form style={{
      position: "absolute",
      left: coordinates.x + 50,
      top: coordinates.y
    }}>
      <ul>
        {
          mockTargets.map((target, index) => {
            return (
              <li key={index}><button>{target.name}</button></li>
            )
          })
        }
      </ul>
    </form>
  )
}