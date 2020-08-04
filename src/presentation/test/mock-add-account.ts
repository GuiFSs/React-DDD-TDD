import { Authentication, AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: Authentication.Params
  async add (params: AddAccount.Params): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
