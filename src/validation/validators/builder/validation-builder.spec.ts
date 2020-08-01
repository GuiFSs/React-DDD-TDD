import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  const field = faker.database.column()

  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field(field).required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field(field).email().build()
    expect(validations).toStrictEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const length = faker.random.number()
    const validations = sut.field(field).min(length).build()
    expect(validations).toStrictEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const length = faker.random.number()
    const validations = sut.field(field).required().email().min(length).build()
    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, length)
    ])
  })
})
