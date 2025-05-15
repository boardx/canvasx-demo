//@ts-nocheck
'use client';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';

import { XMarkdown, type XCanvas } from '@boardxus/canvasx-core';

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });
      const components = [
        new XMarkdown('Hello, **AI World2**!\n\n\n\n\n\n', {
          width: 500,
          height: 50,
        }),
        new XMarkdown('# Header\n- List Item 1\n- List Item 2\n\n\n\n\n\n', {
          width: 500,
          height: 100,
        }),
        new XMarkdown(
          'Here is some `inline code`.\n```\nfunction foo() { return "bar"; }\n```\n\n\n\n\n\n',
          { width: 500, height: 150 },
        ),
        new XMarkdown('> This is a blockquote \n\n\n\n\n\n\n', {
          width: 500,
          height: 50,
        }),
        new XMarkdown(
          '![Alt text](https://images.inc.com/uploaded_files/image/1920x1080/getty_691886452_405128.jpg)\n\n\n\n\n\n',
          { width: 500, height: 150 },
        ),
        new XMarkdown('[Google](https://www.google.com)', {
          width: 500,
          height: 50,
        }),
        new XMarkdown(
          '| Header 1 | Header 2 |\n| --- | --- |\n| Row 1 Col 1 | Row 1 Col 2 |\n| Row 2 Col 1 | Row 2 Col 2 |\n\n\n\n\n\n',
          { width: 500, height: 150 },
        ),
        new XMarkdown(
          '- Item 1\n  - Subitem 1\n  - Subitem 2\n- Item 2\n  - Subitem 1\n  - Subitem 2\n\n\n\n\n\n',
          { width: 500, height: 150 },
        ),
        new XMarkdown('Text above\n\n---\n\nText below\n\n\n\n\n\n', {
          width: 500,
          height: 150,
        }),
        new XMarkdown(
          '# Title\n## Subtitle\n\n- Point 1\n- Point 2\n\n> Quote\n\n[Link](https://example.com)\n\n\n\n\n\n',
          { width: 500, height: 300 },
        ),
      ];

      // const rows = Math.ceil(components.length / 4);
      const spacing = 20; // spacing between components

      components.forEach((component, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const left = col * (500 + spacing) + 250 + spacing; // 250 is half of 500 (centered)
        const top = row * (500 + spacing) + 250 + spacing; // 250 is half of 500 (centered)

        component.set({
          left: left,
          top: top,
          originX: 'center',
          originY: 'center',
        });
        canvas.add(component);
      });

      canvas.zoomToViewAllObjects();
      (canvas as any).on('text:changed', (e) => {
        const target = e.target;
        if (target instanceof XMarkdown) {
          target.setMarkdown(target.text);
        }
        // markdownText.setMarkdown(markdownText.text);
      });
    },
    [ref],
  );

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      <div
        style={{
          width: '100%',
          height: '75vh',
          margin: '0 auto',
          border: '1px solid #eee',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#fafbfc',
        }}
      >
        <Canvas ref={ref} onLoad={onLoad} />
      </div>

      {/* Description Section */}
      <div
        style={{
          marginTop: 48,
          marginBottom: 16,
          padding: 16,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2>Markdown Demo Description</h2>
        <p>
          This page demonstrates rendering and editing markdown content in CanvasX.
          You can use markdown widgets to add formatted text, lists, code blocks, and
          more to your canvas for documentation or presentation purposes.
        </p>
      </div>

      {/* Documentation Section */}
      <div
        style={{
          marginBottom: 48,
          padding: 16,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2>Markdown Widget Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX supports markdown rendering, allowing you to add rich text, lists,
          code, and other markdown features to your board. Markdown widgets are useful
          for notes, documentation, and formatted content.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li>
            <b>content</b>: string — The markdown content to render.
          </li>
          <li>
            <b>width</b>, <b>height</b>: number — The dimensions of the markdown
            widget.
          </li>
          <li>
            <b>top</b>, <b>left</b>: number — The position of the widget on the
            canvas.
          </li>
        </ul>
        <h3>Usage Example</h3>
        <pre
          style={{
            background: '#f6f8fa',
            padding: 12,
            borderRadius: 6,
          }}
        >
          {`const markdown = new XMarkdown('# Hello World\\nThis is **markdown** content.', {
  top: 100,
  left: 100,
  width: 400,
  height: 300,
});
canvas.add(markdown);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Use markdown for documentation, instructions, or formatted notes.</li>
          <li>Combine markdown with diagrams and images for presentations.</li>
          <li>Resize the widget to fit your content.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
