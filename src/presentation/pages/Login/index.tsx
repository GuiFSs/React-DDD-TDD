import React from 'react'
import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'

const Login: React.FC = () => {
  return (
    <div className={Styles.login} >
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input
          type="email"
          name="email"
          id=""
          placeholder="Digite seu e-mail"
        />
        <Input
          type="password"
          name="password"
          id=""
          placeholder="Digite sua senha"
        />
        <button className={Styles.submit} type='submit' >
          Entrar
        </button>
        <span className={Styles.link}>
          Criar conta
        </span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
