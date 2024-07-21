import React, { FC } from 'react'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import {
  ComponentsPropsType,
  getComponentsConfByType,
} from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}
const ComponentProps: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentsInfo()
  if (selectedComponent === undefined) return <NoProp />
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentsConfByType(type)
  if (componentConf === undefined) return <NoProp />
  const { PropsComponent } = componentConf
  const changeProps = (newProps: ComponentsPropsType) => {
    console.warn('newProps', newProps)
    if (selectedComponent === undefined) {
      return
    }
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
    console.warn(newProps)
  }
  return <PropsComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}
export default ComponentProps
