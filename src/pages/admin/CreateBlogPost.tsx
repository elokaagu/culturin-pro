"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Eye, Upload, Plus, Trash2 } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { blogPosts } from "@/data/blogPosts";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string[];
}

const CreateBlogPost = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    content: [""],
  });
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setAnimateItems(true);
    document.title = "Create New Blog Post | Admin - Culturin";
  }, []);

  const categories = [...new Set(blogPosts.map((post) => post.category))];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // In a real application, this would make an API call to create the post
    console.log("Creating blog post:", formData);
    alert(
      "Blog post created successfully! (In a real app, this would save to the database)"
    );
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
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
                        <Label htmlFor="date">Publication Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="image">Featured Image URL</Label>
                        <Input
                          id="image"
                          type="url"
                          value={formData.image}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              image: e.target.value,
                            }))
                          }
                          placeholder="https://example.com/image.jpg"
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

                  {/* Submit */}
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/admin/blog">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Blog Post
                    </Button>
                  </div>
                </form>
              ) : (
                /* Preview */
                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Preview</h2>
                  <article className="prose prose-lg max-w-none">
                    {formData.image && (
                      <img
                        src={formData.image}
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
                      {formData.date && (
                        <span className="text-gray-500 text-sm">
                          {new Date(formData.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
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
