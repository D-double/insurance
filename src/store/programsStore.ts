import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { programs, contries } from '../../data.ts'
import { IProgramsCountries } from '../module/Programs/types.ts';
import { IOption } from '../module/FormPay/types.ts';

interface IProgram {
  id: number;
  name: string;
  liability: number;
  coverages: object
}
interface IDesc {
  id: number;
  desc: string;
}
interface ICountry {
  id: number;
  name: string;
  isInSchengen: number;
  programs: {
    id: number;
    name: string;
    liability: null;
    coverages: null;
  }[]
}
export interface ICurrentProgram extends IProgram {
  countries: string | undefined
}
interface IProgramsStore {
  programsList: IProgram[];
  descList: IDesc[],
  countries: ICountry[]
  currentPrograms: ICurrentProgram[] | []
  setCurrentPrograms: (value: IOption[]) => void
}

const programsStore = create<IProgramsStore>()(devtools(
  (set) => ({
    programsList: programs,
    descList: [
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
    ],
    countries: contries,
    currentPrograms: [],
    setCurrentPrograms: (value) => {
      set((state) => {
        const { countries, programsList } = state;
        const selectedCountriesId = value.map((elem) => elem.value)
        const list: IProgramsCountries[] = countries.filter((elem) => selectedCountriesId.includes(elem.id))
                  .map((elem) => ({
                    programs: elem.programs,
                    name: elem.name,
                  }))
                  .reduce((acc: IProgramsCountries[], elem) => {
                    const arr: IProgramsCountries[] = elem?.programs.map((a) => ({
                      id: a.id,
                      name: elem.name
                    }))
                    const a: IProgramsCountries[] = [...arr]
                    return acc.concat(a)
                  }, [])
        const a = list.reduce((acc: number[], obj) => {
          if (!acc.includes(obj.id)) {
            acc.push(obj.id);
          }
          return acc
        }, [])

        const c = a.map((elem) => {
          const text = {
            id: elem,
            name: list.filter((item) => item.id == elem).map((item) => item.name).join(', ')
          }
          return text
        })

        const d = programsList.filter((elem)=> a.includes(elem.id))
              .map((elem)=>({
                ...elem, 
                countries: c.find((item)=> item.id == elem.id)?.name
              }))

        return { currentPrograms: d }
      })
    },
  })
))

export default programsStore