import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Home: FC = () => {
  const nav = useNavigate()
  const clickHandler = () => {
    nav({
      pathname: '/login',
      search: 'b=10',
    })
  }
  return (
    <>
      <div>Home</div>
      <button onClick={clickHandler}>登录</button>
      <Link to="/register?a=20">注册</Link>
    </>
  )
}
export default Home
