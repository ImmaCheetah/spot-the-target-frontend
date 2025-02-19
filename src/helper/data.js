import carnisolImg from "../assets/maps/carnisol.gif";
import prehistoricImg from "../assets/maps/prehistoric.gif";
import medievalImg from "../assets/maps/medieval.gif";
import bearImg from "../assets/maps/targets/bear.png";
import batmanImg from "../assets/maps/targets/batman.png";
import dolphinImg from "../assets/maps/targets/dolphin.png";
import boneImg from "../assets/maps/targets/bone.png";
import manImg from "../assets/maps/targets/man.png";
import diegoImg from "../assets/maps/targets/diego.png";
import knightImg from "../assets/maps/targets/knight.png";
import lionelImg from "../assets/maps/targets/lionel.png";
import skyrimImg from "../assets/maps/targets/skyrim.png";

export default function getData() {
  const maps = {
    carnisol: {
      imgSrc: carnisolImg,
      targets: [
        {
          name: "Bear",
          imgSrc: bearImg,
        },
        {
          name: "Batman",
          imgSrc: batmanImg,
        },
        {
          name: "Dolphin",
          imgSrc: dolphinImg,
        },
      ],
    },
    prehistoric: {
      imgSrc: prehistoricImg,
      targets: [
        {
          name: "Bone",
          imgSrc: boneImg,
        },
        {
          name: "Knife Man",
          imgSrc: manImg,
        },
        {
          name: "Diego",
          imgSrc: diegoImg,
        },
      ],
    },
    medieval: {
      imgSrc: medievalImg,
      targets: [
        {
          name: "Knight",
          imgSrc: knightImg,
        },
        {
          name: "Lionel",
          imgSrc: lionelImg,
        },
        {
          name: "Dovahkiin",
          imgSrc: skyrimImg,
        },
      ],
    },
  };

  return maps;
}
