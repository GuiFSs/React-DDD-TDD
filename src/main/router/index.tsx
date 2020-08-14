import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignup, makeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import PrivateRoute from '@/presentation/components/PrivateRoute'
import SurveyResult from '@/presentation/pages/SurveyResult'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/' exact component={makeSurveyList} />
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignup} />
          <Route path='/surveys' exact component={SurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
