import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IOption, IPayData } from '../module/FormPay/types';
import { contries } from '../../data'

interface ICounts {
  id: number,
  name: string
}

interface IFormPayStore extends IPayData {
  countsList: ICounts[]
  setSelectedCountrie: (value: IOption) => void;
  setCounts: (value: number) => void;
  setActivities: (value: number) => void;
  countries: IOption[]
}

const countriesArr = contries ? contries : [];
const options: IOption[] = countriesArr.map((elem) => ({
  value: elem.id, label: elem.name
}))

const formPayStore = create<IFormPayStore>()(devtools(
  (set) => ({
    countsList: [
      { id: 1, name: 'Однократное путешествие' },
      { id: 2, name: 'Многократное путешествие' },
    ],
    countries: options,
    selectedCountrie: options[0],
    setSelectedCountrie: (value) => set({ selectedCountrie: value }),
    counts: 1,
    setCounts: (value) => set({ counts: value }),
    startDate: new Date(),
    endDate: new Date(),
    activities: 0,
    setActivities: (value) => set({ activities: value }),
    phoneNum: undefined,
  })
))

export default formPayStore