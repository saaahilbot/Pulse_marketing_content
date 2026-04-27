export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug } from "@/lib/blogs";
import { updateBlog } from "@/app/actions";
import Header from "@/components/Header";
import EditBlogForm from "./EditBlogForm";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  return { title: blog ? `Edit: ${blog.title}` : "Edit Blog" };
}

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const action = updateBlog.bind(null, params.slug);

  return (
    <div>
      <Header
        title="Edit Blog"
        subtitle={blog.title}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title.slice(0, 40) + (blog.title.length > 40 ? "…" : ""), href: `/blogs/${blog.slug}` },
          { label: "Edit" },
        ]}
      />
      <EditBlogForm blog={blog} action={action} />
    </div>
  );
}
