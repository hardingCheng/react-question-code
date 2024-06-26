import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentsPropsType } from '../../components/QuestionComponents'
export type ComponentInfoType = {
  fe_id: string // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentsPropsType
}
export type ComponentsStateType = {
  componentsList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentsList: [],
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
  },
})
export const { resetComponents } = componentsSlice.actions
export default componentsSlice.reducer
