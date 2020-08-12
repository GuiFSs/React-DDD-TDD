import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SurveyList from '@/presentation/pages/SurveyList'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SurveyList} />
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignup} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router