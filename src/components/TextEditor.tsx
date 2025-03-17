"use client";

import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Heading, { Level } from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import {
  MdFormatQuote,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiH6 } from "react-icons/ri";
import { VscListOrdered } from "react-icons/vsc";
import ButtonEditor from "./buttons/ButtonEditor";
import clsx from "clsx";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const headingIcon = [RiH1, RiH2, RiH3, RiH4, RiH5, RiH6];

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Blockquote,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div
      className={clsx(
        "-z-10 rounded border bg-white p-4",
        disabled && "opacity-55",
      )}
    >
      <div className="mb-3 flex flex-wrap gap-1">
        {headingIcon.map((Icon, idx) => (
          <ButtonEditor
            key={idx}
            type="heading"
            editor={editor}
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: (idx + 1) as Level })
                .run()
            }
            heading={idx + 1}
          >
            <Icon />
          </ButtonEditor>
        ))}

        <ButtonEditor
          type="bold"
          editor={editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <MdOutlineFormatBold />
        </ButtonEditor>

        <ButtonEditor
          type="italic"
          editor={editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <MdOutlineFormatItalic />
        </ButtonEditor>

        <ButtonEditor
          type="bulletList"
          editor={editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <MdOutlineFormatListBulleted />
        </ButtonEditor>

        <ButtonEditor
          type="orderedList"
          editor={editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <VscListOrdered />
        </ButtonEditor>

        <ButtonEditor
          type="blockquote"
          editor={editor}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <MdFormatQuote />
        </ButtonEditor>
      </div>

      <EditorContent name="content" editor={editor} />
    </div>
  );
};

export default TextEditor;
