import Slide from '../Slide/Slide'
import Programs from '../Programs/Programs'
import FormPay from '../FormPay/FormPay'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
// import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './slider.scss'
import PrevButton from './component/PrevButton';

const Slider = () => {
  return (
    <Swiper
      pagination={true} modules={[Pagination]} className='slider'
    >
      <PrevButton/>
      <SwiperSlide>
        <Slide title="Покупка страхового полиса">
          <FormPay />
        </Slide>
      </SwiperSlide>
      <SwiperSlide className='slider__slide'>
        <Slide title="Выберите программу">
          <Programs />
        </Slide>
      </SwiperSlide>
    </Swiper>
  )
}

export default Slider