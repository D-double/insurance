import Slide from '../Slide/Slide'
import Programs from '../Programs/Programs'
import FormPay from '../FormPay/FormPay'
import './slider.scss'
import PrevButton from './component/PrevButton';
import Transition from './component/Transition';
import sliderStore from '../../store/sliderStore';

const Slider = () => {
  const {hide} = sliderStore();
  
  return (
    <>
    <div className='slider'>
      <PrevButton/>
      <div className="slider__pagination">
        <div className={"slider__bullet " + (hide && 'active')}></div>
        <div className={"slider__bullet " + (!hide && 'active')}></div>
      </div>
      <Transition showClass='slider__form'  hide={!hide}>
        <Slide title="Покупка страхового полиса">
          <FormPay />
        </Slide>
      </Transition>
      <Transition showClass="slider__content" hide={hide}>
        <div className="slider__slide">
          <Slide title="Выберите программу">
            <Programs />
          </Slide>
        </div>
      </Transition>
    </div>
    </>
  )
}

export default Slider