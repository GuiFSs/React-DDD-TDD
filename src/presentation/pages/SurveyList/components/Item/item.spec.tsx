import React from 'react'
import { screen, fireEvent, render } from '@testing-library/react'
import SurveyItem from '.'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components/Icon'
import { LoadSurveyList } from '@/domain/usecases'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

interface SutTypes {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )

  return {
    history
  }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = {
      ...mockSurveyModel(),
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })

  test('Should go to SurveyResult', () => {
    const survey: LoadSurveyList.Model = {
      ...mockSurveyModel(),
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    }
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
