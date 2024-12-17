import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const LanguageSwitcher = () => {
  const router = useRouter()
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    router.push(router.pathname, router.asPath, { locale: newLang })
  }

  return (
    <Select value={router.locale} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="fa">فارسی</option>
      <option value="zh">中文</option>
      <option value="ko">한국어</option>
      <option value="ru">Русский</option>
    </Select>
  )
}
