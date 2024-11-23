import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

const languages = {
  en: 'English',
  zh: '中文',
  fa: 'فارسی',
  ru: 'Русский',
  ko: '한국어'
}

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  if (!mounted) {
    return (
      <Select
        value={router.locale}
        width="auto"
        size="sm"
        variant="filled"
        isDisabled
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </Select>
    )
  }

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      width="auto"
      size="sm"
      variant="filled"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Select>
  )
}
