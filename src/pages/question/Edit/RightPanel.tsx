import React, { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProps from './ComponentProps'
const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'props',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProps />,
    },
    {
      key: 'settings',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}
export default RightPanel
