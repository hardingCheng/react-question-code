import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { loading, error } = useLoadQuestionData()
  return (
    <div>
      Stat
      <p>{loading}</p>
      {/*<p>{JSON.stringify(data)}</p>*/}
      <p>{JSON.stringify(error)}</p>
    </div>
  )
}
export default Stat
