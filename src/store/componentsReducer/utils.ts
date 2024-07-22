import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个 selectedId
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 要删除最后一个，就要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentsList } = draft
  const index = componentsList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    draft.componentsList.push(newComponent)
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentsList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}

/**
 * 移动数组中的元素从旧索引位置到新索引位置
 * @param {Array} arr - 原始数组
 * @param {number} fromIndex - 元素当前的索引位置
 * @param {number} toIndex - 元素需要移动到的新索引位置
 * @returns {Array} - 移动元素后的数组
 */
export function arrayMove(arr: ComponentInfoType[], fromIndex: number, toIndex: number) {
  // 首先，确保索引在数组的范围内
  // 如果索引无效，则直接返回原数组
  if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
    return arr
  }
  // 创建一个新数组，将原数组的元素复制到新数组中
  const result = [...arr]
  // 使用数组的 splice 方法从原位置删除元素
  // splice 方法的第二个参数为 1，表示删除一个元素
  // 返回值是一个数组，包含被删除的元素
  const [removed] = result.splice(fromIndex, 1)
  // 使用数组的 splice 方法在新位置插入元素
  // splice 方法的第一个参数为插入位置的索引，第二个参数为 0，表示不删除元素
  // 第三个参数为需要插入的元素
  result.splice(toIndex, 0, removed)
  // 返回移动元素后的数组
  return result
}
