import React, { useState } from 'react'
import styles from './App.module.scss'
import DateForm from './components/DateForm'

const App = () => {
   const [days, setDays] = useState(null)
   const [months, setMonths] = useState(null)
   const [years, setYears] = useState(null)

   const setDateHandler = (data) => {
      const currentDate = new Date()
      const enteredDate = new Date(data)

      const timeDifference = currentDate.getTime() - enteredDate.getTime()

      const differenceDate = new Date(timeDifference)

      const diffYears = differenceDate.getFullYear() - 1970
      const diffMonths = differenceDate.getMonth()
      const diffDays = differenceDate.getDate() - 1

      setDays(diffDays)
      setMonths(diffMonths)
      setYears(diffYears)
   }

   return (
      <div className={styles.app}>
         <DateForm onSetDate={setDateHandler} />
         <div className={styles.results}>
            <p>{years !== null ? `${years} years` : '--years'}</p>
            <p>{months !== null ? `${months} months` : '--months'}</p>
            <p>{days !== null ? `${days} days` : '--days'}</p>
         </div>
      </div>
   )
}

export default App
