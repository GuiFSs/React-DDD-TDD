import React from 'react'
import Styles from './styles.scss'
import Footer from '@/presentation/components/Footer'
import Header from '@/presentation/components/Header'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyWrap} >
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>

        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
