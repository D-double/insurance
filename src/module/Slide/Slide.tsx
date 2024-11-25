import { FC, ReactNode } from 'react'
import s from './slide.module.scss'
import { warningImg } from './assets'

interface ISlide {
  children: ReactNode
  title: string
}
const Slide:FC<ISlide> = ({children, title}) => {
  return (
    <div className={s.slide} >
      <h2 className={s.slide__title}>{title}</h2>
      {children}
      <p className={s.slide__desc}>
        <img src={warningImg} alt="warning" className={s.slide__img} />
        Не волнуйтесь! Вы можете покинуть сайт и продолжить с этого момента в любое время
      </p>
    </div>
  )
}

export default Slide