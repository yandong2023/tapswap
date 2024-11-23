import { Box, Center, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface LoadingErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const LoadingError = ({ title, message, onRetry }: LoadingErrorProps) => {
  const { t } = useTranslation('common')

  return (
    <Center minH="50vh">
      <Box textAlign="center" py={10} px={6}>
        <VStack spacing={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="xl"
            bgGradient="linear(to-r, red.400, red.600)"
            backgroundClip="text"
          >
            {title || t('errors.loadingError')}
          </Heading>

          <Text color={'gray.500'}>
            {message || t('errors.loadingErrorMessage')}
          </Text>

          {onRetry && (
            <Button
              colorScheme="red"
              bgGradient="linear(to-r, red.400, red.500, red.600)"
              color="white"
              variant="solid"
              onClick={onRetry}
            >
              {t('errors.tryAgain')}
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  )
}
