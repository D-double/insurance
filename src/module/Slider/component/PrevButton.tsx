import { backImg } from "../assets"
import { useSwiper } from 'swiper/react';

const PrevButton = () => {
  const swiper = useSwiper();
  return (
    <img src={backImg} alt="" className="slider__back" onClick={()=>{swiper.slidePrev()}}/>
  )
}

export default PrevButton