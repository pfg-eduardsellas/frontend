import { useEffect, useRef, useState } from "react";
import Button from "../../../../components/button";
import {
  Container,
  Wrapper,
  TitleBar,
  Title,
  Count,
  LogsWrapper,
  LogLine,
} from "./styles";

function formatLog(log) {
  if (typeof log === "string") return log;
  const time = log.timestamp
    ? new Date(log.timestamp).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;
  const level = log.level ? `[${log.level.toUpperCase()}] ` : "";
  const prefix = time ? `${time} ${level}` : level;
  return `${prefix}${log.message ?? JSON.stringify(log)}`;
}

function logLevel(log) {
  if (typeof log === "string") return "info";
  return log.level ?? "info";
}

const ANIM_MS = 220;

function ScanTerminal({ logs = [], isActive }) {
  const endRef = useRef(null);
  const [minimized, setMinimized] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!minimized) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs.length, minimized]);

  const handleMinimize = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setMinimized(true);
    }, ANIM_MS);
  };

  if (minimized) {
    return (
      <Button variant="terminal-tab" onClick={() => setMinimized(false)}>
        <i className="fa-solid fa-angle-down"></i> logs
        <Count style={{ color: "#94a3b8", marginLeft: 0 }}>{logs.length}</Count>
      </Button>
    );
  }

  return (
    <Container $closing={closing}>
      <Wrapper>
        <TitleBar>
          <Title>logs</Title>
          <Count>{logs.length} lines</Count>
          <Button variant="minimize" onClick={handleMinimize} title="Minimizar" style={{ marginLeft: 8 }}>
            <i className="fa-solid fa-angle-down"></i>
          </Button>
        </TitleBar>

        <LogsWrapper>
          {logs.length === 0 && (
            <LogLine $level="debug">
              {isActive ? "Waiting for logs..." : "No logs available."}
            </LogLine>
          )}
          {logs.map((log, i) => (
            <LogLine key={i} $level={logLevel(log)}>
              {formatLog(log)}
            </LogLine>
          ))}
          <div ref={endRef} />
        </LogsWrapper>
      </Wrapper>
    </Container>
  );
}

export default ScanTerminal;
