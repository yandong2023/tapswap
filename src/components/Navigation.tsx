import { Box, Container, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <Box bg="blue.500" color="white" py={4} mb={8}>
      <Container maxW="container.xl">
        <HStack spacing={8}>
          <Link
            href="/"
            style={{
              fontWeight: isActive('/') ? 'bold' : 'normal',
              textDecoration: 'none'
            }}
          >
            کدهای جدید
          </Link>
          <Link
            href="/history"
            style={{
              fontWeight: isActive('/history') ? 'bold' : 'normal',
              textDecoration: 'none'
            }}
          >
            تاریخچه
          </Link>
        </HStack>
      </Container>
    </Box>
  );
}
