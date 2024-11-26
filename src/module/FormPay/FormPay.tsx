import CustomSubtitle from './components/UI/CustomSubtitle'
import s from './form-pay.module.scss'
import CountrySelect from './components/CountrySelect/CountrySelect'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IPayData } from './types';
import DateSelect from './components/DateSelect/DateSelect';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './assets/custom-select.scss'
import sliderStore from '../../store/sliderStore.ts';
import formPayStore from '../../store/formPayStore.ts';
import { FormControlLabel, RadioGroup } from '@mui/material';
import CustomRadio from './components/UI/CustomRadio.tsx';

const FormPay = () => {
  const { setHide } = sliderStore();
  const { activitiesList, activities: activitiesChecked, setActivities, countsList, counts, setCounts, startDate, endDate, phoneNum, selectedCountry, setSelectedCountry, setStartDate, setEndDate, setPhoneNum } = formPayStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
    }
  } = useForm<IPayData>({
    mode: 'onBlur',
    // defaultValues:{
    //   counts
    // },
    values: {
      selectedCountry,
      counts,
      startDate,
      endDate,
      activities: activitiesChecked,
      phoneNum
    },
  });
  const errorsValue = Object.values(errors);
  const payData: SubmitHandler<IPayData> = async (data) => {
    try {
      const { selectedCountry, counts, startDate, endDate, activities, phoneNum } = data;
      setSelectedCountry(selectedCountry)
      setCounts(counts)
      setStartDate(startDate)
      setEndDate(endDate)
      setActivities(activities)
      if (!errorsValue.length && phoneNum) {
        setPhoneNum(phoneNum)
        setHide(false)
      }
      reset()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset()
  }
  // console.log(phoneNum);
  return (
    <form onSubmit={handleSubmit(payData)} className={s.pay}>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Страна путешествия' help='Страна путешествия' />
        <Controller
          name="selectedCountry"
          control={control}
          render={({ field }) => (
            <CountrySelect field={field} />
          )}
        />
      </div>
      <div className={s.pay__wrapper}>
        
        <CustomSubtitle title='Тип покрытия' help='Тип покрытия' />

        <Controller
              render={({ field }) => (
                <RadioGroup aria-label="gender" {...field}>
                  {
                    countsList.map((elem) => (
                      <FormControlLabel 
                        className={s.pay__count}                        
                        key={elem.id}
                        value={elem.id}
                        control={<CustomRadio/>}
                        label={elem.name}
                      />
                    ))
                  }
                </RadioGroup>
              )}
              name="counts"
              control={control}
            />
        

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
        {activitiesList && (
          <>
            <CustomSubtitle title='Цель' help='Цель' />
            <div className={s.pay__activities}>
              <Controller
                render={({ field }) => (
                  <RadioGroup aria-label="Цель" className={s.pay__activities} {...field}>
                    {
                      activitiesList.map((elem) => (
                        <FormControlLabel 
                          
                          key={elem.id}
                          value={elem.id}
                          control={<CustomRadio/>}
                          label={elem.name}
                        />
                      ))
                    }
                  </RadioGroup>
                )}
                name="activities"
                control={control}
              />

            </div>
          </>
        )}

      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Номер мобильного телефона' help='Номер мобильного телефона' />
        <Controller
          name="phoneNum"
          rules={{
            required: {
              value: true,
              message: 'Телефон обязателен для заполнения'
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <PhoneInput
              placeholder="Enter phone number"
              country="uz"
              value={phoneNum}
              onChange={onChange}
              onBlur={onBlur}
              inputClass={s.pay__phone}
            />
          )}
        />
        <p className={s.pay__error}>{errors.phoneNum && <>{errors.phoneNum.message}</>}</p>
      </div>
      <button className={s.pay__btn}>Далее</button>
    </form>
  )
}

export default FormPay