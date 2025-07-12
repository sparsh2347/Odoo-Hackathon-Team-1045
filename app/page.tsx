'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MessageCircle, ThumbsUp, Eye, Calendar, User } from 'lucide-react'

export default function Home() {
  // Mock data for featured content
  const featuredQuestions = [
    {
      id: '1',
      title: 'How to implement real-time voting in Next.js?',
      content: 'I\'m building a Q&A platform and need to implement real-time voting. What\'s the best approach?',
      tags: ['nextjs', 'websockets', 'real-time'],
      votes: 15,
      answers: 3,
      views: 124,
      author: 'developer123',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Best practices for PostgreSQL with Prisma ORM',
      content: 'What are the recommended patterns for structuring a complex database schema?',
      tags: ['postgresql', 'prisma', 'database'],
      votes: 23,
      answers: 7,
      views: 298,
      author: 'dbexpert',
      createdAt: '4 hours ago'
    }
  ]

  const featuredBlogs = [
    {
      id: '1',
      title: 'Building Scalable Q&A Platforms: Lessons Learned',
      excerpt: 'After building several Q&A platforms, here are the key architectural decisions that matter most...',
      tags: ['architecture', 'scalability', 'lessons'],
      votes: 45,
      views: 1205,
      author: 'techarchitect',
      createdAt: '1 day ago'
    },
    {
      id: '2',
      title: 'Modern Authentication Patterns in 2024',
      excerpt: 'Exploring the latest trends in web authentication, from JWT to session-based approaches...',
      tags: ['authentication', 'security', 'jwt'],
      votes: 38,
      views: 892,
      author: 'securityguru',
      createdAt: '2 days ago'
    }
  ]

  return (
    <div className="min-h-screen bg-[#2b2731]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#ebebeb] mb-6">
              Welcome to{' '}
              <span className="text-[#947bc5]">StackIt</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#ebebeb] mb-8 max-w-3xl mx-auto">
              A minimal and collaborative Q&A platform where developers learn, share knowledge, and build together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/questions/ask">
                <Button size="lg" className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white px-8 py-3">
                  Ask a Question
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/questions">
                <Button size="lg" variant="outline" className="border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white px-8 py-3">
                  Browse Questions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Questions Asked', value: '2,847', color: '#947bc5' },
              { label: 'Answers Given', value: '8,923', color: '#e59770' },
              { label: 'Active Users', value: '1,256', color: '#48bb78' },
              { label: 'Blog Posts', value: '342', color: '#fed5ff' }
            ].map((stat, index) => (
              <Card key={index} className="bg-[#3a3741] border-[#fed5ff] text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[#ebebeb]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#ebebeb]">Featured Questions</h2>
              <Link href="/questions">
                <Button variant="ghost" className="text-[#947bc5] hover:text-[#8a6bb8]">
                  View All Questions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredQuestions.map((question) => (
                <Card key={question.id} className="bg-[#3a3741] border-[#fed5ff] hover:border-[#947bc5] transition-colors">
                  <CardHeader>
                    <CardTitle className="text-[#ebebeb] hover:text-[#947bc5] cursor-pointer">
                      {question.title}
                    </CardTitle>
                    <p className="text-[#ebebeb] line-clamp-2">{question.content}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#947bc5] text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#ebebeb]">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1 text-[#48bb78]" />
                          {question.votes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1 text-[#e59770]" />
                          {question.answers}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {question.views}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{question.author}</span>
                        <span>•</span>
                        <span>{question.createdAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#ebebeb]">Featured Blogs</h2>
              <Link href="/blogs">
                <Button variant="ghost" className="text-[#947bc5] hover:text-[#8a6bb8]">
                  View All Blogs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredBlogs.map((blog) => (
                <Card key={blog.id} className="bg-[#3a3741] border-[#fed5ff] hover:border-[#947bc5] transition-colors">
                  <CardHeader>
                    <CardTitle className="text-[#ebebeb] hover:text-[#947bc5] cursor-pointer">
                      {blog.title}
                    </CardTitle>
                    <p className="text-[#ebebeb] line-clamp-3">{blog.excerpt}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#e59770] text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#ebebeb]">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1 text-[#48bb78]" />
                          {blog.votes}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {blog.views}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{blog.createdAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#ebebeb] mb-6">
              Ready to join the community?
            </h2>
            <p className="text-xl text-[#ebebeb] mb-8">
              Start asking questions, sharing knowledge, and building together with thousands of developers.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white px-12 py-4 text-lg">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}