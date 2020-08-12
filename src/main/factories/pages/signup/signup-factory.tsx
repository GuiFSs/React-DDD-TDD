import React from 'react'
import { makeSignupValidation } from './signup-validation-factory'
import Signup from '@/presentation/pages/Signup'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
    />
  )
}
