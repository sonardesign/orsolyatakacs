"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }: any) => {
          console.log(image);
          return (
            <image href={image.url} width={image.width} height={image.height} />
          );
        },
      }}
    />
  );
}
