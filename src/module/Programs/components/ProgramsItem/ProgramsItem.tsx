import { Dispatch, FC, SetStateAction } from 'react'
import { checkOffImg, checkOnImg } from '../../assets'
import s from './ProgramsItem.module.scss'
import { IProgram } from '../../types'

interface IProgramsItemProps {
  isActive?: boolean
  program: IProgram
  onClick: Dispatch<SetStateAction<null | number>>
  desc: {id: number, desc: string}
}
const ProgramsItem: FC<IProgramsItemProps> = ({program, isActive, onClick, desc}) => {
  const {id, name, liability} = program
  return (
    <div className={`${s.programsItem} ${ isActive ? s.active : ''}`} onClick={()=>{onClick(id)}}>
      <img src={checkOnImg} alt="" className={s.programsItem__checkOn} />
      <img src={checkOffImg} alt="" className={s.programsItem__checkOff} />
      <h3 className={s.programsItem__title}>{name}</h3>
      <div className={s.programsItem__content}>
        <h4 className={s.programsItem__price}>Общее покрытие - {liability} EUR</h4>
        <p className={s.programsItem__desc}>{desc.desc}</p>
      </div>
    </div>
  )
}

export default ProgramsItem