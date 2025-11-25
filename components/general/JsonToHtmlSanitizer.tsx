"use client";

import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

export function JsonToHtmlSanitizer({ json }: { json: JSONContent | null }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full focus:outline-none dark:prose-invert",
      },
    },
    editable: false,
    content: json ?? "",

    // content: field.value ? JSON.parse(field.value) : "",
  });

  return <EditorContent editor={editor} />;
}
