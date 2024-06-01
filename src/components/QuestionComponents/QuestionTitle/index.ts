/**
 * @description 问卷 输入框
 * @author hardingcheng
 */

import Component from './Components'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
