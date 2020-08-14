export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export interface Model {
    id: string
    date: Date
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
