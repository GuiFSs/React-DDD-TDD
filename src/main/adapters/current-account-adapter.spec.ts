import { mockAccountModel } from '@/domain/test'
import { setCurrentAccountAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

// will mock internal methods to be dummies, so it doesn't really save on localstorage (in this case)
// it doesn't care if the called method will do it's job, because they are dummies
jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct value', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
