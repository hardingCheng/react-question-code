import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'

import type { FC } from 'react'

// 这就是配置
export type ComponentsPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType

// 统一 组件的配置
export type ComponentsConfType = {
  title: string
  type: string
  Component: FC<ComponentsPropsType>
  PropsComponent: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
}

// 全部组件列表
const componentsConfList: ComponentsConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
]
export const componentConfGroups = [
  {
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
]
export const getComponentsConfByType = (type: string) => {
  return componentsConfList.find(c => c.type === type) as ComponentsConfType
}
