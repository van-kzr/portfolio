
import { easeIn } from "framer-motion";


export const elementsHome = [
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "40px",
      bottom: "-28px",
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-80px",
      bottom: "64px",
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-40px",
      bottom: "5px",
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-60px",
      bottom: "80px",
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-30px",
      bottom: "65px",
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  ////////////////////////////////////////////////////////////////
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "231px",
      bottom: "-100px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "84px",
      right: "216px",
      bottom: "-25px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "189px",
      bottom: "-37px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "322px",
      bottom: "-140px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "315px",
      bottom: "-110px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "365px",
      bottom: "-140px",
      opacity: .7,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "245px",
      right: "123px",
      bottom: "130px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "130px",
      right: "113px",
      bottom: "209px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-1px",
      bottom: "268px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "-40px",
      bottom: "250px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "10px",
      bottom: "198px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      height: "230px",
      right: "30px",
      bottom: "158px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
  {
    className: "absolute w-[3px] max-w-[3px] min-lg:w-[2px]",
    style: {
      
      height: "230px",
      right: "-80px",
      bottom: "240px",
      opacity: .4,
      filter: "blur(1px)"
    },
    transition: { type: "tween", duration: 0.7, ease: easeIn },
  },
];



export const elementsByPath: Record<string, typeof elementsHome> = {
  "/": elementsHome,
};