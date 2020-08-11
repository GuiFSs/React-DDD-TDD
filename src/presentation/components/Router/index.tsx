import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SurveyList from '@/presentation/pages/SurveyList'

interface Factory {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={SurveyList} />
        <Route path='/login' exact component={factory.makeLogin} />
        <Route path='/signup' exact component={factory.makeSignup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
