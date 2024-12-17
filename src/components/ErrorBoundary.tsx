import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Heading, Text, Button, Container } from '@chakra-ui/react'
import { withTranslation, WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryComponent extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    const { t } = this.props

    if (this.state.hasError) {
      return (
        <Box py={10} px={6}>
          <Container maxW="container.md">
            <Box textAlign="center" py={10} px={6}>
              <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, blue.400, blue.600)"
                backgroundClip="text">
                {t('errors.title', 'Something went wrong')}
              </Heading>
              <Text mt={3} mb={2} color={'gray.500'}>
                {this.state.error?.message || t('errors.default', 'An unexpected error occurred')}
              </Text>
              <Button
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                color="white"
                variant="solid"
                onClick={this.handleReset}
                mt={4}
              >
                {t('errors.tryAgain', 'Try Again')}
              </Button>
            </Box>
          </Container>
        </Box>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent)
