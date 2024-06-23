import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import type { FC } from 'react'

// 这就是配置
export type ComponentsPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一 组件的配置
export type ComponentsConfType = {
  title: string
  type: string
  Component: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
}

const componentsConfList: ComponentsConfType[] = [QuestionInputConf, QuestionTitleConf]
export const getComponentsConfByType = (type: string) => {
  return componentsConfList.find(c => c.type === type)
}
