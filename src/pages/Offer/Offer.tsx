import s from './offer.module.scss'
import Slider from '../../module/Slider/Slider'
import YourData from '../../module/YourData/YourData'
import sliderStore from '../../store/sliderStore'

const Offer = () => {
  const {hide} = sliderStore()
  return (
    <div className="container">
      <div className={s.offer}>
        <Slider />
        {!hide && <YourData />}
      </div>
    </div>
  )
}

export default Offer