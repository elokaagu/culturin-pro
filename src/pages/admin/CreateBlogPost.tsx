"use client";

import React, { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { ImageUploader } from "@/components/ui/image-uploader";
import { createBlogPost, generateSlug, isSlugUnique } from "@/lib/blog-service";
import { useAuth } from "../../components/auth/AuthProvider";
import Image from "@/components/ui/image";
import type { CreateBlogPostData } from "@/lib/blog-service";

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string[];
  meta_title: string;
  meta_description: string;
  tags: string[];
  published: boolean;
  featured_image: File | null;
}

const CreateBlogPost = () => {
  const { user } = useAuth();
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [formData, setFormData] = useState<BlogPostForm>({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    content: [""],
    meta_title: "",
    meta_description: "",
    tags: [],
    published: false,
    featured_image: null,
  });
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Create New Blog Post | Admin - Culturin";
  }, []);

  const categories = [
    "Travel Tips",
    "Cultural Experiences",
    "Destination Guides",
    "Food & Cuisine",
    "Adventure Travel",
    "Sustainable Tourism",
    "Local Insights",
  ];

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...formData.content];
    newContent[index] = value;
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const addContentParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, ""],
    }));
  };

  const removeContentParagraph = (index: number) => {
    if (formData.content.length > 1) {
      const newContent = formData.content.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, content: newContent }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.category ||
      !formData.content[0]
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if slug is unique
    const slugUnique = await isSlugUnique(formData.slug);
    if (!slugUnique) {
      alert("This slug is already in use. Please choose a different one.");
      return;
    }

    try {
      setLoading(true);

      if (!user) {
        alert("You must be logged in to create a blog post.");
        return;
      }

      const blogPostData: CreateBlogPostData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content.filter((p) => p.trim() !== ""),
        category: formData.category,
        author_id: user.id,
        author_name: user.name,
        author_email: user.email,
        featured_image: formData.featured_image,
        published: formData.published,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt,
        tags: formData.tags,
      };

      const result = await createBlogPost(blogPostData);

      if (result) {
        alert("Blog post created successfully!");
        // Reset form
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          category: "",
          content: [""],
          meta_title: "",
          meta_description: "",
          tags: [],
          published: false,
          featured_image: null,
        });
        setTagInput("");
      } else {
        alert("Failed to create blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("An error occurred while creating the blog post.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Link
                to="/admin/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog Management
              </Link>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Create New Blog Post
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600">
                    Write and publish a new article for your blog.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isPreview ? "Edit" : "Preview"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {!isPreview ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter blog post title"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          type="text"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              slug: e.target.value,
                            }))
                          }
                          placeholder="url-friendly-slug"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Will be: /blog/{formData.slug || "your-slug-here"}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                          <option value="new">Add New Category...</option>
                        </select>
                      </div>

                      <div>
                        <Label>
                          <input
                            type="checkbox"
                            checked={formData.published}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                published: e.target.checked,
                              }))
                            }
                            className="mr-2"
                          />
                          Publish immediately
                        </Label>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="featured-image">Featured Image</Label>
                        <ImageUploader
                          onImageSelect={(file) =>
                            setFormData((prev) => ({
                              ...prev,
                              featured_image: file,
                            }))
                          }
                          currentImageUrl={
                            formData.featured_image
                              ? URL.createObjectURL(formData.featured_image)
                              : undefined
                          }
                          className="mt-2"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="excerpt">Excerpt *</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              excerpt: e.target.value,
                            }))
                          }
                          placeholder="Brief description of the blog post..."
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Content */}
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Content</h2>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addContentParagraph}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Paragraph
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {formData.content.map((paragraph, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <Label htmlFor={`content-${index}`}>
                                Paragraph {index + 1} {index === 0 && "*"}
                              </Label>
                              <Textarea
                                id={`content-${index}`}
                                value={paragraph}
                                onChange={(e) =>
                                  handleContentChange(index, e.target.value)
                                }
                                placeholder={`Enter paragraph ${
                                  index + 1
                                } content...`}
                                rows={4}
                                required={index === 0}
                              />
                            </div>
                            {formData.content.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeContentParagraph(index)}
                                className="mt-6 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Tags */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Tags</h2>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagInputKeyPress}
                          placeholder="Enter a tag and press Enter"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                        >
                          Add Tag
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* SEO Settings */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">SEO Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                          id="meta_title"
                          type="text"
                          value={formData.meta_title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              meta_title: e.target.value,
                            }))
                          }
                          placeholder={
                            formData.title || "Leave empty to use post title"
                          }
                          maxLength={60}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {formData.meta_title.length}/60 characters
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="meta_description">
                          Meta Description
                        </Label>
                        <Textarea
                          id="meta_description"
                          value={formData.meta_description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              meta_description: e.target.value,
                            }))
                          }
                          placeholder={
                            formData.excerpt ||
                            "Leave empty to use post excerpt"
                          }
                          rows={3}
                          maxLength={160}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {formData.meta_description.length}/160 characters
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Submit */}
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/admin/blog">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {loading ? "Creating..." : "Create Blog Post"}
                    </Button>
                  </div>
                </form>
              ) : (
                /* Preview */
                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Preview</h2>
                  <article className="prose prose-lg max-w-none">
                    {formData.featured_image && (
                      <img
                        src={URL.createObjectURL(formData.featured_image)}
                        alt={formData.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      {formData.category && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {formData.category}
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {formData.published && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          Published
                        </span>
                      )}
                    </div>

                    <h1 className="text-4xl font-bold mb-4">
                      {formData.title || "Blog Post Title"}
                    </h1>

                    {formData.excerpt && (
                      <p className="text-xl text-gray-600 mb-8 italic">
                        {formData.excerpt}
                      </p>
                    )}

                    <div className="space-y-4">
                      {formData.content.map(
                        (paragraph, index) =>
                          paragraph && (
                            <p
                              key={index}
                              className="text-gray-800 leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          )
                      )}
                    </div>
                  </article>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default CreateBlogPost;
