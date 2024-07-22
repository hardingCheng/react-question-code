import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentsPropsType } from '../../components/QuestionComponents'
import { produce } from 'immer'
import { arrayMove, getNextSelectedId, insertNewComponent } from './utils'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'
export type ComponentInfoType = {
  fe_id: string // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentsPropsType
}
export type ComponentsStateType = {
  selectedId: string
  componentsList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentsList: [],
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 需改 selectedId 选中了那个ID
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      // https://juejin.cn/post/7333066398175510565?searchId=20240720102703E670CBCF5393F7DD83D6#heading-4
      draft.selectedId = action.payload
    }),
    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        // 1. 当前选中的组件是那个
        const { selectedId, componentsList } = draft
        // 2. 查找当前选中组件的位置
        const index = componentsList.findIndex(c => c.fe_id === selectedId)

        if (index < 0) {
          // 未选中任何组件
          draft.componentsList.push(newComponent)
        } else {
          draft.componentsList.splice(index + 1, 0, newComponent)
        }
        draft.selectedId = newComponent.fe_id
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentsPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const curCom = draft.componentsList.find(c => c.fe_id === fe_id)
        if (curCom) {
          curCom.props = {
            ...curCom.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentsList = [], selectedId: removedId } = draft

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentsList)
      draft.selectedId = newSelectedId

      const index = componentsList.findIndex(c => c.fe_id === removedId)
      componentsList.splice(index, 1)
    }),
    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentsList = [] } = draft
        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentsList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentsList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    // 锁定/解锁 组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.componentsList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentsList = [] } = draft
      const selectedCom = componentsList.find(c => c.fe_id === selectedId)
      if (selectedCom === undefined) {
        return
      }
      draft.copiedComponent = cloneDeep(selectedCom)
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 要把 fe_id 给修改了，重要！！
      copiedComponent.fe_id = nanoid()

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentsList } = draft
      const selectedIndex = componentsList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex <= 0) return // 已经选中了第一个，无法在向上选中

      draft.selectedId = componentsList[selectedIndex - 1].fe_id
    }),

    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentsList } = draft
      const selectedIndex = componentsList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex + 1 === componentsList.length) return // 已经选中了最后一个，无法再向下选中

      draft.selectedId = componentsList[selectedIndex + 1].fe_id
    }),
    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentsList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload

        draft.componentsList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ),
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
