import React from 'react'
import FlipMove from 'react-flip-move'
import Header from '@/presentation/components/Header'
import Footer from '@/presentation/components/Footer'
import Styles from './styles.scss'
import Spinner from '@/presentation/components/Spinner'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual seu framework favorito?</h2>
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
        <div className={Styles.loadingWrap} >
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
