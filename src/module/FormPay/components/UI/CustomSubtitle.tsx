import { FC } from "react";
import s from './CustomSubtitle.module.scss';
import {helpImg} from '../../assets'
interface CustomSubtitleProps {
  title: string;
  help: string;
}
const CustomSubtitle:FC<CustomSubtitleProps> = ({title, help}) => {
  return (
    <div className={s.subtitle}>
      <p className={s.subtitle__name}>{title}</p>
      <img src={helpImg} title={help} alt="" className={s.subtitle__img} />
    </div>
  )
}

export default CustomSubtitle