import Link from 'next/link';

const blogPosts = [
  {
    slug: 'create-professional-invoices-online',
    title: 'How to Create Professional Invoices Online in Minutes',
    summary: 'Learn how to generate invoices quickly, what to include, and best practices for freelancers and small businesses.',
    date: '2024-06-04'
  },
  {
    slug: 'invoice-vs-receipt',
    title: 'Invoice vs. Receipt – What’s the Difference?',
    summary: 'Understand the key differences between invoices and receipts to avoid confusion when billing clients.',
    date: '2024-06-03'
  }
];

export default function BlogList() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Invoice Blog</h1>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-gray-700 dark:text-gray-300">{post.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const metadata = {
  title: 'Invoice Blog – Tips, Tricks, and Resources',
  description: 'Explore invoicing best practices, comparisons, and industry advice on our blog.',
};
