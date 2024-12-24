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
    <div className={`${bubbleClass} prose prose-base max-w-none prose-strong:font-bold prose-p:m-0`}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default MarkdownRenderer;
