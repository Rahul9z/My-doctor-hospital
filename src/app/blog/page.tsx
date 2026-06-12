"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const posts = [
    { title: "Understanding Heart Health in Your 40s", category: "Cardiology", date: "June 10, 2026", readTime: "5 min read", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=800&auto=format&fit=crop" },
    { title: "The Future of AI in Medical Diagnostics", category: "Technology", date: "June 8, 2026", readTime: "8 min read", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" },
    { title: "Nutrition Tips for a Stronger Immune System", category: "Wellness", date: "June 5, 2026", readTime: "4 min read", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Health <span className="text-primary">Blog</span></h1>
          <p className="text-lg text-slate-600">Stay informed with the latest medical news, health tips, and wellness articles from our experts.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-200">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                <Link href="#" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
