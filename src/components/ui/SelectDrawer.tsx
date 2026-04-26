"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectDrawerProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  className?: string;
}

export function SelectDrawer({
  value,
  onChange,
  options,
  label,
  placeholder,
  className = "",
}: SelectDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fc-input flex h-10 w-full items-center justify-between py-2"
        type="button"
      >
        <span className="text-foreground">{selectedOption?.label || placeholder}</span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
        >
          <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg">
          <div className="max-h-56 overflow-y-auto py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${
                  value === option.value
                    ? "bg-primary-subtle text-primary font-medium"
                    : "text-foreground hover:bg-muted hover:text-foreground"
                }`}
                type="button"
              >
                {value === option.value && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
