import React from 'react'
import Styles from './styles.scss'
import Logo from '@/presentation/components/Logo'
import Footer from '@/presentation/components/Footer'

// import { Container } from './styles';

const SurveyList: React.FC = () => {
  return <div className={Styles.surveyWrap} >
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent} >
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Rodrigo</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
    <div className={Styles.contentWrap}>
      <h2>Enquetes</h2>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>22</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>22</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>22</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li><li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>22</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>22</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>
      </ul>

    </div>
    <Footer />
  </div>
}

export default SurveyList
