import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
const { Search } = Input
const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <div>
      <Search
        size="large"
        allowClear
        placeholder="请输入关键字！"
        value={value}
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
    </div>
  )
}
export default ListSearch
