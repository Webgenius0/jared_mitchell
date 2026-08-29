"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import {
  Baseline,
  Eraser,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ChevronUp,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  ListOrdered,
  List,
  Paperclip,
  Code,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

const FONT_SIZES = [12, 13, 14, 16, 18, 20, 24, 28, 32];

export interface RichTextEditorProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/** Checks whether a rich text HTML value is effectively empty (e.g. "<p></p>"). */
export const isRichTextEmpty = (html: string): boolean => {
  if (!html) return true;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text === "";
};

/**
 * Link extension extended with a `download` attribute so attached files
 * keep their original download behavior.
 */
const LinkWithDownload = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      download: {
        default: null,
        parseHTML: element => element.getAttribute("download"),
        renderHTML: attributes =>
          attributes.download ? { download: attributes.download } : {},
      },
    };
  },
});

function Divider() {
  return <span className="w-px h-5 bg-slate-200 mx-1.5 flex-shrink-0" />;
}

const RichTextEditor = ({
  label,
  required = true,
  placeholder = "What's on your mind?",
  value,
  onChange,
  error,
}: RichTextEditorProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  // Keep the latest onChange in a ref so the editor callback never goes stale.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
      UnderlineExtension,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
      LinkWithDownload.configure({ openOnClick: false, autolink: false }),
      Placeholder.configure({ placeholder }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value || "",
    onUpdate: ({ editor }) => onChangeRef.current(editor.getHTML()),
  });

  // Sync external value changes (e.g. form reset while editing) without
  // clobbering the cursor on every keystroke.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const preventFocusLoss = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    editor?.chain().focus().setColor(e.target.value).run();
  };

  const handleClearFormatting = () => {
    editor?.chain().focus().unsetAllMarks().clearNodes().run();
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      editor
        ?.chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const safeName = file.name.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      editor
        ?.chain()
        .focus()
        .insertContent(
          `<a href="${reader.result}" download="${safeName}">📎 ${safeName}</a>&nbsp;`,
        )
        .run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleFontSizeStep = (dir: 1 | -1) => {
    const idx = FONT_SIZES.indexOf(fontSize);
    const nextIdx = Math.min(Math.max(idx + dir, 0), FONT_SIZES.length - 1);
    const next =
      FONT_SIZES[
        nextIdx === -1 ? (dir === 1 ? 0 : FONT_SIZES.length - 1) : nextIdx
      ];
    setFontSize(next);
    editor?.chain().focus().run();
  };

  const addTag = () => {
    const trimmed = tagDraft.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagDraft("");
    setShowTagInput(false);
  };

  const toolbarBtn =
    "w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors";

  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`bg-white border overflow-hidden ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        <div className="flex flex-wrap items-center gap-0.5 md:gap-1 px-2 md:px-3 py-2 border-b border-slate-100">
          <button
            type="button"
            title="Text color"
            onMouseDown={preventFocusLoss}
            onClick={() => colorInputRef.current?.click()}
            className={toolbarBtn}
          >
            <Baseline className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <input
            ref={colorInputRef}
            type="color"
            className="hidden"
            onChange={handleColorChange}
          />
          <button
            type="button"
            title="Clear formatting"
            onMouseDown={preventFocusLoss}
            onClick={handleClearFormatting}
            className={toolbarBtn}
          >
            <Eraser className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          <button
            type="button"
            title="Bold"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={toolbarBtn}
          >
            <Bold className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={toolbarBtn}
          >
            <Italic className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={toolbarBtn}
          >
            <Underline className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={toolbarBtn}
          >
            <Strikethrough className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          <div className="flex items-center gap-1 px-1.5 h-7 md:h-8 rounded-md text-slate-600 text-xs md:text-sm">
            <span className="w-4 text-center tabular-nums">{fontSize}</span>
            <div className="flex flex-col -space-y-1">
              <button
                type="button"
                title="Increase font size"
                onMouseDown={preventFocusLoss}
                onClick={() => handleFontSizeStep(1)}
                className="text-slate-400 hover:text-slate-700"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                type="button"
                title="Decrease font size"
                onMouseDown={preventFocusLoss}
                onClick={() => handleFontSizeStep(-1)}
                className="text-slate-400 hover:text-slate-700"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <Divider />

          <button
            type="button"
            title="Align left"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={toolbarBtn}
          >
            <AlignLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Align center"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={toolbarBtn}
          >
            <AlignCenter className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Align right"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={toolbarBtn}
          >
            <AlignRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          {[Heading1, Heading2, Heading3, Heading4, Heading5].map(
            (HIcon, i) => (
              <button
                key={i}
                type="button"
                title={`Heading ${i + 1}`}
                onMouseDown={preventFocusLoss}
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: (i + 1) as 1 | 2 | 3 | 4 | 5 })
                    .run()
                }
                className={toolbarBtn}
              >
                <HIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            ),
          )}

          <Divider />

          <button
            type="button"
            title="Numbered list"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={toolbarBtn}
          >
            <ListOrdered className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Bullet list"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={toolbarBtn}
          >
            <List className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          <button
            type="button"
            title="Attach"
            onMouseDown={preventFocusLoss}
            onClick={() => attachInputRef.current?.click()}
            className={toolbarBtn}
          >
            <Paperclip className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Code"
            onMouseDown={preventFocusLoss}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            className={toolbarBtn}
          >
            <Code className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Image"
            onMouseDown={preventFocusLoss}
            onClick={() => imageInputRef.current?.click()}
            className={toolbarBtn}
          >
            <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageFile}
          />
          <input
            ref={attachInputRef}
            type="file"
            className="hidden"
            onChange={handleAttachFile}
          />

          <Divider />

          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs md:text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
              >
                {t}
                <button
                  type="button"
                  onClick={() =>
                    setTags(prev => prev.filter((_, idx) => idx !== i))
                  }
                  className="hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {showTagInput ? (
              <input
                autoFocus
                value={tagDraft}
                onChange={e => setTagDraft(e.target.value)}
                onKeyDown={e =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                onBlur={addTag}
                placeholder="Add tag"
                className="text-xs md:text-sm border border-slate-200 rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
            ) : (
              <button
                type="button"
                onMouseDown={preventFocusLoss}
                onClick={() => setShowTagInput(true)}
                className="flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <span className="font-semibold text-[13px] md:text-sm">T</span>
                Tags
              </button>
            )}
          </div>
        </div>

        <div
          className="rich-editor [&_.ProseMirror]:min-h-[140px] md:[&_.ProseMirror]:min-h-[160px] [&_.ProseMirror]:px-3 md:[&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3 [&_.ProseMirror]:text-slate-700 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:my-1 [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:my-1 [&_.ProseMirror_h3]:text-base [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:my-1 [&_.ProseMirror_h4]:text-sm [&_.ProseMirror_h4]:font-bold [&_.ProseMirror_h4]:my-1 [&_.ProseMirror_h5]:text-sm [&_.ProseMirror_h5]:font-semibold [&_.ProseMirror_h5]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_a]:text-blue-500 [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-2"
          style={{ fontSize: `${fontSize}px` }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-xs md:text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default RichTextEditor;
