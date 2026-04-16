import { useState } from "react";
import Modal from "../modal";
import {
  Section,
  SectionTitle,
  Description,
  CodeBlock,
  DimLine,
  MetaLine,
  CopyButton,
  CodeWrapper,
  CodeBlur,
  AcceptNote,
  RevealButton,
  WarningBox,
  WarningTitle,
  WarningText,
} from "./styles";

function TokenModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const apiToken = localStorage.getItem("api_token") ?? "—";
  const metaTag = `<meta name="testify" content="${apiToken}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(metaTag).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClose = () => {
    setRevealed(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Domain verification"
      size="md"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Section>
          <Description>
            To verify that you own or have authorized access to the domain you
            want to test, add the following <strong>meta tag</strong> inside the{" "}
            <code
              style={{
                background: "#f1f5f9",
                padding: "1px 5px",
                borderRadius: 4,
                fontSize: "0.82rem",
              }}
            >
              &lt;head&gt;
            </code>{" "}
            of your website before starting a scan.
          </Description>
        </Section>

        <WarningBox>
          <WarningTitle>⚠ Important — read before scanning</WarningTitle>
          <WarningText>
            The bot will <strong>autonomously navigate and interact</strong>{" "}
            with your website: clicking buttons, filling and submitting forms,
            following links, and triggering JavaScript events. It can
            potentially{" "}
            <strong>
              modify settings, submit real data, or delete records
            </strong>
            .
          </WarningText>
          <WarningText>
            <strong>Always run scans in test or staging environments.</strong>{" "}
            Never point the scanner at a live production site unless you fully
            understand and accept the consequences.
          </WarningText>
        </WarningBox>

        <AcceptNote>
          By copying and using this meta tag you confirm that you own or have
          explicit authorization to test this domain and{" "}
          <strong>accept full responsibility</strong> for any actions the bot
          performs on your site.
        </AcceptNote>

        <Section>
          <SectionTitle>Meta tag</SectionTitle>
          <CodeWrapper>
            <CodeBlock>
              {revealed && (
                <CopyButton onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </CopyButton>
              )}
              <DimLine>{'<!DOCTYPE html>'}</DimLine>
              <DimLine>{'<html lang="en">'}</DimLine>
              <DimLine>{'<head>'}</DimLine>
              <DimLine>{'    <meta charset="UTF-8">'}</DimLine>
              <DimLine>{'    <meta name="viewport" content="width=device-width, initial-scale=1.0">'}</DimLine>
              <DimLine>{'    ...'}</DimLine>
              <MetaLine>{'    '}{metaTag}</MetaLine>
              <DimLine>{'    ...'}</DimLine>
              <DimLine>{'</head>'}</DimLine>
            </CodeBlock>

            {!revealed && (
              <CodeBlur>
                <RevealButton onClick={() => setRevealed(true)}>
                  Show token
                </RevealButton>
              </CodeBlur>
            )}
          </CodeWrapper>
        </Section>
      </div>
    </Modal>
  );
}

export default TokenModal;
