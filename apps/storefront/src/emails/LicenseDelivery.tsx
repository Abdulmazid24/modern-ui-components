import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  CodeBlock,
  CodeInline,
} from "@react-email/components";
import * as React from "react";

interface LicenseDeliveryProps {
  licenseKey: string;
  tier: string;
}

export const LicenseDeliveryEmail = ({ licenseKey = "VAULT-XXX-YYY-ZZZ", tier = "Pro" }: LicenseDeliveryProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Modern UI Vault {tier} License Key</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to the Vault.</Heading>
          <Text style={text}>
            Thank you for purchasing the Modern UI Vault <strong>{tier}</strong> license. You now have full access to our entire enterprise component library.
          </Text>
          
          <Section style={codeBox}>
            <Text style={codeBoxTitle}>YOUR LICENSE KEY:</Text>
            <Text style={codeBoxKey}>{licenseKey}</Text>
          </Section>

          <Heading style={h2}>Installation Instructions</Heading>
          <Text style={text}>
            To start using your premium components, authenticate your local project via our CLI.
          </Text>
          
          <Section style={codeBlock}>
            <Text style={codeLine}>npx modern-ui-vault login</Text>
          </Section>
          
          <Text style={text}>
            When prompted, paste your license key above. After authentication, you can download any component immediately:
          </Text>
          
          <Section style={codeBlock}>
            <Text style={codeLine}>npx modern-ui-vault add holographic-scanner-card</Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            Need help? Reply to this email or read our <Link href="https://modern-ui-vault.dev/docs" style={link}>online documentation</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default LicenseDeliveryEmail;

const main = {
  backgroundColor: "#000000",
  // Ensure default font stack
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: "0 auto",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#09090b", // zinc-950
  border: "1px solid #27272a", // zinc-800
  borderRadius: "16px",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "600px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 20px",
  padding: "0",
};

const h2 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "30px 0 15px",
  padding: "0",
};

const text = {
  color: "#a1a1aa", // zinc-400
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
};

const codeBox = {
  backgroundColor: "rgba(139, 92, 246, 0.1)", // purple-500/10
  border: "1px solid rgba(139, 92, 246, 0.3)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  margin: "30px 0",
};

const codeBoxTitle = {
  color: "#8b5cf6", // purple-500
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "0 0 8px",
};

const codeBoxKey = {
  color: "#ffffff",
  fontSize: "24px",
  fontFamily: "monospace",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "4px",
};

const codeBlock = {
  backgroundColor: "#18181b", // zinc-900
  border: "1px solid #27272a", // zinc-800
  borderRadius: "8px",
  padding: "16px",
  margin: "0 0 20px",
};

const codeLine = {
  color: "#22d3ee", // cyan-400
  fontFamily: "monospace",
  fontSize: "14px",
  margin: "0",
};

const hr = {
  borderColor: "#27272a", // zinc-800
  margin: "40px 0",
};

const footer = {
  color: "#71717a", // zinc-500
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0",
};

const link = {
  color: "#a855f7", // purple-400
  textDecoration: "none",
};
