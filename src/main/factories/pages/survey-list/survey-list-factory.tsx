import React from 'react'
import SurveyList from '@/presentation/pages/SurveyList'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  )
}
