import { useState } from "react";
import Modal from "../../../../components/modal";
import {
  FormBody,
  Field,
  Input,
  TextArea,
  Row,
  CheckboxRow,
  AdvancedSection,
  ErrorText,
  PrimaryButton,
  SecondaryButton,
} from "./styles";

function NewScanModal({ isOpen, onClose, onScanCreated, onLogout }) {
  const [url, setUrl] = useState("");
  const [maxPages, setMaxPages] = useState(15);
  const [maxDepth, setMaxDepth] = useState(3);
  const [maxActions, setMaxActions] = useState(50);
  const [inDomain, setInDomain] = useState(false);
  const [formDataRaw, setFormDataRaw] = useState("");
  const [formDataError, setFormDataError] = useState(null);
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setUrl("");
    setMaxPages(15);
    setMaxDepth(3);
    setMaxActions(50);
    setInDomain(false);
    setFormDataRaw("");
    setFormDataError(null);
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!url.trim()) return;

    let form_data = null;
    if (formDataRaw.trim()) {
      try {
        form_data = JSON.parse(formDataRaw);
        setFormDataError(null);
      } catch {
        setFormDataError("Invalid JSON in Form Data");
        return;
      }
    }

    setLaunching(true);
    setError(null);
    try {
      const res = await fetch("/api/scans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          target_url: url.trim(),
          max_pages: maxPages,
          max_depth: maxDepth,
          max_actions: maxActions,
          in_domain: inDomain,
          form_data,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) onLogout?.();
        throw new Error(`HTTP ${res.status}`);
      }

      const newScan = await res.json();
      onScanCreated?.(newScan);
      handleClose();
    } catch (e) {
      setError(`Failed to start scan: ${e.message}`);
    } finally {
      setLaunching(false);
    }
  };

  const footer = (
    <>
      <SecondaryButton onClick={handleClose} disabled={launching}>
        Cancel
      </SecondaryButton>
      <PrimaryButton
        onClick={handleSubmit}
        disabled={launching || !url.trim()}
      >
        {launching ? "Launching…" : "Start scan"}
      </PrimaryButton>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New scan"
      size="md"
      footer={footer}
    >
      <FormBody>
        <Field>
          Target URL
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={launching}
            autoFocus
          />
        </Field>

        <AdvancedSection>
          <Row>
            <Field style={{ flex: 1 }}>
              Max pages
              <Input
                type="number"
                min={1}
                max={100}
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                disabled={launching}
              />
            </Field>
            <Field style={{ flex: 1 }}>
              Max depth
              <Input
                type="number"
                min={1}
                max={20}
                value={maxDepth}
                onChange={(e) => setMaxDepth(Number(e.target.value))}
                disabled={launching}
              />
            </Field>
            <Field style={{ flex: 1 }}>
              Max actions
              <Input
                type="number"
                min={1}
                max={500}
                value={maxActions}
                onChange={(e) => setMaxActions(Number(e.target.value))}
                disabled={launching}
              />
            </Field>
          </Row>

          <CheckboxRow>
            <input
              type="checkbox"
              checked={inDomain}
              onChange={(e) => setInDomain(e.target.checked)}
              disabled={launching}
            />
            Only scan URLs within the same domain
          </CheckboxRow>

          <Field>
            Form Data (JSON)
            <TextArea
              placeholder={'{\n  "field": "value"\n}'}
              value={formDataRaw}
              onChange={(e) => {
                setFormDataRaw(e.target.value);
                setFormDataError(null);
              }}
              disabled={launching}
            />
            {formDataError && <ErrorText>{formDataError}</ErrorText>}
          </Field>
        </AdvancedSection>

        {error && <ErrorText>⚠ {error}</ErrorText>}
      </FormBody>
    </Modal>
  );
}

export default NewScanModal;
