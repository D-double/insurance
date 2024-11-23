import CustomSubtitle from './components/UI/CustomSubtitle'
import s from './form-pay.module.scss'
import CountrySelect from './components/CountrySelect/CountrySelect'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IPayData } from './types';
import CustomInput from './components/UI/CustomInput';
import DateSelect from './components/DateSelect/DateSelect';


const FormPay = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid
    }
  } = useForm<IPayData>({ mode: 'onChange' });

  const payData: SubmitHandler<IPayData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset()
  }
  // const countriesController = [...Array(6)]
  return (
    <form onSubmit={handleSubmit(payData)} className={s.pay}>
      <h2 className={s.pay__title}>Покупка страхового полиса</h2>
      <CustomSubtitle title='Страна путешествия' help='Страна путешествия' />

      <Controller
        name="countries"
        control={control}
        render={({ field }) => (
          <CountrySelect field={field} />
        )}
      />
      
      <CustomSubtitle title='Тип покрытия' help='Тип покрытия' />
      <CustomInput
        register={
          register('counts')
        }
        value={1}
        errors={errors.counts}
        label="Однократное путешествие"
        type='radio'
        checked={true}
      />
      <CustomInput
        register={
          register('counts')
        }
        value={2}
        errors={errors.counts}
        label="Многократное путешествие"
        type='radio'
      />
      <CustomSubtitle title='Начало страхования' help='Начало страхования' />
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DateSelect field={field} />
        )}
      />
      {/* <DateSelect
        register={
          register('date')
        }
        errors={errors.date}
      /> */}
      <button>Далее</button>
    </form>
  )
}

export default FormPay