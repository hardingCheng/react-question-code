import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 12：23',
  },
]
const List: FC = () => {
  useTitle('我的问卷')
  const [searchParams] = useSearchParams()
  console.warn(searchParams.get('keyword'))
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>我的问卷</div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}
export default List
