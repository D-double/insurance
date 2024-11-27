import formPayStore from '../../store/formPayStore';
import programsStore from '../../store/programsStore.ts';
import ProgramsItem from './components/ProgramsItem/ProgramsItem'
import s from './Programs.module.scss'
import { useEffect, useState } from 'react'

const Programs = () => {
  const { descList, programsList, currentPrograms, setCurrentPrograms } = programsStore();
  const { selectedCountryArray } = formPayStore();
  const [checkedProgram, setCheckedProgram] = useState<null | number>(null);
  const [rateEur, setRateEur] = useState(0);
  useEffect(() => {
    if (selectedCountryArray.length) {
      setCurrentPrograms(selectedCountryArray);
      setCheckedProgram(null)
    }
  }, [selectedCountryArray])

  const programs = programsList;
  const selectedProgram = programs?.find((elem) => elem.id == checkedProgram)
  const getRate = async () => {
    try {
      const response = await fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/')
      const result: {Ccy:string, Rate: string}[] = await response.json();
      const sum = result.find((elem) => elem?.Ccy == "EUR");
      if(sum)
      setRateEur(+sum.Rate);
    } catch (error) {
      console.log('Курс валют ' + error);
    }
  }
  useEffect(() => {
    getRate()
  }, [])
  return (
    <div className={s.programs}>
      {
        currentPrograms.length && currentPrograms.map((elem) => (
          <ProgramsItem
            key={elem.id}
            program={elem}
            isActive={elem.id == checkedProgram}
            onClick={setCheckedProgram}
            desc={descList.find((desc) => desc.id == elem.id)!}
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
                UZS {selectedProgram && (selectedProgram.liability * rateEur).toLocaleString()}
              </span>
            </button>
          </>
        )
      }
    </div>
  )
}

export default Programs