import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignup, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
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
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignup} />
          <PrivateRoute path='/' exact component={makeSurveyList} />
          <PrivateRoute path='/surveys/:id' component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
