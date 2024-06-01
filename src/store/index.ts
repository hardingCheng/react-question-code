import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}
export default configureStore({
  reducer: {
    // 分模块 用户数据
    user: userReducer,
    // 组件列表  数据
    components: componentsReducer,
    // 问卷信息
  },
})
