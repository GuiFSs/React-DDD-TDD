import React from 'react'
import Styles from './styles.scss'
import Icon, { IconName } from '@/presentation/components/Icon'

const SurveyItem: React.FC = () => {
  return (
    <li>
      <div className={Styles.surveyItemWrap}>
        <Icon
          iconName={IconName.thumbUp}
          className={Styles.iconWrap}
        />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>22</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
