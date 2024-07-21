import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Components'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Components'
import { Spin } from 'antd'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { changeSelectedId, ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentsConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
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
  const { componentsList, selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()

  const handleClick = (event: MouseEvent, id: string) => {
    // 阻止冒泡
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentsList
        .filter(c => !c.isHidden)
        .map(component => {
          const { fe_id, isLocked } = component
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })
          return (
            <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{getComponent(component)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
