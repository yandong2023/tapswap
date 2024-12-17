import { Box, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface ErrorMessageProps {
  message?: string
  code?: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, code, onRetry }: ErrorMessageProps) => {
  const { t } = useTranslation('common')
  const bgColor = useColorModeValue('red.50', 'red.900')
  const borderColor = useColorModeValue('red.100', 'red.800')
  const textColor = useColorModeValue('red.600', 'red.200')

  return (
    <Box
      p={4}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      role="alert"
    >
      <VStack spacing={3} align="stretch">
        <Text color={textColor} fontWeight="medium">
          {message || t('errors.default')}
        </Text>
        {code && (
          <Text fontSize="sm" color={textColor}>
            {t('errors.code')}: {code}
          </Text>
        )}
        {onRetry && (
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={onRetry}
            alignSelf="flex-end"
          >
            {t('errors.tryAgain')}
          </Button>
        )}
      </VStack>
    </Box>
  )
}
