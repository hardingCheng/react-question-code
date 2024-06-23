/**
 * 获取ComponentsInfo的信息
 */
import { useSelector } from 'react-redux' // 这个是干啥的呢？就是从redux的store对象中提取数据(state)。
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentsInfo = () => {
  const { componentsList = [] } = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType
  return { componentsList }
}
export default useGetComponentsInfo
