"use client";

import React, { useRef, useState, useEffect, ChangeEvent, MouseEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  UploadCloud,
} from "lucide-react";
import Link from "next/link";

const FONT_SIZES = [12, 13, 14, 16, 18, 20, 24, 28, 32];

interface RichTextFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

function Divider() {
  return <span className="w-px h-5 bg-slate-200 mx-1.5 flex-shrink-0" />;
}

function RichTextField({
  label,
  required = true,
  placeholder = "What's on your mind?",
  value,
  onChange,
}: RichTextFieldProps) {
  const editableRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  // Set the editor's initial content ONCE on mount (e.g. prefilled edit data).
  // We intentionally do NOT keep this in sync with `value` on every render —
  // doing so (e.g. via dangerouslySetInnerHTML tied to `value`) resets the
  // div's HTML on every keystroke, which resets the cursor to the start and
  // makes typed text appear to insert backwards.
  useEffect(() => {
    if (editableRef.current && value) {
      editableRef.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitChange = () => {
    if (editableRef.current) onChange(editableRef.current.innerHTML);
  };

  const exec = (command: string, commandValue?: string) => {
    editableRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const handleCode = () => {
    editableRef.current?.focus();
    const selection = window.getSelection();
    const text = selection && selection.toString();
    document.execCommand(
      "insertHTML",
      false,
      `<code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-family:monospace;">${
        text || "code"
      }</code>`,
    );
    emitChange();
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      editableRef.current?.focus();
      document.execCommand("insertImage", false, reader.result as string);
      emitChange();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      editableRef.current?.focus();
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${reader.result}" download="${file.name}" style="color:#3b82f6;text-decoration:underline;">📎 ${file.name}</a>&nbsp;`,
      );
      emitChange();
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
    if (editableRef.current) editableRef.current.style.fontSize = `${next}px`;
    editableRef.current?.focus();
  };

  const preventFocusLoss = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const addTag = () => {
    const trimmed = tagDraft.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagDraft("");
    setShowTagInput(false);
  };

  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex flex-wrap items-center gap-0.5 md:gap-1 px-2 md:px-3 py-2 border-b border-slate-100">
          <button
            type="button"
            title="Text color"
            onMouseDown={preventFocusLoss}
            onClick={() => colorInputRef.current?.click()}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Baseline className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <input
            ref={colorInputRef}
            type="color"
            className="hidden"
            onChange={e => exec("foreColor", e.target.value)}
          />
          <button
            type="button"
            title="Clear formatting"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("removeFormat")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Eraser className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          <button
            type="button"
            title="Bold"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("bold")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Bold className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("italic")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Italic className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("underline")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Underline className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("strikeThrough")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
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
            onClick={() => exec("justifyLeft")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <AlignLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Align center"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("justifyCenter")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <AlignCenter className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Align right"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("justifyRight")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
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
                onClick={() => exec("formatBlock", `H${i + 1}`)}
                className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
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
            onClick={() => exec("insertOrderedList")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Bullet list"
            onMouseDown={preventFocusLoss}
            onClick={() => exec("insertUnorderedList")}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <List className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          <Divider />

          <button
            type="button"
            title="Attach"
            onMouseDown={preventFocusLoss}
            onClick={() => attachInputRef.current?.click()}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Code"
            onMouseDown={preventFocusLoss}
            onClick={handleCode}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Code className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            title="Image"
            onMouseDown={preventFocusLoss}
            onClick={() => imageInputRef.current?.click()}
            className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
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
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={emitChange}
          style={{ fontSize: `${fontSize}px` }}
          className="w-full min-h-[140px] md:min-h-[160px] px-3 md:px-4 py-3 text-slate-700 focus:outline-none
            empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400
            [&_h1]:text-xl [&_h1]:font-bold [&_h1]:my-1
            [&_h2]:text-lg [&_h2]:font-bold [&_h2]:my-1
            [&_h3]:text-base [&_h3]:font-bold [&_h3]:my-1
            [&_h4]:text-sm [&_h4]:font-bold [&_h4]:my-1
            [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:my-1
            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
            [&_a]:text-blue-500 [&_a]:underline
            [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2"
        />
      </div>
    </div>
  );
}

interface TextInputFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

function TextInputField({
  label,
  required = true,
  placeholder,
  value,
  onChange,
}: TextInputFieldProps) {
  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
      />
    </div>
  );
}

interface FormState {
  businessName: string;
  ownerName: string;
  story: string;
  mission: string;
  website: string;
  communityImpact: string;
  revenueStage: string;
  whyCompete: string;
}

function CreateBusinessForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editData = searchParams.get("edit");

  const parseEditData = (): FormState | null => {
    if (!editData) return null;
    try {
      return JSON.parse(decodeURIComponent(editData));
    } catch {
      return null;
    }
  };

  const prefill = parseEditData();
  const isEditing = !!prefill;

  const [form, setForm] = useState<FormState>(
    prefill ?? {
      businessName: "",
      ownerName: "",
      story: "",
      mission: "",
      website: "",
      communityImpact: "",
      revenueStage: "",
      whyCompete: "",
    },
  );
  const [photoName, setPhotoName] = useState<string | null>(null);

  const updateField = (key: keyof FormState) => (value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoName(file.name);
  };

  const handleSave = () => {
    console.log("Saving form", form, photoName);
    router.push("/dashboard/boss_beginning/business");
  };

  return (
    <div className="min-h-screen bg-white rounded-xl py-4 px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
            {isEditing ? "Edit Business" : "Create Business"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isEditing
              ? "Update your business information below"
              : "Fill in the details to register your business"}
          </p>
        </div>
        <Link href="/dashboard/boss_beginning/business">
          <button
            type="button"
            className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            Back to list
          </button>
        </Link>
      </div>

      <div className="space-y-5">
        <TextInputField
          label="Business Name"
          placeholder="Enter your business name"
          value={form.businessName}
          onChange={updateField("businessName")}
        />

        <TextInputField
          label="Owner / Founder Name"
          placeholder="Your name"
          value={form.ownerName}
          onChange={updateField("ownerName")}
        />

        <RichTextField
          label="Story"
          value={form.story}
          onChange={updateField("story")}
        />

        <RichTextField
          label="Mission"
          value={form.mission}
          onChange={updateField("mission")}
        />

        <RichTextField
          label="Website/social media"
          value={form.website}
          onChange={updateField("website")}
        />

        <RichTextField
          label="Community impact statement"
          value={form.communityImpact}
          onChange={updateField("communityImpact")}
        />

        <RichTextField
          label="Revenue stage"
          value={form.revenueStage}
          onChange={updateField("revenueStage")}
        />

        <RichTextField
          label="Why they deserve to compete"
          value={form.whyCompete}
          onChange={updateField("whyCompete")}
        />

        <div>
          <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
            Photo/Video<span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-white py-8 md:py-10 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <UploadCloud className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
            <span className="text-sm md:text-base text-slate-600">
              {photoName ?? "Click to upload image"}
            </span>
            <span className="text-xs md:text-sm text-slate-400">
              PNG, JPG up to 10MB
            </span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white text-sm md:text-base font-medium px-6 py-2.5 md:px-10 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            {isEditing ? "Update" : "Save"}
          </button>
          <Link href="/dashboard/boss_beginning/business">
            <button
              type="button"
              className="text-sm md:text-base font-medium px-6 py-2.5 md:px-10 md:py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
      <CreateBusinessForm />
    </Suspense>
  );
}