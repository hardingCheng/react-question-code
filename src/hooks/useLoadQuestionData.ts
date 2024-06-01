import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const dispatch = useDispatch()
  const { id = '' } = useParams()
  async function load() {
    if (!id) throw new Error('没有问卷 id')
    return await getQuestionService(id)
  }
  // ajax 加载
  const { loading, error, data, run } = useRequest(load, {
    manual: true,
  })
  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentsList = [] } = data
    console.warn(title)
    dispatch(resetComponents({ componentsList }))
  }, [data])
  // 判断id 变化就重新执行
  useEffect(() => {
    run()
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
