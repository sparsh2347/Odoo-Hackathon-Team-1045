'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  Calendar,
  User,
  BookOpen,
  Award,
  Star,
  Flame
} from 'lucide-react'
import Link from 'next/link'

export default function AnnouncementsPage() {
  const [featuredContent, setFeaturedContent] = useState({
    topQuestions: [],
    recentBlogs: [],
    activeDiscussions: [],
    topContributors: []
  })

  useEffect(() => {
    // Mock data for announcements
    setFeaturedContent({
      topQuestions: [
        {
          id: '1',
          title: 'How to implement real-time voting in Next.js?',
          votes: 45,
          answers: 12,
          views: 892,
          author: 'developer123',
          createdAt: '2024-01-15T10:30:00Z',
          tags: ['nextjs', 'websockets', 'real-time']
        },
        {
          id: '2',
          title: 'Best practices for PostgreSQL with Prisma ORM',
          votes: 38,
          answers: 8,
          views: 654,
          author: 'dbexpert',
          createdAt: '2024-01-14T15:45:00Z',
          tags: ['postgresql', 'prisma', 'database']
        },
        {
          id: '3',
          title: 'Optimizing React performance in large applications',
          votes: 52,
          answers: 15,
          views: 1205,
          author: 'reactpro',
          createdAt: '2024-01-13T09:20:00Z',
          tags: ['react', 'performance', 'optimization']
        }
      ],
      recentBlogs: [
        {
          id: '1',
          title: 'Building Scalable Q&A Platforms: Lessons Learned',
          votes: 67,
          views: 2341,
          author: 'techarchitect',
          createdAt: '2024-01-15T10:30:00Z',
          readTime: 8,
          tags: ['architecture', 'scalability']
        },
        {
          id: '2',
          title: 'Modern Authentication Patterns in 2024',
          votes: 43,
          views: 1567,
          author: 'securityguru',
          createdAt: '2024-01-14T15:45:00Z',
          readTime: 6,
          tags: ['authentication', 'security']
        }
      ],
      activeDiscussions: [
        {
          id: '1',
          title: 'The future of web development frameworks',
          type: 'question',
          comments: 28,
          participants: 15,
          lastActivity: '2 hours ago'
        },
        {
          id: '2',
          title: 'Database design patterns for microservices',
          type: 'blog',
          comments: 19,
          participants: 12,
          lastActivity: '4 hours ago'
        },
        {
          id: '3',
          title: 'AI in software development: opportunities and challenges',
          type: 'question',
          comments: 34,
          participants: 22,
          lastActivity: '6 hours ago'
        }
      ],
      topContributors: [
        {
          username: 'techarchitect',
          name: 'Tech Architect',
          reputation: 2847,
          questionsAnswered: 156,
          blogsWritten: 12
        },
        {
          username: 'dbexpert',
          name: 'Database Expert',
          reputation: 2156,
          questionsAnswered: 134,
          blogsWritten: 8
        },
        {
          username: 'reactpro',
          name: 'React Pro',
          reputation: 1923,
          questionsAnswered: 98,
          blogsWritten: 15
        }
      ]
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Community Announcements</h1>
          <p className="text-[#ebebeb] opacity-80">
            Discover trending questions, featured blogs, and active discussions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Questions This Week */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <Flame className="w-5 h-5 mr-2 text-[#e59770]" />
                    🔥 Trending Questions This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredContent.topQuestions.map((question, index) => (
                      <div key={question.id} className="p-4 bg-[#2b2731] rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-[#947bc5] text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <Link href={`/questions/${question.id}`}>
                              <h4 className="text-[#ebebeb] font-medium mb-2 hover:text-[#947bc5] cursor-pointer">
                                {question.title}
                              </h4>
                            </Link>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-[#947bc5] bg-opacity-20 text-[#947bc5]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-[#ebebeb] opacity-60">
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
                              <span>by {question.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/questions">
                      <Button variant="outline" className="border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white">
                        View All Questions
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recently Published Blogs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-[#e59770]" />
                    📚 Recently Published Blogs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredContent.recentBlogs.map((blog) => (
                      <div key={blog.id} className="p-4 bg-[#2b2731] rounded-lg">
                        <Link href={`/blogs/${blog.id}`}>
                          <h4 className="text-[#ebebeb] font-medium mb-2 hover:text-[#e59770] cursor-pointer">
                            {blog.title}
                          </h4>
                        </Link>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-[#e59770] bg-opacity-20 text-[#e59770]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#ebebeb] opacity-60">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1 text-[#48bb78]" />
                              {blog.votes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {blog.views}
                            </span>
                            <span>{blog.readTime} min read</span>
                          </div>
                          <span>by {blog.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/blogs">
                      <Button variant="outline" className="border-[#e59770] text-[#e59770] hover:bg-[#e59770] hover:text-white">
                        View All Blogs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Most Active Discussions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-[#48bb78]" />
                    💬 Most Active Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredContent.activeDiscussions.map((discussion) => (
                      <div key={discussion.id} className="p-4 bg-[#2b2731] rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-[#ebebeb] font-medium mb-2 hover:text-[#48bb78] cursor-pointer">
                              {discussion.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-[#ebebeb] opacity-60">
                              <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {discussion.comments} comments
                              </span>
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {discussion.participants} participants
                              </span>
                              <span>Last activity: {discussion.lastActivity}</span>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              discussion.type === 'question' 
                                ? 'border-[#947bc5] text-[#947bc5]' 
                                : 'border-[#e59770] text-[#e59770]'
                            }`}
                          >
                            {discussion.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <Award className="w-5 h-5 mr-2 text-[#fed5ff]" />
                    🏆 Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredContent.topContributors.map((contributor, index) => (
                      <div key={contributor.username} className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          index === 0 ? 'bg-[#fed5ff] text-[#2b2731]' :
                          index === 1 ? 'bg-[#e59770] text-white' :
                          'bg-[#947bc5] text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Link href={`/users/${contributor.username}`}>
                            <p className="text-[#ebebeb] font-medium hover:text-[#947bc5] cursor-pointer">
                              {contributor.name}
                            </p>
                          </Link>
                          <div className="flex items-center space-x-2 text-xs text-[#ebebeb] opacity-60">
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {contributor.reputation}
                            </span>
                            <span>•</span>
                            <span>{contributor.questionsAnswered} answers</span>
                            <span>•</span>
                            <span>{contributor.blogsWritten} blogs</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-[#48bb78]" />
                    📊 Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#ebebeb] opacity-80">Questions this week</span>
                      <span className="text-[#ebebeb] font-semibold">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ebebeb] opacity-80">Answers this week</span>
                      <span className="text-[#ebebeb] font-semibold">342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ebebeb] opacity-80">Blogs published</span>
                      <span className="text-[#ebebeb] font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ebebeb] opacity-80">Active users</span>
                      <span className="text-[#ebebeb] font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ebebeb] opacity-80">Total reputation</span>
                      <span className="text-[#ebebeb] font-semibold">45,892</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}