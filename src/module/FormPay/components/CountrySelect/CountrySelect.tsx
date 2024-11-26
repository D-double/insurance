import { FC } from 'react'
import Select from 'react-select'
import { ControllerRenderProps } from 'react-hook-form'
import { IPayData } from '../../types.ts'
import formPayStore from '../../../../store/formPayStore.ts'

interface ICountrySelectProps {
  field?: ControllerRenderProps<IPayData, `selectedCountryArray.${number}`>
}
const CountrySelect: FC<ICountrySelectProps> = ({ field }) => {
  const { countries } = formPayStore();
  if (field) {
    const { value, onChange } = field
    return (
      <Select
        placeholder='Выберите страну:'
        options={countries}
        classNamePrefix='custom-select'
        onChange={onChange}
        value={value}
      />
    )
  } else {
    return (
      <Select
        placeholder='Выберите страну:'
        // options={countries}
        classNamePrefix='custom-select'
        isDisabled={true}
      />
    )

  }
}

export default CountrySelect