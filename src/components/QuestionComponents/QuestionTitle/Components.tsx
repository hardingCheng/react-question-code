import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import { Typography } from 'antd'
const { Title } = Typography
const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return '24px'
      case 2:
        return '20px'
      case 3:
        return '16px'
      default:
        return '16px'
    }
  }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: 0,
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
