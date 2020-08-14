import React from 'react'
import FlipMove from 'react-flip-move'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Loading from '@/presentation/components/Loading'
import Calendar from '@/presentation/components/Calendar'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar
            date={new Date()} className={Styles.calendarWrap}
          />
          <h2>Qual seu framework favorito?</h2>
        </hgroup>
        <FlipMove className={Styles.answersList}>
          <li key="1" >
            <img src=""/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li key="2" className={Styles.active} >
            <img src=""/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li key="3">
            <img src=""/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
