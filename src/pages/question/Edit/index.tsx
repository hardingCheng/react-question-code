import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData()
  console.warn(loading, data, error)
  return (
    <div className={styles.container}>
      <div style={{ height: '40px', backgroundColor: '#ffffff' }}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>画布</div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
