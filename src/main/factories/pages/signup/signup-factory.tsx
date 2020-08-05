import React from 'react'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { makeSignupValidation } from './signup-validation-factory'
import Signup from '@/presentation/pages/Signup'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
