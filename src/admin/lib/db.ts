import { supabase } from "./supabase";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type Course = {
  id: string;
  title: string;
  tag: string;
  duration: string;
  seats: string;
  price: string;
  desc: string;
  bullets: string[];
  featured: boolean;
  created_at?: string;
};

export type Book = {
  id: string;
  title: string;
  desc: string;
  cover_url: string;
  amazon_url: string;
  tag: string;
  accent: string;
  created_at?: string;
};

export type Portfolio = {
  id: string;
  title: string;
  desc: string;
  image_url: string;
  cat: string;
  tags: string[];
  link?: string;
  accent: string;
  sort_order: number;
  created_at?: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string;
  category: string;
  published: boolean;
  created_at?: string;
};

// ─── COURSES ──────────────────────────────────────────────────────────────────

export const getCourses = () =>
  supabase.from("courses").select("*").order("created_at", { ascending: true });

export const createCourse = (data: Omit<Course, "id" | "created_at">) =>
  supabase.from("courses").insert(data).select().single();

export const updateCourse = (id: string, data: Partial<Course>) =>
  supabase.from("courses").update(data).eq("id", id).select().single();

export const deleteCourse = (id: string) =>
  supabase.from("courses").delete().eq("id", id);

// ─── BOOKS ────────────────────────────────────────────────────────────────────

export const getBooks = () =>
  supabase.from("books").select("*").order("created_at", { ascending: true });

export const createBook = (data: Omit<Book, "id" | "created_at">) =>
  supabase.from("books").insert(data).select().single();

export const updateBook = (id: string, data: Partial<Book>) =>
  supabase.from("books").update(data).eq("id", id).select().single();

export const deleteBook = (id: string) =>
  supabase.from("books").delete().eq("id", id);

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

export const getPortfolio = () =>
  supabase.from("portfolio").select("*").order("sort_order", { ascending: true });

export const createPortfolio = (data: Omit<Portfolio, "id" | "created_at">) =>
  supabase.from("portfolio").insert(data).select().single();

export const updatePortfolio = (id: string, data: Partial<Portfolio>) =>
  supabase.from("portfolio").update(data).eq("id", id).select().single();

export const deletePortfolio = (id: string) =>
  supabase.from("portfolio").delete().eq("id", id);

// ─── BLOGS ────────────────────────────────────────────────────────────────────

export const getBlogs = () =>
  supabase.from("blogs").select("*").order("created_at", { ascending: false });

export const getBlogBySlug = (slug: string) =>
  supabase.from("blogs").select("*").eq("slug", slug).single();

export const createBlog = (data: Omit<Blog, "id" | "created_at">) =>
  supabase.from("blogs").insert(data).select().single();

export const updateBlog = (id: string, data: Partial<Blog>) =>
  supabase.from("blogs").update(data).eq("id", id).select().single();

export const deleteBlog = (id: string) =>
  supabase.from("blogs").delete().eq("id", id);
