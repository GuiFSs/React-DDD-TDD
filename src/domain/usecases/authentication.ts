import { AccountModel } from '../models/account-models'

export interface Authentication {
  auth (params: Authentication.Params): Promise<AccountModel>
}

export namespace Authentication {
  export interface Params {
    email: string
    password: string
  }
}
