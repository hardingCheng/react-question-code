import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './Common.module.scss'
import { Empty, Typography, Table, Tag, Space, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
]
const { Title } = Typography
const { confirm } = Modal
const del = () => {
  confirm({
    title: '确定删除该问卷吗？',
    icon: <ExclamationCircleOutlined />,
    content: '删除以后不可以找回',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      alert('执行删除操作！')
    },
  })
}
const Trash: FC = () => {
  useTitle('我的问卷')
  const [searchParams] = useSearchParams()
  console.warn(searchParams)
  const [questionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="#108ee9">已发布</Tag> : <Tag color="#f50">未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]
  const tableElements = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={rawQuestionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷 </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && tableElements}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}
export default Trash
