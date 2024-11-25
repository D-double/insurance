import CustomSubtitle from './components/UI/CustomSubtitle'
import s from './form-pay.module.scss'
import CountrySelect from './components/CountrySelect/CountrySelect'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IPayData } from './types';
import CustomInput from './components/UI/CustomInput';
import DateSelect from './components/DateSelect/DateSelect';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './assets/custom-select.scss'
import sliderStore from '../../store/sliderStore.ts';
import formPayStore from '../../store/formPayStore.ts';

const FormPay = () => {
  const { setHide } = sliderStore();
  const { activitiesList, activities: activitiesChecked, setActivities, countsList, counts, setCounts, startDate, endDate, phoneNum, selectedCountry, setSelectedCountry, setStartDate, setEndDate, setPhoneNum } = formPayStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    }
  } = useForm<IPayData>({
    mode: 'onBlur',
    defaultValues: {
      selectedCountry,
      startDate,
      endDate,
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
        {
          countsList.map((elem) => (
            <CustomInput
              key={elem.id}
              register={
                register('counts', {
                  onChange: (e) => {
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
        {activitiesList && (
          <>
            <CustomSubtitle title='Цель' help='Цель' />
            <div className={s.pay__activities}>
              {
                activitiesList.map((elem) => (
                  <CustomInput
                    register={
                      register('activities', {
                        onChange: (e) => {
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