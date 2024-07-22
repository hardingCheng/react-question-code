/**
 * @description 问卷 info 组件
 * @author hardingcheng
 */

import Component from './Component'
import PropsComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropsComponent,
  defaultProps: QuestionInfoDefaultProps,
}
