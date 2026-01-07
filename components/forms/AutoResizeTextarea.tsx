import React, { useRef, useEffect } from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

export const AutoResizeTextarea: React.FC<Props> = ({ value, className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      className={`resize-none overflow-hidden ${className}`}
      {...props}
      rows={1}
    />
  );
};