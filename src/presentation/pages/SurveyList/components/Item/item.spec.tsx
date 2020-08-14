import React from 'react'
import { render,screen } from '@testing-library/react'
import SurveyItem from '.'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components/Icon'
import { LoadSurveyList } from '@/domain/usecases'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = {
      ...mockSurveyModel(),
      didAnswer: true
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = {
      ...mockSurveyModel(),
      didAnswer: false
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
