import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface TwoFactorAuthEmailProps {
  verificationToken: string;
}

export default function TwoFactorAuthEmail({
  verificationToken,
}: TwoFactorAuthEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your 2FA Verification Code</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-black text-[24px] font-medium mb-[0] mt-[0] mx-[0]">
                Two-Factor Authentication
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Your verification code is:
              </Text>
              <Text className="text-black text-[24px] font-bold my-[20px] mx-[0]">
                {verificationToken}
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                This code will expire in <strong>5 minutes</strong>. Please use
                it to complete your login process.
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-[0] w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                If you did not request this code, please ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
