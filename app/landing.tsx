'use client';

export default function LandingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR_CLIENT_ID"
        data-ad-slot="YOUR_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
      <h1 className="text-4xl font-bold mb-4">Free Invoice Generator – Create Invoices Instantly</h1>
      <p className="text-lg mb-6">
        Generate professional invoices online for free — no registration required. Just fill out your details,
        preview your invoice, and download it as a PDF in seconds.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Why Use Our Invoice Generator?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>100% Free:</strong> No hidden charges, no signups.</li>
        <li><strong>Fast & Easy:</strong> Fill in your details and generate invoices within a minute.</li>
        <li><strong>Ad-Supported:</strong> We keep it free by showing minimal ads.</li>
        <li><strong>PDF Export:</strong> Download your invoice instantly in print-ready format.</li>
        <li><strong>Mobile-Friendly:</strong> Fully responsive and usable on phones and tablets.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-3">Who is it for?</h2>
      <p>
        Freelancers, small business owners, service providers, consultants — anyone who wants a fast way to
        generate invoices without having to log in or sign up.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-3">How to Generate an Invoice?</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter your company and client information.</li>
        <li>Add your invoice items — description, quantity, and price.</li>
        <li>Click <strong>“Download PDF”</strong> to save your invoice.</li>
      </ol>
      <h2 className="text-2xl font-semibold mt-10 mb-3">Features You’ll Love</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>No login required — instant access</li>
        <li>Multiple invoice items with auto total calculation</li>
        <li>Responsive preview with export-ready format</li>
        <li>Future support for tax, discount, and multiple currencies</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-3">FAQs</h2>
      <p className="font-semibold mt-4">Is this invoice generator really free?</p>
      <p>Yes. Our tool is completely free and supported by ads.</p>
      <p className="font-semibold mt-4">Can I use it on mobile?</p>
      <p>Yes. It’s fully responsive and works perfectly on mobile and tablets.</p>
      <p className="font-semibold mt-4">Is it safe to use?</p>
      <p>Yes. We don’t store your data. Everything runs in your browser.</p>
      <p className="text-center mt-10 text-lg font-bold text-green-600">
        Start Generating Invoices Now — No Login Needed 🚀
      </p>
    </main>
  );
}

  export const metadata = {
  title: "Free Invoice Generator - Create and Download Invoices",
  description: "Generate professional invoices instantly online. No login required. Export to PDF and print for free. Mobile-friendly and SEO-optimized.",
  keywords: ["free invoice", "online invoice tool", "invoice generator", "create invoice", "download invoice PDF"],
  openGraph: {
    title: "Free Invoice Generator",
    description: "Create and download free invoices online.",
    url: "https://your-site.vercel.app",
    siteName: "Free Invoice Generator",
    locale: "en_US",
    type: "website",
  },
};