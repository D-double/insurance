import { FC, useEffect, useState } from 'react'
import s from './DateSelect.module.scss'
import { ControllerRenderProps } from 'react-hook-form'
import { calendarImg } from '../../assets'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import getArrayNums from '../../utils/getArrayNums'
import { IPayData } from '../../types'
import getDayOptions from '../../utils/getDayOptions'

interface DateSelectProps {
  field: ControllerRenderProps<IPayData>,
  showDefault?: boolean
}
const DateSelect: FC<DateSelectProps> = ({ field, showDefault }) => {
  
  const { onChange, value} = field;
  const [showDate, setShowDate] = useState(showDefault);
  const currentDate = new Date()
  const [startDate, setStartDate] = useState(currentDate);
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(currentDate.getMonth()+1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [day, setDay] = useState(currentDate.getDate());
  const dayOptions = getDayOptions(year, month)
  const monthsOptions = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ].map((elem, index)=>({
    value: index+1, label: elem
  }));
  const yearsOptions = getArrayNums(currentDate.getFullYear(), currentDate.getFullYear()+100).map((elem)=>({
    value: elem, label: elem
  }));
  const changeStartDate = ()=>{
    setStartDate(new Date(year, month-1, day))
    return ()=>{setShowDate(true);}
  }
  useEffect(changeStartDate, [day, month, year])
  useEffect(()=>{
    setMonth(startDate.getMonth()+1);
    setYear(startDate.getFullYear());
    setDay(startDate.getDate());
    setShow(false)
    onChange(startDate)
  }, [startDate])
  return (
    <div className={s.date}>
      <div className={s.date__selects}>
        <Select
          classNamePrefix='custom-select'
          placeholder='DD'
          options={dayOptions}
          value={showDate && dayOptions[day-1]}
          onChange={(opt)=> opt && setDay(opt.value)}
        />
        <Select
          classNamePrefix='custom-select'
          placeholder='MM'
          options={monthsOptions}
          value={showDate && monthsOptions[month-1]}
          onChange={(opt)=>opt && setMonth(opt.value)}
        />
        <Select
          classNamePrefix='custom-select'
          placeholder='YYYY'
          options={yearsOptions}
          value={showDate && yearsOptions[yearsOptions.findIndex((elem)=>elem.value == year)]}
          onChange={(opt)=>opt && setYear(opt.value)}
        />
      </div>
      <div className={s.date__wrapper}>
        <button type='button' className={s.date__btn} onClick={()=>setShow(!show)}>
          <img src={calendarImg} alt="" className={s.date__img}/>
        </button>
        <div className={`${s.date__picker} ${show ? s.active : ''}`}>
          <DatePicker
            selected={value}
            onChange={(date) => {setStartDate(date); onChange(date)}}
            inline
          />
        </div>
      </div>
    </div>
  )
}

export default DateSelect