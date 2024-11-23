import { Box, Text, Button, useClipboard, useToast } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { TapswapCode } from '@/types'
import { format, isValid, parseISO } from 'date-fns'
import { ko, ru, zhCN, faIR } from 'date-fns/locale'

interface CodeCardProps {
  code: TapswapCode;
  isRTL?: boolean;
}

export function CodeCard({ code, isRTL = false }: CodeCardProps) {
  const { t, i18n } = useTranslation('common')
  const { onCopy, hasCopied } = useClipboard(code.code)
  const toast = useToast()

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'ko':
        return ko
      case 'ru':
        return ru
      case 'zh':
        return zhCN
      case 'fa':
        return faIR
      default:
        return undefined
    }
  }

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    if (!isValid(date)) return t('errors.invalidDate')

    return format(date, 'PPP', {
      locale: getDateLocale(),
    })
  }

  const handleCopy = () => {
    onCopy()
    toast({
      title: t('success.copied'),
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: isRTL ? 'top-left' : 'top-right',
    })
  }

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg"
      textAlign={isRTL ? 'right' : 'left'}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {code.title}
      </Text>
      <Text color="gray.600" mb={4}>
        {code.description}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {code.code}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {code.expiresAt && `${t('codes.expires')}: ${formatDate(code.expiresAt)}`}
      </Text>
      {code.source && (
        <Text fontSize="sm" color="gray.500" mb={4}>
          {t('codes.source')}: {code.source}
        </Text>
      )}
      <Button 
        onClick={handleCopy} 
        colorScheme="blue" 
        size="sm"
        float={isRTL ? 'left' : 'right'}
      >
        {hasCopied ? t('codes.copied') : t('codes.copy')}
      </Button>
    </Box>
  )
}
