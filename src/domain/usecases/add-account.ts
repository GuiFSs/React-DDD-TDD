import { AccountModel } from '../models'

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AccountModel>
}

export namespace AddAccount {
  export interface Params {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
