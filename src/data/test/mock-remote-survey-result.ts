import faker from 'faker'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  id: faker.random.uuid(),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean()
    },
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean()
    }
  ]
})
