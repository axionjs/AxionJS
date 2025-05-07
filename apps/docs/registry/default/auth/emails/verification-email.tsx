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

interface VerificationEmailProps {
  confirmLink: string;
}

export default function VerificationEmail({
  confirmLink,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-black text-[24px] font-medium mb-[0] mt-[0] mx-[0]">
                Verify your email
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Click the button below to verify your email address.
              </Text>
              <Button
                className="bg-blue-600 rounded text-white font-medium py-[8px] px-[20px]"
                href={confirmLink}
              >
                Confirm Email
              </Button>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-[0] w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This link will expire in 24 hours.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
