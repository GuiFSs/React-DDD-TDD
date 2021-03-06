import React from 'react'
import Calendar from '@/presentation/components/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'
import Styles from './styles.scss'
import { SurveyResultAnswer } from '..'

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
      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((answer, i) => (
          <SurveyResultAnswer
            key={`${answer.answer}-${i}`}
            answer={answer}
          />
        ))}
      </ul>
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
