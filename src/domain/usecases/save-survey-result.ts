import { SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  load: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export interface Params {
    answer: string
  }

  export type Model = SurveyResultModel
}
