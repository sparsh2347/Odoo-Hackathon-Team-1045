'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, ThumbsUp, Eye, Calendar, User, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  voteCount: number
  views: number
  author: {
    name: string
    username: string
  }
  createdAt: string
  readTime: number
}

export default function BlogsPage() {
  const { data: session } = useSession()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedTag, setSelectedTag] = useState('')

  // Mock data for now
  useEffect(() => {
    const mockBlogs: Blog[] = [
      {
        id: '1',
        title: 'Building Scalable Q&A Platforms: Lessons Learned',
        excerpt: 'After building several Q&A platforms, here are the key architectural decisions that matter most for scalability and user experience.',
        content: 'Full blog content here...',
        tags: ['architecture', 'scalability', 'nextjs'],
        voteCount: 45,
        views: 1205,
        author: {
          name: 'Tech Architect',
          username: 'techarchitect'
        },
        createdAt: '2024-01-15T10:30:00Z',
        readTime: 8
      },
      {
        id: '2',
        title: 'Modern Authentication Patterns in 2024',
        excerpt: 'Exploring the latest trends in web authentication, from JWT to session-based approaches and everything in between.',
        content: 'Full blog content here...',
        tags: ['authentication', 'security', 'jwt'],
        voteCount: 38,
        views: 892,
        author: {
          name: 'Security Guru',
          username: 'securityguru'
        },
        createdAt: '2024-01-14T15:45:00Z',
        readTime: 6
      },
      {
        id: '3',
        title: 'Database Optimization Techniques for High-Traffic Apps',
        excerpt: 'Learn how to optimize your database queries and schema design for applications that serve millions of users.',
        content: 'Full blog content here...',
        tags: ['database', 'performance', 'postgresql'],
        voteCount: 52,
        views: 1456,
        author: {
          name: 'DB Expert',
          username: 'dbexpert'
        },
        createdAt: '2024-01-13T09:20:00Z',
        readTime: 12
      }
    ]
    setBlogs(mockBlogs)
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.voteCount - a.voteCount
      case 'views':
        return b.views - a.views
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const allTags = Array.from(new Set(blogs.flatMap(b => b.tags)))

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Blogs</h1>
            <p className="text-[#ebebeb] opacity-80">
              Discover in-depth articles and tutorials from the community
            </p>
          </div>
          {session && (
            <Link href="/blogs/create">
              <Button className="mt-4 lg:mt-0 bg-[#e59770] hover:bg-[#d4845a] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Write Blog
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#3a3741] border-[#fed5ff] mb-6">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] text-lg">Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ebebeb] w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#2b2731] border border-[#fed5ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947bc5] text-[#ebebeb]"
                  />
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-[#ebebeb] text-sm font-medium mb-2">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 bg-[#2b2731] border border-[#fed5ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947bc5] text-[#ebebeb]"
                  >
                    <option value="newest">Newest</option>
                    <option value="votes">Most Votes</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>

                {/* Popular Tags */}
                <div>
                  <label className="block text-[#ebebeb] text-sm font-medium mb-2">Popular Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={`cursor-pointer transition-colors ${
                        selectedTag === '' 
                          ? 'bg-[#947bc5] text-white border-[#947bc5]' 
                          : 'border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white'
                      }`}
                      onClick={() => setSelectedTag('')}
                    >
                      All
                    </Badge>
                    {allTags.slice(0, 10).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`cursor-pointer transition-colors ${
                          selectedTag === tag 
                            ? 'bg-[#947bc5] text-white border-[#947bc5]' 
                            : 'border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white'
                        }`}
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blogs List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {sortedBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-[#3a3741] border-[#fed5ff] hover:border-[#e59770] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#ebebeb] hover:text-[#48bb78] p-1"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </Button>
                          <span className="text-[#ebebeb] font-semibold text-lg">
                            {blog.voteCount}
                          </span>
                        </div>

                        {/* Blog Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <Link href={`/blogs/${blog.id}`}>
                              <h3 className="text-xl font-semibold text-[#ebebeb] hover:text-[#e59770] transition-colors cursor-pointer">
                                {blog.title}
                              </h3>
                            </Link>
                            <div className="flex items-center text-[#ebebeb] opacity-60 text-sm ml-4">
                              <BookOpen className="w-4 h-4 mr-1" />
                              <span>{blog.readTime} min read</span>
                            </div>
                          </div>

                          <p className="text-[#ebebeb] opacity-80 mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-[#e59770] bg-opacity-20 text-[#e59770] border-[#e59770]"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Meta Information */}
                          <div className="flex items-center justify-between text-sm text-[#ebebeb] opacity-60">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{blog.views} views</span>
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <Link href={`/users/${blog.author.username}`} className="text-[#e59770] hover:underline">
                                  {blog.author.name}
                                </Link>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {sortedBlogs.length === 0 && (
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-16 h-16 text-[#e59770] mx-auto mb-4 opacity-50" />
                  <p className="text-[#ebebeb] opacity-80 mb-4">
                    No blogs found matching your search criteria.
                  </p>
                  {session && (
                    <Link href="/blogs/create">
                      <Button className="bg-[#e59770] hover:bg-[#d4845a] text-white">
                        Write the First Blog
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}