import { GetStorage,SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key))
  }
}
