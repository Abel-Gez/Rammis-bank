"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type BlogFormProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  editingPost: any | null;
  onSave: (formData: FormData, editingPost: any | null) => Promise<void>;
};

export default function BlogForm({
  open,
  setOpen,
  editingPost,
  onSave,
}: BlogFormProps) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    featured: false,
    image: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title || "",
        excerpt: editingPost.excerpt || "",
        content: editingPost.content || "",
        category: editingPost.category || "",
        author: editingPost.author || "",
        featured: editingPost.featured || false,
        image: null,
      });
    } else {
      setForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "",
        featured: false,
        image: null,
      });
    }
    setErrors({});
  }, [editingPost]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    setErrors({ ...errors, image: "" });
  }

  function validateForm() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (!form.author.trim()) newErrors.author = "Author name is required.";
    if (!form.excerpt.trim()) newErrors.excerpt = "Excerpt cannot be empty.";
    if (!form.content.trim()) newErrors.content = "Content cannot be empty.";
    return newErrors;
  }

  async function handleSubmit() {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any);
    });

    try {
      await onSave(formData, editingPost);
      setOpen(false);
    } catch (err) {
      alert("❌ Error saving post — please check permissions or upload settings.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {editingPost ? "Edit Blog Post" : "New Blog Post"}
          </DialogTitle>
          <DialogDescription>
            Provide the article details and optional image. Fields marked required must be completed before saving.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-3">
          <div>
            <Input
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          </div>

          <div>
            <Input
              placeholder="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>

          <div>
            <Input
              placeholder="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
              className={errors.author ? "border-red-500" : ""}
            />
            {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
          </div>

          <div>
            <Textarea
              placeholder="Excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className={errors.excerpt ? "border-red-500" : ""}
            />
            {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt}</p>}
          </div>

          <div>
            <Textarea
              placeholder="Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
          </div>

          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <DialogFooter className="mt-5">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-rammisBlue hover:bg-rammisBlue/90 text-white transition-colors"
          >
            {submitting
              ? "Saving..."
              : editingPost
              ? "Update Post"
              : "Save Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
