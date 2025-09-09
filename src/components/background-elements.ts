import { easeIn } from "framer-motion";

export const elements = [

  {
    className: "absolute",
    style: { top: "-25vh", left: "10vh", width: "1vh", height: "90vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute",
    style: { top: "-0vh", left: "10vh", width: "1vh", height: "30vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    className: "absolute",
    style: { top: "45vh", left: "5vh", width: "1vh", height: "50vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute",
    style: { top: "54vh", left: "0vh", width: "1vh", height: "30vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    className: "absolute",
    style: { bottom: "-20vh", left: "40vh", width: "1vh", height: "70vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute",
    style: { bottom: "-10vh", left: "44vh", width: "1vh", height: "30vh" },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
];
