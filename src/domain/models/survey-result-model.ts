export interface SurveyResultModel {
  date: Date
  question: string
  answers: SurveyResultAnswerModel[]
}

export interface SurveyResultAnswerModel {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
