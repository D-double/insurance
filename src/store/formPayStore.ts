import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IOption, IPayData } from '../module/FormPay/types';
import { contries, activities } from '../../data'
import toCapitalize from '../utils/toCapitalize';

interface ICounts {
  id: number,
  name: string
}
interface IActivities {
  id: number,
  name: string
}

interface IFormPayStore extends IPayData {
  addCountry: IOption
  countsList: ICounts[]
  currentActivitiesList: number[]
  activitiesList: IActivities[]
  countries: IOption[]
  setSelectedCountryArray: (value: IOption[]) => void;
  setCounts: (value: number) => void;
  setStartDate: (value: Date) => void;
  setEndDate: (value: Date) => void;
  setActivities: (value: number) => void;
  setPhoneNum: (value: string) => void;
}

const countriesArr = contries ? contries : [];
const options: IOption[] = countriesArr.map((elem) => ({
  value: elem.id, label: toCapitalize(elem.name) 
}))
const baseCountry = options.find((elem)=>elem.label.toLowerCase() == 'латвия') || options[0]


const formPayStore = create<IFormPayStore>()(devtools(
  (set) => ({
    addCountry: baseCountry,
    countsList: [
      { id: 1, name: 'Однократное путешествие' },
      { id: 2, name: 'Многократное путешествие' },
    ],
    countries: options,
    selectedCountryArray:[],
    setSelectedCountryArray: (value) => set({ selectedCountryArray: value }),
    counts: 1,
    setCounts: (value) => set({ counts: value }),
    startDate: new Date(),
    setStartDate: (value) => set({ startDate: value }),
    endDate: new Date(),
    setEndDate: (value) => set({ endDate: value }),
    currentActivitiesList: [0, 1, 2, 4],
    activitiesList: activities,
    activities: 0,
    setActivities: (value) => set({ activities: value }),
    phoneNum: undefined,
    setPhoneNum: (value) => set({ phoneNum: value }),
  })
))

export default formPayStore