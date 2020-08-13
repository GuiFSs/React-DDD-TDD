export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export interface Model {
    id: string
    question: string
    date: Date
    didAnswer: boolean
  }
}
