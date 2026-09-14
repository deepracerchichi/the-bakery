"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
  extensions: [StarterKit],
  content,
  immediatelyRender: false,
  shouldRerenderOnTransaction: true,
  onUpdate: ({ editor }) => {
    onChange(editor.getHTML());
  },
});

  if (!editor) return null;

  return (
    <div className="border border-brand-maroon/30 rounded-lg focus-within:ring-2 focus-within:ring-brand-maroon transition-shadow">
      <div className="flex gap-2 border-b border-brand-maroon/30 p-2">
        <button
        aria-pressed={editor.isActive("bold")}
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded border border-brand-maroon/30 font-bold text-sm cursor-pointer transition-colors ${
            editor.isActive("bold") ? "bg-brand-maroon text-white" : "bg-white text-brand-maroon hover:bg-brand-pink"
        }`}
        >
        Bold
        </button>
        <button 
        aria-pressed={editor.isActive("italic")}
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded border border-brand-maroon/30 italic text-sm cursor-pointer transition-colors ${
            editor.isActive("italic") ? "bg-brand-maroon text-white" : "bg-white text-brand-maroon hover:bg-brand-pink"
        }`}
        >
        Italic
        </button>
      </div>
      
  {/* toolbar */}
  <EditorContent
    editor={editor}
    className="p-4 min-h-75 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-70"
  />

    </div>
  );
}