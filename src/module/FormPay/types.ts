export interface IPayData {
  selectedCountrie: IOption,
  counts: number,
  startDate: Date,
  endDate: Date,
  activities: number,
  phoneNum: string | undefined
}

export interface IOption {
  value: number
  label: string
}