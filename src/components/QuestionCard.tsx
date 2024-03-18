import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt?: string
}
const { confirm } = Modal
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已设置！')
      },
    }
  )

  const nav = useNavigate()
  // const duplicate = () => {
  //   return message.success('执行复制操作！')
  // }

  const { loading: duplicateLoading, run: changeDuplicate } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功！')
        nav(`/question/edit/${result.id}`)
      },
    }
  )
  const [isDeletedState, setIsDeletedState] = useState(false)
  // 删除
  const { loading: deleteLoading, run: changeDelete } = useRequest(
    async () => {
      return await updateQuestionService(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功！')
        setIsDeletedState(true)
      },
    }
  )
  const del = () => {
    confirm({
      title: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        changeDelete()
      },
    })
  }

  if (isDeletedState) {
    return null
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="#108ee9">已发布</Tag> : <Tag color="#f50">未发布</Tag>}
              <span>答卷:{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined />}
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<StarOutlined />}
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取消星标' : '星标'}
              </Button>
              <Popconfirm
                title="确定复制该问卷吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={changeDuplicate}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}
export default QuestionCard
