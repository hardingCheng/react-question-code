import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Flex } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex align="flex-start" gap="small" vertical>
          <Button type="primary" size="large" icon={<PlusCircleOutlined />}>
            创建问卷
          </Button>
          <Button
            type={pathname.startsWith('/mange/list') ? 'default' : 'text'}
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => nav('/mange/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/mange/star') ? 'default' : 'text'}
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => nav('/mange/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/mange/trash') ? 'default' : 'text'}
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => nav('/mange/trash')}
          >
            回收站
          </Button>
        </Flex>
      </div>
      <div className={styles.right}>
        {/*Vue solt*/}
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
