import React, { FC } from 'react'
const List1: FC = () => {
  const questionsList = [
    {
      id: 'q1',
      title: '问卷1',
      isPublished: false,
    },
    {
      id: 'q2',
      title: '问卷2',
      isPublished: false,
    },
    {
      id: 'q3',
      title: '问卷3',
      isPublished: true,
    },
    {
      id: 'q4',
      title: '问卷4',
      isPublished: false,
    },
  ]
  function edit(id: string) {
    console.log(id)
  }
  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionsList.map(question => {
          const { id, title, isPublished } = question
          return (
            <div key={id}>
              <strong>{title}</strong>
              {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>已发布</span>}
              <button onClick={() => edit(id)}>编辑问卷</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default List1
