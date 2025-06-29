import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="border border-border rounded-[20px] overflow-hidden mb-4">
      <div className={`accordion ${show && "active"} ${className}`}>
        <button className="accordion-header" onClick={() => setShow(!show)}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
          <svg
            className="accordion-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              fill="#101010"
              d="m11 0 1.556 9.444L22 11l-9.444 1.556L11 22l-1.556-9.444L0 11l9.444-1.556z"
              opacity=".5"
            />
          </svg>
        </button>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
