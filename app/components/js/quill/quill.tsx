"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./quill.module.scss";
export default function Quill({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: value,
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (editor && !isInitialized.current) {
      isInitialized.current = true;
      editor.commands.setContent(value);
      editor.commands.focus();
    }
  }, [value, editor]);

  return (
    <div className={styles.quill}>
      {/* Toolbar */}
      <div className={styles.top}>
        <span
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={styles.btn}
        >
          Bold
        </span>
        <span
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={styles.btn}
        >
          Italic
        </span>

        <span
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={styles.btn}
        >
          Strike
        </span>
        <span
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={styles.btn}
        >
          H1
        </span>
        <span
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={styles.btn}
        >
          H2
        </span>
        <span
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={styles.btn}
        >
          • List
        </span>
        <span
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={styles.btn}
        >
          1. List
        </span>
        <input
          type="color"
          onChange={(e) =>
            editor?.chain().focus().setColor(e.target.value).run()
          }
          className={styles.btn}
        />
      </div>

      {/* Editor Content */}
      <div className={styles.bottom}>
        {editor ? <EditorContent editor={editor} /> : <p>Loading editor...</p>}
      </div>
    </div>
  );
}
