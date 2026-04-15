import React, { useState, createContext, useContext } from "react";
import { StyledButton, ColorDot, Container } from "./styles";
import { BADGE_COLORS } from "../badge/constant";

const AccordionContext = createContext();

const Accordion = ({
  title,
  children,
  isDefaultOpen = false,
  className = "w-md",
  type,
  checkable,
  checked,
  onCheck,
  checkDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const canOpen = React.Children.count(children) > 0;

  const clickHandler = () => {
    if (checkable && !checkDisabled) {
      onCheck?.();
    } else if (canOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <AccordionContext.Provider value={{ isOpen }}>
      <Container className={className} $type={type}>
        <div className="w-full flex items-center">
          <StyledButton
            onClick={clickHandler}
            $canOpen={canOpen}
            $type={type}
            $checkDisabled={checkable && checkDisabled}
          >
            <>
              <div className="flex items-center gap-2">
                {(checkable && (
                  <span
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!checkDisabled) onCheck?.();
                    }}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={!!checked}
                      disabled={checkDisabled}
                      style={{
                        accentColor: BADGE_COLORS[type]?.primary || "#6366f1",
                        cursor: checkDisabled ? "not-allowed" : "pointer",
                        width: 14,
                        height: 14,
                      }}
                    />
                  </span>
                )) ||
                  (type && <ColorDot $type={type} />)}
                <span className="font-semibold text-slate-700 pr-5">
                  {title}
                </span>
              </div>
            </>
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {canOpen && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              )}
            </svg>
          </StyledButton>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-5 pt-0 text-slate-600 leading-relaxed">
              <div className="mt-4 flex flex-col gap-2">{children}</div>
            </div>
          </div>
        </div>
      </Container>
    </AccordionContext.Provider>
  );
};

function Item({ title, children }) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("Accordion.Item must be used within an Accordion");

  return (
    <div className="p-3 bg-[#fde2e2] rounded-lg border border-gray-100 text-[#7c2026]">
      {title && <p className="font-medium">{title}</p>}
      {children}
    </div>
  );
}

Accordion.Item = Item;
export default Accordion;
