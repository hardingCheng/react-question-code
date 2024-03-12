import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData()
  return (
    <div>
      Edit
      <p>{loading}</p>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(error)}</p>
    </div>
  )
}
export default Edit
