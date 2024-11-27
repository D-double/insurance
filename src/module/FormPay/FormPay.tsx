import CustomSubtitle from './components/UI/CustomSubtitle'
import s from './form-pay.module.scss'
import CountrySelect from './components/CountrySelect/CountrySelect'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IPayData } from './types';
import DateSelect from './components/DateSelect/DateSelect';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './assets/custom-select.scss'
import sliderStore from '../../store/sliderStore.ts';
import formPayStore from '../../store/formPayStore.ts';
import { FormControlLabel, RadioGroup } from '@mui/material';
import CustomRadio from './components/UI/CustomRadio.tsx';
import { minusImg, plusImg } from './assets/index.ts';
import getDayNow from './utils/getDayNow.ts';

const FormPay = () => {
  const { setHide } = sliderStore();
  const { countries, currentActivitiesList, activitiesList, activities: activitiesChecked, setActivities, countsList, counts, setCounts, startDate, endDate, phoneNum, selectedCountryArray, setSelectedCountryArray, setStartDate, setEndDate, setPhoneNum } = formPayStore();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
    }
  } = useForm<IPayData>({
    mode: 'onBlur',
    values: {
      selectedCountryArray,
      counts,
      startDate,
      endDate,
      activities: activitiesChecked,
      phoneNum
    },
  });
  const startDateSelected = watch('startDate');
  const errorsValue = Object.values(errors);
  const { fields, append, remove } = useFieldArray({
    rules: {
      required: {
        value: true,
        message: 'Нужно выбрать хотя бы один город'
      },
    },
    control,
    name: "selectedCountryArray"
  });
  const payData: SubmitHandler<IPayData> = async (data) => {
    try {
      const { selectedCountryArray, counts, startDate, endDate, activities, phoneNum } = data;
      setSelectedCountryArray(selectedCountryArray)
      setCounts(counts)
      setStartDate(startDate)
      setEndDate(endDate)
      setActivities(activities)
      if (!errorsValue.length && phoneNum) {
        setPhoneNum(phoneNum)
        setHide(false)
      }
      reset()
    } catch (error) {
      console.log(error);
    }
    reset()
  }
  return (
    <form onSubmit={handleSubmit(payData)} className={s.pay}>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Страна путешествия' help='Страна путешествия' />
        <div className={s.pay__country}>
          <CountrySelect />
          <button type='button' onClick={() => append(countries[0])} className={s.pay__countryBtn}>
            <img src={plusImg} alt="" />
          </button>
          <p className={s.pay__error}>{errors.selectedCountryArray && <>{errors.selectedCountryArray.root?.message}</>}</p>
        </div>
        {
          fields.map((item, index: number) => (
            <div key={item.id} className={s.pay__country}>
              <Controller
                name={`selectedCountryArray.${index}`}
                control={control}
                render={({ field }) => (
                  <CountrySelect field={field} />
                )}
              />
              <button type='button' onClick={() => remove(index)} className={s.pay__countryBtn}>
                <img src={minusImg} alt="" />
              </button>
            </div>
          ))
        }
      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Тип покрытия' help='Тип покрытия' />
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="Тип покрытия" {...field}>
              {
                countsList.map((elem) => (
                  <FormControlLabel
                    className={s.pay__count}
                    key={elem.id}
                    value={elem.id}
                    control={<CustomRadio />}
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
          rules={{
            validate:(value) =>  value.getTime() >= getDayNow().getTime() || 'Дата начала страхования не может быть раньше текущего дня!',
          }}
          render={({ field }) => (
            <DateSelect field={field} showDefault={true} />
          )}
        />
        <p className={s.pay__error}>{errors.startDate && <>{errors.startDate.message}</>}</p>
      </div>
      <div className={s.pay__wrapper}>
        <CustomSubtitle title='Конец страхования' help='Конец страхования' />
        <Controller
          name="endDate"
          control={control}
          rules={{
            validate:(value) => value.getTime() >= startDateSelected.getTime() || 'Дата конца страхования не может быть раньше её начала!',
          }}
          render={({ field }) => (
            <DateSelect field={field}/>
          )}
        />
        <p className={s.pay__error}>{errors.endDate && <>{errors.endDate.message}</>}</p>
        {activitiesList && (
          <>
            <CustomSubtitle title='Цель' help='Цель' />
            <div className={s.pay__activities}>
              <Controller
                render={({ field }) => (
                  <RadioGroup aria-label="Цель" className={s.pay__activities} {...field}>
                    {
                      activitiesList.filter((elem)=> currentActivitiesList.includes(elem.id))
                      .map((elem) => (
                        <FormControlLabel

                          key={elem.id}
                          value={elem.id}
                          control={<CustomRadio />}
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