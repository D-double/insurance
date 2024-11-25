import CustomSubtitle from './components/UI/CustomSubtitle'
import s from './form-pay.module.scss'
import CountrySelect from './components/CountrySelect/CountrySelect'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IPayData } from './types';
import CustomInput from './components/UI/CustomInput';
import DateSelect from './components/DateSelect/DateSelect';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { activities } from '../../../data.ts'
import './assets/custom-select.scss'
import sliderStore from '../../store/sliderStore.ts';
import formPayStore from '../../store/formPayStore.ts';

const FormPay = () => {
  const {setHide} = sliderStore();
  const {activities:activitiesChecked, setActivities, countsList, counts, setCounts, countries } = formPayStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    }
  } = useForm<IPayData>({ 
    mode: 'onChange',
    defaultValues: {
      selectedCountrie: countries[0],
    },
  });
  
  const payData: SubmitHandler<IPayData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset()
  }
  return (
    <form onSubmit={handleSubmit(payData)} className={s.pay}>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Страна путешествия' help='Страна путешествия' />
        <Controller
          name="selectedCountrie"
          control={control}
          render={({ field }) => (
            <CountrySelect field={field} />
          )}
        />
      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Тип покрытия' help='Тип покрытия' />
        {
          countsList.map((elem)=>(
            <CustomInput
              key={elem.id}
              register={
                register('counts', {
                  onChange:(e)=>{
                      setCounts(+e.target.value);
                  }
                })
              }
              value={elem.id}
              errors={errors.counts}
              label={elem.name}
              type='radio'
              checked={elem.id == counts ? true : false}
            />
          ))
        }

      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Начало страхования' help='Начало страхования' />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DateSelect field={field} showDefault={true} />
          )}
        />

      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Конец страхования' help='Конец страхования' />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DateSelect field={field} />
          )}
        />
        {activities && (
          <>
            <CustomSubtitle title='Цель' help='Цель' />
            <div className={s.pay__activities}>
              {
                activities.map((elem) => (
                  <CustomInput
                    register={
                      register('activities', {
                        onChange:(e)=>{
                            setActivities(+e.target.value);
                        }
                      })
                    }
                    key={elem.id}
                    value={elem.id}
                    errors={errors.activities}
                    label={elem.name}
                    type='radio'
                    checked={elem.id == activitiesChecked ? true : false}
                  />
                ))
              }
            </div>
          </>
        )}

      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Номер мобильного телефона' help='Номер мобильного телефона' />
        <Controller
          name="phoneNum"
          // rules={{
          //   required: true,
          // }}
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              placeholder="Enter phone number"
              country="uz"
            />
          )}
        />
      </div>
      <button className={s.pay__btn} onClick={() => {setHide(false)} }>Далее</button>
    </form>
  )
}

export default FormPay