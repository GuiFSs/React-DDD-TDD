export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export interface Model {
    id: string
    date: Date
    didAnswer: boolean
    answers: [{
      image?: string
      answer: string
      count: number
      percent: number
    }]
  }
}
