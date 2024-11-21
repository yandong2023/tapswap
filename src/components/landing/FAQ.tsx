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

const faqData = [
  {
    question: 'کدها چگونه به‌روز می‌شوند؟',
    answer: 'کدها به صورت خودکار هر ۵ دقیقه از منابع معتبر به‌روزرسانی می‌شوند. همچنین می‌توانید با کلیک روی دکمه به‌روزرسانی، به صورت دستی کدها را به‌روز کنید.',
  },
  {
    question: 'آیا کدها معتبر هستند؟',
    answer: 'بله، تمام کدها قبل از نمایش اعتبارسنجی می‌شوند و فقط کدهای معتبر نمایش داده می‌شوند. همچنین تاریخ انقضای هر کد نیز مشخص است.',
  },
  {
    question: 'چگونه از کدها استفاده کنم؟',
    answer: 'کافیست روی کد مورد نظر کلیک کنید تا کپی شود. سپس می‌توانید آن را در سایت یا اپلیکیشن مورد نظر وارد کنید.',
  },
  {
    question: 'آیا استفاده از سایت رایگان است؟',
    answer: 'بله، استفاده از تمام امکانات سایت کاملاً رایگان است.',
  },
];

export function FAQ() {
  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Heading textAlign="center" mb={10}>
          سوالات متداول
        </Heading>
        <Accordion allowMultiple>
          {faqData.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton py={4}>
                  <Box flex="1" textAlign="right" fontWeight="medium">
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
