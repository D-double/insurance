import formPayStore from '../../store/formPayStore'
import s from './your-data.module.scss'

const YourData = () => {
  const {
    selectedCountryArray,
    countsList,
    counts,
    startDate,
    endDate,
    activitiesList,
    activities,
    phoneNum,
  } = formPayStore();

  const descArr = [
    {
      id: 'selectedCountry',
      title: 'Страна путешествия',
      value: selectedCountryArray.map((elem)=>elem.label).join(', ')
    },
    {
      id: 'counts',
      title: 'Тип покрытия',
      value: countsList.find((elem)=> elem.id == counts)?.name 
    },
    {
      id: 'startDate',
      title: 'Начало страхования',
      value: startDate.toLocaleDateString() 
    },
    {
      id: 'endDate',
      title: 'Конец страхования',
      value: endDate.toLocaleDateString() 
    },
    {
      id: 'activities',
      title: 'Цель',
      value: activitiesList.find((elem)=> elem.id == activities)?.name 
    },
    {
      id: 'phoneNum',
      title: 'Номер телефона',
      value: phoneNum
    },
  ]
  return (
    <div className={s.yourData}>
      <h2 className={s.yourData__title}>Ваши данные</h2>
      {
        descArr.map((elem)=>(
          <p key={elem.id} className={s.yourData__desc}>
            <span>{elem.title}</span>
            <span className={s.yourData__value}>{elem.value}</span>
            <button className={s.yourData__btn}></button>
          </p>
        ))
      }
    </div>
  )
}

export default YourData