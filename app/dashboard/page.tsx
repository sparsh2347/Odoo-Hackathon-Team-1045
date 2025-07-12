'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award,
  Plus,
  Bell,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    questionsAsked: 0,
    answersGiven: 0,
    totalVotes: 0,
    blogsWritten: 0,
    reputation: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Mock stats for now
    setStats({
      questionsAsked: 12,
      answersGiven: 34,
      totalVotes: 156,
      blogsWritten: 3,
      reputation: 892
    })
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#2b2731] flex items-center justify-center">
        <div className="text-[#ebebeb]">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const recentActivity = [
    {
      type: 'question',
      title: 'How to implement real-time voting?',
      action: 'asked',
      time: '2 hours ago',
      votes: 5
    },
    {
      type: 'answer',
      title: 'Best practices for React state management?',
      action: 'answered',
      time: '1 day ago',
      votes: 12
    },
    {
      type: 'blog',
      title: 'Building Scalable Applications',
      action: 'published',
      time: '3 days ago',
      votes: 23
    }
  ]

  const suggestedQuestions = [
    {
      id: '1',
      title: 'How to optimize database queries in PostgreSQL?',
      tags: ['postgresql', 'performance'],
      votes: 8,
      answers: 2
    },
    {
      id: '2',
      title: 'Best practices for API design in 2024?',
      tags: ['api', 'design', 'rest'],
      votes: 15,
      answers: 5
    }
  ]

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">
            Welcome back, {session.user?.name || session.user?.username}!
          </h1>
          <p className="text-[#ebebeb] opacity-80">
            Here's what's happening in your community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-6 h-6 text-[#947bc5] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ebebeb]">{stats.questionsAsked}</div>
                  <div className="text-sm text-[#ebebeb] opacity-60">Questions</div>
                </CardContent>
              </Card>
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 text-[#e59770] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ebebeb]">{stats.answersGiven}</div>
                  <div className="text-sm text-[#ebebeb] opacity-60">Answers</div>
                </CardContent>
              </Card>
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-4 text-center">
                  <ThumbsUp className="w-6 h-6 text-[#48bb78] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ebebeb]">{stats.totalVotes}</div>
                  <div className="text-sm text-[#ebebeb] opacity-60">Votes</div>
                </CardContent>
              </Card>
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-[#fed5ff] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ebebeb]">{stats.blogsWritten}</div>
                  <div className="text-sm text-[#ebebeb] opacity-60">Blogs</div>
                </CardContent>
              </Card>
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardContent className="p-4 text-center">
                  <Award className="w-6 h-6 text-[#947bc5] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#ebebeb]">{stats.reputation}</div>
                  <div className="text-sm text-[#ebebeb] opacity-60">Reputation</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#2b2731] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'question' ? 'bg-[#947bc5]' :
                            activity.type === 'answer' ? 'bg-[#e59770]' : 'bg-[#48bb78]'
                          }`} />
                          <div>
                            <p className="text-[#ebebeb] font-medium">{activity.title}</p>
                            <p className="text-[#ebebeb] opacity-60 text-sm">
                              You {activity.action} • {activity.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-[#48bb78]">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{activity.votes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Suggested Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center justify-between">
                    <span className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Questions You Might Like
                    </span>
                    <Link href="/questions">
                      <Button variant="ghost" size="sm" className="text-[#947bc5]">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestedQuestions.map((question) => (
                      <div key={question.id} className="p-4 bg-[#2b2731] rounded-lg">
                        <h4 className="text-[#ebebeb] font-medium mb-2 hover:text-[#947bc5] cursor-pointer">
                          {question.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-[#947bc5] bg-opacity-20 text-[#947bc5]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-[#ebebeb] opacity-60">
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {question.votes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {question.answers}
                            </span>
                          </div>
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
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb]">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/questions/ask">
                    <Button className="w-full bg-[#947bc5] hover:bg-[#8a6bb8] text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Ask Question
                    </Button>
                  </Link>
                  <Link href="/blogs/create">
                    <Button variant="outline" className="w-full border-[#e59770] text-[#e59770] hover:bg-[#e59770] hover:text-white">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Write Blog
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full text-[#ebebeb] hover:text-[#947bc5]">
                      <Users className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#3a3741] border-[#fed5ff]">
                <CardHeader>
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-[#2b2731] rounded-lg">
                      <p className="text-[#ebebeb] text-sm">
                        <span className="font-medium">johndoe</span> answered your question
                      </p>
                      <p className="text-[#ebebeb] opacity-60 text-xs mt-1">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-[#2b2731] rounded-lg">
                      <p className="text-[#ebebeb] text-sm">
                        Your answer received 5 upvotes
                      </p>
                      <p className="text-[#ebebeb] opacity-60 text-xs mt-1">1 day ago</p>
                    </div>
                    <div className="p-3 bg-[#2b2731] rounded-lg">
                      <p className="text-[#ebebeb] text-sm">
                        <span className="font-medium">janesmith</span> mentioned you in a comment
                      </p>
                      <p className="text-[#ebebeb] opacity-60 text-xs mt-1">2 days ago</p>
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