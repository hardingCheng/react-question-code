import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Components'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Components'
import { Spin } from 'antd'
type EditCanvasPropsType = {
  loading?: boolean
}
const EditCanvas: FC<EditCanvasPropsType> = (props: EditCanvasPropsType) => {
  const { loading } = props
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
