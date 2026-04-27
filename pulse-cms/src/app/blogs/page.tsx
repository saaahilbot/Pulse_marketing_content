export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs, getCategories } from "@/lib/blogs";
import Header from "@/components/Header";
import BlogTable from "@/components/BlogTable";

export const metadata: Metadata = {
  title: "All Blogs",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const categories = getCategories();

  return (
    <div>
      <Header
        title="All Blogs"
        subtitle={`Managing ${blogs.length} articles across ${categories.length} categories`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Blogs" }]}
        actions={
          <Link
            href="/blogs/new"
            className="flex items-center gap-2 bg-vc-orange text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-vc-orange-dark transition-colors"
          >
            + New Blog
          </Link>
        }
      />
      <BlogTable blogs={blogs} categories={categories} />
    </div>
  );
}
