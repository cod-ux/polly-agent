import { useEffect, useState } from "react";
import { marked } from "marked";

interface MdProps {
  content: string;
  bubbleClass: string;
}

const MarkdownRenderer: React.FC<MdProps> = ({
  content,
  bubbleClass,
}: MdProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const renderedHtml = marked(content) as string;
    setHtml(renderedHtml);
  }, [content]);

  return (
    <p className={bubbleClass} dangerouslySetInnerHTML={{ __html: html }}></p>
  );
};

export default MarkdownRenderer;
