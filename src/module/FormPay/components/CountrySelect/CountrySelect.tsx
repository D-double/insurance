import { FC } from 'react'
import Select from 'react-select'
import { contries } from '../../../../../data.ts'
import { ControllerRenderProps } from 'react-hook-form'
import { IOption, IPayData } from '../../types.ts'

interface ICountrySelectProps {
  field: ControllerRenderProps<IPayData, "countries">
}
const CountrySelect: FC<ICountrySelectProps> = ({ field }) => {
  const countriesArr = contries ? contries : [];
  const options: IOption[] = countriesArr.map((elem) => ({
    value: elem.id, label: elem.name
  }))
  return (
    <Select
      {...field}
      placeholder='Выберите страну:'
      options={options}
      classNamePrefix='custom-select'
    />
  )
}

export default CountrySelect