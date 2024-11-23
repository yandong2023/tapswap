import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const faqData = [
  {
    question: 'How does the code verification system work?',
    answer: 'Our system employs a multi-stage verification process that includes automated validation checks, merchant API verification, and real-time status updates. Each code is verified for format, expiration, and usage limits before being displayed.',
  },
  {
    question: 'What measures are in place to prevent code abuse?',
    answer: 'We implement rate limiting, request validation, and IP-based tracking to prevent automated abuse. Our system also maintains a distributed cache of code usage patterns to detect and prevent potential misuse.',
  },
  {
    question: 'How is code data synchronized across regions?',
    answer: 'We use a distributed caching system with regional endpoints to ensure fast access worldwide. Updates are propagated through our CDN network with typical synchronization times under 30 seconds.',
  },
  {
    question: 'What API endpoints are available for code verification?',
    answer: 'Our REST API provides endpoints for code validation (/api/verify), status checks (/api/status), and usage statistics (/api/stats). All endpoints implement rate limiting and require authentication.',
  },
  {
    question: 'How do you handle high-traffic scenarios?',
    answer: 'Our infrastructure uses auto-scaling and load balancing to handle traffic spikes. The caching layer can serve up to 100,000 requests per second with sub-50ms latency.',
  }
];

export function FAQ() {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // 确定当前语言的文字方向
  const isRTL = router.locale === 'fa';

  // 获取所有问题的键
  const questions = ['q1', 'q2', 'q3', 'q4'];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Heading textAlign="center" mb={10}>
          {t('faq.title')}
        </Heading>
        <Accordion allowMultiple>
          {questions.map((questionKey) => (
            <AccordionItem key={questionKey}>
              <h2>
                <AccordionButton py={4}>
                  <Box flex="1" textAlign={isRTL ? 'right' : 'left'} fontWeight="medium">
                    {t(`faq.questions.${questionKey}.question`)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} textAlign={isRTL ? 'right' : 'left'}>
                {t(`faq.questions.${questionKey}.answer`)}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
