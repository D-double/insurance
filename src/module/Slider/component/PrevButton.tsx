import sliderStore from "../../../store/sliderStore";
import { backImg } from "../assets"

const PrevButton = () => {
  const {setHide} = sliderStore();
  return (
    <img src={backImg} alt="" className="slider__back" onClick={()=>{setHide(true)}}/>
  )
}

export default PrevButton