import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Components'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Components'
import { Spin } from 'antd'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentsConfByType } from '../../../components/QuestionComponents'
type EditCanvasPropsType = {
  loading?: boolean
}
function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentsConfByType(type)
  if (!componentConf) return null
  const { Component } = componentConf
  return <Component {...props} />
}
const EditCanvas: FC<EditCanvasPropsType> = (props: EditCanvasPropsType) => {
  const { loading } = props
  const { componentsList } = useGetComponentsInfo()
  console.log('componentsList', componentsList)
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentsList.map(component => {
        const { fe_id } = component
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(component)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
