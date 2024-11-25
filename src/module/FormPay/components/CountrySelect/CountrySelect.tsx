import { FC } from 'react'
import Select from 'react-select'
import { ControllerRenderProps } from 'react-hook-form'
import { IOption, IPayData } from '../../types.ts'
import formPayStore from '../../../../store/formPayStore.ts'

interface ICountrySelectProps {
  field: ControllerRenderProps<IPayData, "selectedCountry">
}
const CountrySelect: FC<ICountrySelectProps> = ({ field }) => {
  const { countries, setSelectedCountry, selectedCountry } = formPayStore();

  return (
    <Select
      {...field}
      placeholder='Выберите страну:'
      options={countries}
      classNamePrefix='custom-select'
      onChange={(e) => {
        setSelectedCountry(e as IOption)
      }}
      value={selectedCountry}
    />
  )
}

export default CountrySelect