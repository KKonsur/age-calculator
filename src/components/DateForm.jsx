import React, { useState } from 'react'
import styles from './DateForm.module.scss'
import img from '../images/icon-arrow.svg'

const DateForm = ({ onSetDate }) => {
   const currentDate = new Date()
   const currentYear = currentDate.getFullYear()

   const [date, setDate] = useState({ day: '', month: '', year: '' })
   const [isDateValid, setIsDateValid] = useState({ isDayValid: true, isMonthValid: true, isYearValid: true })

   const validateInput = (name, inputValue) => {
      switch (name) {
         case 'day':
            const isDayValid = inputValue && inputValue <= 31
            setIsDateValid((prevState) => ({ ...prevState, isDayValid }))
            break
         case 'month':
            const isMonthValid = inputValue && inputValue <= 12
            setIsDateValid((prevState) => ({ ...prevState, isMonthValid }))
            break
         case 'year':
            const isYearValid = inputValue && inputValue <= currentYear
            setIsDateValid((prevState) => ({ ...prevState, isYearValid }))
            break
         default:
            break
      }
   }

   const dateChangeHandler = (e) => {
      const { name, value } = e.target
      const inputValue = value.replace(/\D/g, '')
      setDate((prevState) => ({ ...prevState, [name]: inputValue }))
      validateInput(name, inputValue)
   }

   const submitHandler = (e) => {
      e.preventDefault()
      if (
         (date.day <= 31 && ['1', '3', '5', '7', '8', '10', '12'].includes(date.month)) ||
         (date.day <= 30 && ['4', '6', '9', '11'].includes(date.month)) ||
         (date.day <= 28 && date.month === '2')
      ) {
         setIsDateValid((prevState) => ({ ...prevState, isDayValid: true }))
      } else {
         setIsDateValid((prevState) => ({ ...prevState, isDayValid: false }))
         return
      }

      if (date.day && date.month && date.year && isDateValid.isDayValid && isDateValid.isMonthValid && isDateValid.isYearValid) {
         const newDate = new Date(date.year, date.month - 1, date.day)
         onSetDate(newDate)
      } else {
         return
      }
   }

   return (
      <form onSubmit={submitHandler} className={styles['date-form']}>
         <div className={styles['date-form__input-wrapper']}>
            <label htmlFor='input-day'>Day</label>
            <input
               onChange={dateChangeHandler}
               value={date.day}
               name='day'
               id='input-day'
               type='number'
               autoComplete='off'
               placeholder='DD'
            />
            {!isDateValid.isDayValid && <span>Wrong date</span>}
         </div>
         <div className={styles['date-form__input-wrapper']}>
            <label htmlFor='input-month'>Month</label>
            <input
               onChange={dateChangeHandler}
               value={date.month}
               name='month'
               id='input-month'
               type='number'
               autoComplete='off'
               placeholder='MM'
            />
            {!isDateValid.isMonthValid && <span>Wrong month</span>}
         </div>
         <div className={styles['date-form__input-wrapper']}>
            <label htmlFor='input-year'>Year</label>
            <input
               onChange={dateChangeHandler}
               value={date.year}
               name='year'
               id='input-year'
               type='number'
               autoComplete='off'
               placeholder='YYYY'
            />
            {!isDateValid.isYearValid && <span>Wrong year</span>}
         </div>
         <button type='submit' aria-label='submit'>
            <img src={img} alt='' />
         </button>
      </form>
   )
}

export default DateForm
