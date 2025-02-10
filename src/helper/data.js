import carnisolImg from "../assets/maps/carnisol.gif"
import prehistoricImg from "../assets/maps/prehistoric.gif"
import medievalImg from "../assets/maps/medieval.gif"
import bearImg from "../assets/maps/targets/bear.png"
import batmanImg from "../assets/maps/targets/batman.png"
import dolphinImg from "../assets/maps/targets/dolphin.png"
import boneImg from "../assets/maps/targets/bone.png"
import manImg from "../assets/maps/targets/man.png"
import diegoImg from "../assets/maps/targets/diego.png"
import knightImg from "../assets/maps/targets/knight.png"
import lionelImg from "../assets/maps/targets/lionel.png"
import skyrimImg from "../assets/maps/targets/skyrim.png"

export default function getData() {
  const maps = {
  "carnisol": {
      "imgSrc": carnisolImg,
      "targets": {
        "bear": {
          "imgSrc": bearImg
        },
        "batman": {
          "imgSrc": batmanImg
        },
        "dolphin": {
          "imgSrc": dolphinImg
        }
      }
    },
    "prehistoric": {
      "imgSrc": prehistoricImg,
      "targets": [
        {
          "imgSrc": boneImg
        },
        {
          "imgSrc": manImg
        },
        {
          "imgSrc": diegoImg
        }
      ]
    },
    "medieval": {
      "imgSrc": medievalImg,
      "targets": {
        "knight": {
          "imgSrc": knightImg
        },
        "lionel": {
          "imgSrc": lionelImg
        },
        "skyrim": {
          "imgSrc": skyrimImg
        }
      }
    }
  }

  return maps;
}

