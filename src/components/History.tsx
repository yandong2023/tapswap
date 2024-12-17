import { Box, Container, Heading, Text, Stack, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Badge, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

interface HistoryItem {
  code: string;
  status: 'success' | 'failed' | 'pending';
  date: string;
  source: string;
  discount: string;
}

export function History() {
  const { t } = useTranslation('common');

  const mockHistory: HistoryItem[] = [
    {
      code: 'WELCOME20',
      status: 'success',
      date: '2024-01-20',
      source: 'Amazon',
      discount: '20%'
    },
    {
      code: 'SALE50',
      status: 'failed',
      date: '2024-01-19',
      source: 'eBay',
      discount: '50%'
    },
    {
      code: 'NEWYEAR',
      status: 'pending',
      date: '2024-01-18',
      source: 'AliExpress',
      discount: '30%'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Icon as={FaCheckCircle} color="green.500" />;
      case 'failed':
        return <Icon as={FaTimesCircle} color="red.500" />;
      case 'pending':
        return <Icon as={FaClock} color="yellow.500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return t(`history.status.${status}`);
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>
              {t('history.title')}
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {t('history.description')}
            </Text>
          </Box>

          {mockHistory.length > 0 ? (
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              shadow="sm"
              rounded="lg"
              overflow="hidden"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>{t('history.table.status')}</Th>
                    <Th>{t('history.table.code')}</Th>
                    <Th>{t('history.table.date')}</Th>
                    <Th>{t('history.table.source')}</Th>
                    <Th>{t('history.table.discount')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockHistory.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Stack direction="row" spacing={2} align="center">
                          {getStatusIcon(item.status)}
                          <Text>{getStatusText(item.status)}</Text>
                        </Stack>
                      </Td>
                      <Td>
                        <Badge colorScheme="blue">{item.code}</Badge>
                      </Td>
                      <Td>{t('history.date', { date: item.date })}</Td>
                      <Td>{item.source}</Td>
                      <Td>{item.discount}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Box
              p={8}
              textAlign="center"
              bg={useColorModeValue('white', 'gray.800')}
              rounded="lg"
            >
              <Text>{t('history.noHistory')}</Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
