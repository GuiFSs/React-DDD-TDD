import React from 'react'
import Styles from './styles.scss'
import Spinner from '@/presentation/components/Spinner'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login} >
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap} >
          <input type="email" name="email" id="" placeholder="Digite seu e-mail"/>
          <span className={Styles.status} >🔴</span>
        </div>
        <div className={Styles.inputWrap} >
          <input type="password" name="password" id="" placeholder="Digite sua senha"/>
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type='submit' >
          Entrar
        </button>
        <span className={Styles.link}>
          Criar conta
        </span>
        <div className={Styles.errorWrap}>
          <Spinner
            className={Styles.spinner}
          />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
