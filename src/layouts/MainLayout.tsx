import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>Login</div>
        <div className={styles.right}>登录</div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {/*Vue solt*/}
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>MainLayout footer</Footer>
    </Layout>
  )
}
export default MainLayout
