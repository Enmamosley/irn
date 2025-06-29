import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
  icon,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
  icon?: boolean;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      } ${icon ? "w-fit flex items-center" : ""}`}
    >
      {icon && (
        <svg
          className="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="m15 10 5 5-5 5" />
          <path d="M4 4v7a4 4 0 0 0 4 4h12" />
        </svg>
      )}

      {label}
    </a>
  );
};

export default Button;
