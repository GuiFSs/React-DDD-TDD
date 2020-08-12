import React from 'react'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { makeSignupValidation } from './signup-validation-factory'
import Signup from '@/presentation/pages/Signup'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
