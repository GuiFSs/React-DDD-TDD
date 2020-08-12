import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SurveyList from '@/presentation/pages/SurveyList'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import PrivateRoute from '@/presentation/components/PrivateRoute'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/' exact component={SurveyList} />
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignup} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
