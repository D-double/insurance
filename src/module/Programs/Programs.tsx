import ProgramsItem from './components/ProgramsItem/ProgramsItem'
import s from './Programs.module.scss'
import { programs } from '../../../data.ts'
import { useEffect, useState } from 'react'

const Programs = () => {
  const [checkedProgram, setCheckedProgram] = useState<null | number>(null);
  const [rateEur, setRateEur] = useState(0);
  const descList = [
    {
      "id": 1,
      desc: 'Медицинское лечение, репатриация и другое'
    },
    {
      "id": 2,
      desc: 'Всё вышеперечисленное + спасательная операция'
    },
    {
      "id": 3,
      desc: 'Всё вышеперечисленное во всех странах мира'
    },
    {
      "id": 4,
      desc: 'Всё вышеперечисленное + COVID'
    },
    {
      "id": 5,
      desc: 'Всё вышеперечисленное + COVID, во всех странах'
    },
  ]
  const selectedProgram = programs?.find((elem)=> elem.id == checkedProgram)
  const getRate = async ()=>{
    try {
    const response = await fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/')
    const result = await response.json();
    const sum = result.find((elem)=>elem.Ccy == "EUR");
    setRateEur(+sum.Rate);
    } catch (error) {
      console.log('Курс валют ' + error);
    }
  }
  useEffect(()=>{
    getRate()
  }, [])
  return (
    <div className={s.programs}>
      {
        programs && programs.map((elem)=>(
          <ProgramsItem 
            key={elem.id} 
            program={elem} 
            isActive={elem.id == checkedProgram} 
            onClick={setCheckedProgram}
            desc={descList.find((desc)=> desc.id == elem.id )!}  
          />
        ))
      }
      {
        checkedProgram && (
          <>
            <h3 className={s.programs__title}>Сравнить программы</h3>
            <button className={s.programs__desc}>
              Выбрать {selectedProgram && selectedProgram.name}
              <span className={s.programs__price}>
                UZS { selectedProgram && (selectedProgram.liability * rateEur).toLocaleString()}
              </span>
            </button>
          </>
        )
      }
    </div>
  )
}

export default Programs