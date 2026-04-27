import type { Metadata } from "next";
import { createBlog } from "@/app/actions";
import Header from "@/components/Header";
import NewBlogForm from "./NewBlogForm";

export const metadata: Metadata = { title: "New Blog" };

export default function NewBlogPage() {
  return (
    <div>
      <Header
        title="New Blog"
        subtitle="Add a new article to the Pulse CMS"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: "New Blog" },
        ]}
      />
      <NewBlogForm action={createBlog} />
    </div>
  );
}
