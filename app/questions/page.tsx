'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, ArrowUp, ArrowDown, MessageCircle, Check } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: string
  title: string
  content: string
  voteCount: number
  answerCount: number
  isAnswered: boolean
  tags: string[]
  author: {
    name: string
    username: string
  }
  createdAt: string
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Mock data for now
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        title: 'How to implement authentication in Next.js 14?',
        content: 'I\'m trying to set up authentication in my Next.js 14 application using NextAuth.js. What are the best practices?',
        voteCount: 15,
        answerCount: 3,
        isAnswered: true,
        tags: ['nextjs', 'authentication', 'nextauth'],
        author: {
          name: 'John Doe',
          username: 'johndoe'
        },
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'Best practices for React state management?',
        content: 'What are the current best practices for managing state in large React applications?',
        voteCount: 8,
        answerCount: 2,
        isAnswered: false,
        tags: ['react', 'state-management', 'redux'],
        author: {
          name: 'Jane Smith',
          username: 'janesmith'
        },
        createdAt: '2024-01-14T15:45:00Z'
      },
      {
        id: '3',
        title: 'How to optimize database queries with Prisma?',
        content: 'I\'m experiencing slow query performance with Prisma ORM. Any tips for optimization?',
        voteCount: 12,
        answerCount: 1,
        isAnswered: false,
        tags: ['prisma', 'database', 'performance'],
        author: {
          name: 'Mike Johnson',
          username: 'mikej'
        },
        createdAt: '2024-01-13T09:20:00Z'
      }
    ]
    setQuestions(mockQuestions)
  }, [])

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.voteCount - a.voteCount
      case 'answers':
        return b.answerCount - a.answerCount
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const allTags = Array.from(new Set(questions.flatMap(q => q.tags)))

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Questions</h1>
            <p className="text-[#ebebeb] opacity-80">
              Find answers to your questions or help others by sharing your knowledge
            </p>
          </div>
          <Link href="/questions/ask">
            <Button className="mt-4 lg:mt-0 bg-[#947bc5] hover:bg-[#8a6bb8] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </Link>
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
                    placeholder="Search questions..."
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
                    <option value="answers">Most Answers</option>
                  </select>
                </div>

                {/* Popular Tags */}
                <div>
                  <label className="block text-[#ebebeb] text-sm font-medium mb-2">Popular Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {sortedQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-[#3a3741] border-[#fed5ff] hover:border-[#947bc5] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                          <div className="flex flex-col items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#ebebeb] hover:text-[#48bb78] p-1"
                            >
                              <ArrowUp className="w-5 h-5" />
                            </Button>
                            <span className="text-[#ebebeb] font-semibold text-lg">
                              {question.voteCount}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#ebebeb] hover:text-[#b53c27] p-1"
                            >
                              <ArrowDown className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/questions/${question.id}`}>
                              <h3 className="text-xl font-semibold text-[#ebebeb] hover:text-[#947bc5] transition-colors cursor-pointer">
                                {question.title}
                              </h3>
                            </Link>
                            {question.isAnswered && (
                              <div className="flex items-center text-[#48bb78] ml-4">
                                <Check className="w-4 h-4 mr-1" />
                                <span className="text-sm">Answered</span>
                              </div>
                            )}
                          </div>

                          <p className="text-[#ebebeb] opacity-80 mb-4 line-clamp-2">
                            {question.content}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {question.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-[#947bc5] bg-opacity-20 text-[#947bc5] border-[#947bc5]"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Meta Information */}
                          <div className="flex items-center justify-between text-sm text-[#ebebeb] opacity-60">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span>{question.answerCount} answers</span>
                              </div>
                              <span>
                                asked by{' '}
                                <Link href={`/users/${question.author.username}`} className="text-[#947bc5] hover:underline">
                                  {question.author.name}
                                </Link>
                              </span>
                            </div>
                            <span>
                              {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {sortedQuestions.length === 0 && (
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-8 text-center">
                  <p className="text-[#ebebeb] opacity-80 mb-4">
                    No questions found matching your search criteria.
                  </p>
                  <Link href="/questions/ask">
                    <Button className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white">
                      Ask the First Question
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}