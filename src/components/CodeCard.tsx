import { Box, Text, useToast, VStack, Badge, HStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { TapswapCode } from '@/types';

interface CodeCardProps {
  code: TapswapCode;
}

export function CodeCard({ code }: CodeCardProps) {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      toast({
        title: 'کد کپی شد',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      toast({
        title: 'خطا در کپی کردن کد',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      onClick={handleCopy}
      _hover={{ borderColor: 'blue.500' }}
      transition="all 0.2s"
      position="relative"
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold">
            {code.title}
          </Text>
          <Badge colorScheme={code.isActive ? 'green' : 'red'}>
            {code.isActive ? 'فعال' : 'منقضی شده'}
          </Badge>
        </HStack>
        
        <Text
          fontSize="xl"
          fontFamily="monospace"
          color="blue.500"
          textAlign="center"
          py={2}
          bg="gray.50"
          borderRadius="md"
        >
          {code.code}
        </Text>

        <HStack justify="space-between" fontSize="sm" color="gray.500">
          <Text>منبع: {code.source}</Text>
          <Text>
            تاریخ: {new Intl.DateTimeFormat('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(code.createdAt))}
          </Text>
        </HStack>
        {code.validUntil && (
          <HStack justify="space-between" fontSize="sm" color="gray.500">
            <Text>تاریخ انقضا: {new Intl.DateTimeFormat('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(code.validUntil))}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
