/**
 * @description 问卷 输入框
 * @author hardingcheng
 */

import Component from './Components'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input 组件的配置
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component, // 画布显示的组件
  defaultProps: QuestionInputDefaultProps,
}
