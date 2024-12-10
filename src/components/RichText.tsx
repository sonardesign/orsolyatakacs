import React from "react";

export interface Block {
  type: string;
  children: {
    type: string;
    text: string;
    bold?: boolean;
  }[];
  level?: number;
}

interface RichTextProps {
  content: Block[];
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
  const RenderBlock = ({ block }: { block: Block }) => {
    switch (block.type) {
      case "heading":
        return <h1>{block.children[0].text}</h1>;
      default:
        return <p>{block.children[0].text}</p>;
    }
  };

  return (
    <div className="rich-text">
      {content.map((block) => (
        <RenderBlock key={block.type} block={block} />
      ))}
    </div>
  );
};

export default RichText;
