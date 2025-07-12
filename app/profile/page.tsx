'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  MessageCircle, 
  ThumbsUp, 
  BookOpen,
  Edit,
  Save,
  X
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatar: ''
  })
  const [stats, setStats] = useState({
    questionsAsked: 0,
    answersGiven: 0,
    totalVotes: 0,
    blogsWritten: 0,
    reputation: 0,
    joinedDate: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Set profile data from session
    setProfileData({
      name: session.user?.name || '',
      username: session.user?.username || '',
      email: session.user?.email || '',
      bio: 'Full-stack developer passionate about building scalable web applications.',
      avatar: session.user?.image || ''
    })

    // Mock stats
    setStats({
      questionsAsked: 12,
      answersGiven: 34,
      totalVotes: 156,
      blogsWritten: 3,
      reputation: 892,
      joinedDate: '2024-01-01'
    })
  }, [session, status, router])

  const handleSave = () => {
    // Here you would typically save to the database
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: session?.user?.name || '',
      username: session?.user?.username || '',
      email: session?.user?.email || '',
      bio: 'Full-stack developer passionate about building scalable web applications.',
      avatar: session?.user?.image || ''
    })
    setIsEditing(false)
  }

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

  const badges = [
    { name: 'First Question', description: 'Asked your first question', earned: true },
    { name: 'Helpful', description: 'Received 10 upvotes on answers', earned: true },
    { name: 'Blogger', description: 'Published your first blog post', earned: true },
    { name: 'Expert', description: 'Reached 1000 reputation', earned: false },
    { name: 'Mentor', description: 'Helped 50 users with answers', earned: false }
  ]

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Profile</h1>
          <p className="text-[#ebebeb] opacity-80">
            Manage your account settings and view your activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 bg-[#947bc5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#947bc5] hover:bg-[#8a6bb8]"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-[#ebebeb]">{profileData.name}</CardTitle>
                <p className="text-[#ebebeb] opacity-60">@{profileData.username}</p>
                <div className="flex items-center justify-center mt-2">
                  <Award className="w-4 h-4 text-[#fed5ff] mr-1" />
                  <span className="text-[#ebebeb] font-semibold">{stats.reputation} reputation</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-[#ebebeb] opacity-80">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-[#ebebeb] opacity-80">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Joined {new Date(stats.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-[#fed5ff]">
                    <p className="text-[#ebebeb] text-sm">{profileData.bio}</p>
                  </div>
                  <div className="pt-4">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-[#947bc5] hover:bg-[#8a6bb8] text-white"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSave}
                          className="flex-1 bg-[#48bb78] hover:bg-[#3da563] text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="flex-1 border-[#b53c27] text-[#b53c27] hover:bg-[#b53c27] hover:text-white"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-[#3a3741] border-[#fed5ff] mt-6">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#ebebeb] opacity-80 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Questions
                    </span>
                    <span className="text-[#ebebeb] font-semibold">{stats.questionsAsked}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ebebeb] opacity-80 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Answers
                    </span>
                    <span className="text-[#ebebeb] font-semibold">{stats.answersGiven}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ebebeb] opacity-80 flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Total Votes
                    </span>
                    <span className="text-[#ebebeb] font-semibold">{stats.totalVotes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ebebeb] opacity-80 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Blogs
                    </span>
                    <span className="text-[#ebebeb] font-semibold">{stats.blogsWritten}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-[#3a3741] border border-[#fed5ff]">
                <TabsTrigger value="activity" className="text-[#ebebeb] data-[state=active]:bg-[#947bc5] data-[state=active]:text-white">
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-[#ebebeb] data-[state=active]:bg-[#947bc5] data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="badges" className="text-[#ebebeb] data-[state=active]:bg-[#947bc5] data-[state=active]:text-white">
                  Badges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <Card className="bg-[#3a3741] border-[#fed5ff]">
                  <CardHeader>
                    <CardTitle className="text-[#ebebeb]">Recent Activity</CardTitle>
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
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-[#3a3741] border-[#fed5ff]">
                  <CardHeader>
                    <CardTitle className="text-[#ebebeb]">Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-[#ebebeb]">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={!isEditing}
                          className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <Label htmlFor="username" className="text-[#ebebeb]">Username</Label>
                        <Input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          disabled={!isEditing}
                          className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] disabled:opacity-60"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#ebebeb]">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-[#ebebeb]">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        disabled={!isEditing}
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] disabled:opacity-60"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badges">
                <Card className="bg-[#3a3741] border-[#fed5ff]">
                  <CardHeader>
                    <CardTitle className="text-[#ebebeb]">Achievements & Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.map((badge, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          badge.earned 
                            ? 'bg-[#947bc5] bg-opacity-20 border-[#947bc5]' 
                            : 'bg-[#2b2731] border-[#fed5ff] opacity-50'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              badge.earned ? 'bg-[#947bc5] text-white' : 'bg-[#fed5ff] text-[#2b2731]'
                            }`}>
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-[#ebebeb] font-medium">{badge.name}</h4>
                              <p className="text-[#ebebeb] opacity-60 text-sm">{badge.description}</p>
                            </div>
                          </div>
                          {badge.earned && (
                            <Badge className="mt-2 bg-[#48bb78] text-white">
                              Earned
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}