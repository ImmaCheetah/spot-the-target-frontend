import carnisolImg from "../assets/maps/carnisol.gif"
import prehistoricImg from "../assets/maps/prehistoric.gif"
import medievalImg from "../assets/maps/medieval.gif"

export default function getData() {
  const maps = {
  "carnisol": {
      "imgSrc": carnisolImg,
      "targets": {
        "bear": {
          "imgSrc": "../assets/targets/bear.png"
        },
        "batman": {
          "imgSrc": "../assets/targets/batman.png"
        },
        "dolphin": {
          "imgSrc": "../assets/targets/dolphin.png"
        }
      }
    },
    "prehistoric": {
      "imgSrc": prehistoricImg,
      "targets": {
        "bone": {
          "imgSrc": "../assets/targets/bone.png"
        },
        "man": {
          "imgSrc": "../assets/targets/man.png"
        },
        "diego": {
          "imgSrc": "../assets/targets/diego.png"
        }
      }
    },
    "medieval": {
      "imgSrc": medievalImg,
      "targets": {
        "knight": {
          "imgSrc": "../assets/targets/knight.png"
        },
        "lionel": {
          "imgSrc": "../assets/targets/lionel.png"
        },
        "skyrim": {
          "imgSrc": "../assets/targets/skyrim.png"
        }
      }
    }
  }

  return maps;
}

