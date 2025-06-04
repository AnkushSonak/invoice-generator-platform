// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

const posts = {
  'create-professional-invoices-online': {
    title: 'How to Create Professional Invoices Online in Minutes',
    date: '2024-06-04',
    content: `
      Creating invoices doesn't have to be complicated. With our free online invoice generator, 
      you can fill in your details and download a PDF in seconds...
    `
  },
  'invoice-vs-receipt': {
    title: 'Invoice vs. Receipt – What’s the Difference?',
    date: '2024-06-03',
    content: `
      An invoice is a request for payment. A receipt is proof of payment. Both are essential documents 
      in business transactions, but they serve different purposes...
    `
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) return notFound();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <article className="prose dark:prose-invert">{post.content}</article>
    </main>
  );
}
