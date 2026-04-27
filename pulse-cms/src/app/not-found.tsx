import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <h1 className="text-6xl font-bold text-vc-navy mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found.</p>
      <Link
        href="/"
        className="bg-vc-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-vc-navy-light transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
