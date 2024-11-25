import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ISliderStore {
  hide: boolean;
  setHide: (value: boolean) => void;
}

const sliderStore = create<ISliderStore>()(devtools(
  (set) => ({
    hide: true,
    setHide: (value) => set({ hide: value }),
  })
))

export default sliderStore