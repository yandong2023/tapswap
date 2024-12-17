import { Box, Heading, Text, Button, Center } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface NotFoundProps {
  title?: string
  message?: string
}

export const NotFound = ({ title, message }: NotFoundProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Center minH="70vh">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          {title || t('errors.pageNotFound')}
        </Text>
        <Text color={'gray.500'} mb={6}>
          {message || t('errors.pageNotFoundMessage')}
        </Text>

        <Button
          colorScheme="blue"
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="solid"
          onClick={() => router.push('/')}
        >
          {t('errors.goHome')}
        </Button>
      </Box>
    </Center>
  )
}
