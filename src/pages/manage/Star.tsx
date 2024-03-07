import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './Common.module.scss'
import { Empty, Typography } from 'antd'
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
const Star: FC = () => {
  useTitle('我的问卷')
  const [searchParams] = useSearchParams()
  console.warn(searchParams.get('keyword'))
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷 </Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}
export default Star
