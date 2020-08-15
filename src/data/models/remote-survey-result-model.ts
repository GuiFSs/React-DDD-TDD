import { SurveyResultAnswerModel } from '@/domain/models'

export interface RemoteSurveyResultModel {
  id: string
  date: string
  question: string
  answers: SurveyResultAnswerModel[]
}

export interface RemoteSurveyResultAnswerModel {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
