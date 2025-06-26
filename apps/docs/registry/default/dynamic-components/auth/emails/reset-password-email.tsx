import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ResetPasswordEmailProps {
  resetLink: string;
}

export default function ResetPasswordEmail({
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-black text-[24px] font-medium mb-[0] mt-[0] mx-[0]">
                Reset your password
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Click the button below to reset your password.
              </Text>
              <Button
                className="bg-blue-600 rounded text-white font-medium py-[8px] px-[20px]"
                href={resetLink}
              >
                Reset Password
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                If you did not request a password reset, you can safely ignore
                this email.
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-[0] w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This link will expire in 1 hour.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
