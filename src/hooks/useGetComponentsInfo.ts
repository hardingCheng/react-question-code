/**
 * 获取ComponentsInfo的信息
 */
import { useSelector } from 'react-redux' // 这个是干啥的呢？就是从redux的store对象中提取数据(state)。
import { StateType } from '../store'
import { ComponentInfoType, ComponentsStateType } from '../store/componentsReducer'

const useGetComponentsInfo = () => {
  const {
    componentsList = [],
    selectedId,
    copiedComponent,
  } = useSelector<StateType>(state => state.components) as ComponentsStateType
  const selectedComponent = componentsList.find(c => c.fe_id === selectedId) as ComponentInfoType
  return { componentsList, selectedId, selectedComponent, copiedComponent }
}
export default useGetComponentsInfo
