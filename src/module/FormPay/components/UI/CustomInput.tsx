import s from './CustomInput.module.scss'
import { FC } from 'react'
import { UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'
import { checkOffImg, checkOnImg } from '../../assets'
interface CustomInputProps {
  register: UseFormRegisterReturn,
  errors: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined,
  label: string
  type: string
  holder?: string,
  checked?: boolean,
  value?: number
}

const CustomInput: FC<CustomInputProps> = ({ register, errors, label, type, holder, checked, value}) => {
  
  if (type == 'radio') {
    return (
      <div className={s.enter}>
        <label>
          <input
            {...register}
            type={type} 
            className={s.enter__radio} 
            checked={checked}
            value={value}
          />
          <img src={checkOnImg} alt="" className={s.enter__checkOn} />
          <img src={checkOffImg} alt="" className={s.enter__checkOff} />
          <span className={s.enter__text}>{label}</span>
        </label>
        <p className={s.enter__error}>{errors && <>{errors.message}</>}</p>
      </div>
    )

  } else {
    return (
      <div className={s.enter}>
        <label>
          <span className={s.enter__text}>{label}</span>
          <input
            {...register}
            type={type} className={s.enter__input} placeholder={holder}
          />
        </label>
        <p className={s.enter__error}>{errors && <>{errors.message}</>}</p>
      </div>
    )
  }
}

export default CustomInput