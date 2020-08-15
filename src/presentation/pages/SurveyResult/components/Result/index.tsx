import React from 'react'
import FlipMove from 'react-flip-move'
import Calendar from '@/presentation/components/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'
import Styles from './styles.scss'

interface Props {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()
  return (
    <>
      <hgroup>
        <Calendar
          date={surveyResult.date} className={Styles.calendarWrap}
        />
        <h2 data-testid="question">
          {surveyResult.question}
        </h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map(({ answer, image, percent, isCurrentAccountAnswer }, i) => (
          <li
            data-testid="answer-wrap"
            key={`${answer}-${i}`}
            className={isCurrentAccountAnswer ? Styles.active : ''}
          >
            {image && (
              <img data-testid="image" src={image} alt={answer} />
            )}
            <span data-testid="answer" className={Styles.answer}>
              {answer}
            </span>
            <span data-testid="percent" className={Styles.percent}>
              {percent}%
            </span>
          </li>
        ))}
      </FlipMove>
      <button
        data-testid="back-button"
        onClick={goBack}
        className={Styles.button}
      >
        Voltar
      </button>
    </>
  )
}

export default Result
