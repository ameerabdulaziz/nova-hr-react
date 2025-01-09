import { Stack, Typography } from '@mui/material';
import React from 'react';

function InsuranceReportForm6Instructions() {
  return (
    <>
      <Stack direction='row' justifyContent='center'>
        <Typography
          fontWeight='bold'
          variant='subtitle1'
          style={{
            borderBottom: '1px solid black',
          }}
        >
          ارشادات
        </Typography>
      </Stack>

      <Stack direction='row' gap={1} my={1}>
        <Typography fontWeight='bold' style={{ whiteSpace: 'pre' }}>
          ١.
        </Typography>

        <Typography fontWeight='bold'>
          تحرر هذه الاستمارة من أصل وصورتين، يُرسل الأصل إلى مكتب التأمينات
          المختص خلال أسبوع من تاريخ انتهاء الخدمة، ويحتفظ صاحب العمل بصورة،
          وتُسلم صورة للعامل بعد توقيعه أو تُرسل له بخطاب مسجل بعلم الوصول خلال
          24 ساعة من إرسالها للمكتب في حالة رفضه التوقيع.
        </Typography>
      </Stack>

      <Stack direction='row' gap={1} my={1}>
        <Typography fontWeight='bold' style={{ whiteSpace: 'pre' }}>
          ٢.
        </Typography>

        <Typography fontWeight='bold'>
          في حالة التأخير في تقديم هذه الاستمارة، يلتزم صاحب العمل بأداء مبلغ
          إضافي يقدر بنسبة 20% من قيمة الاشتراك المستحق عن الأجر الأساسي في
          الشهر الأخير من مدة الاشتراك، عن كل شهر تأخير في الإخطار من تاريخ
          انتهاء الخدمة حتى تاريخ إرسال الاستمارة، مع حذف كسور الشهر.
        </Typography>
      </Stack>
    </>
  );
}

export default InsuranceReportForm6Instructions;
