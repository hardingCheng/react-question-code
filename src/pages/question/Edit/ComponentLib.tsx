import React, { FC } from 'react'
import { componentConfGroups, ComponentsConfType } from '../../../components/QuestionComponents'
import { nanoid } from 'nanoid'
import styles from './ComponentLib.module.scss'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
const { Title } = Typography
const ComponentLib: FC = () => {
  const dispatch = useDispatch()
  const getComponent = (c: ComponentsConfType) => {
    const { title, type, Component, defaultProps } = c
    console.warn(title, type)
    const handleClick = () => {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: defaultProps,
        })
      )
    }
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroups.map((group, index) => {
        const { groupName, components } = group
        return (
          <div key={index}>
            <Title level={5} style={{ marginTop: index > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
export default ComponentLib
