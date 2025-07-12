'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  HelpCircle, 
  Tag, 
  X, 
  Plus,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function AskQuestionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  })
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim()) && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim().toLowerCase()]
      })
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!formData.title.trim()) {
      newErrors.push('Title is required')
    } else if (formData.title.length < 10) {
      newErrors.push('Title must be at least 10 characters long')
    }
    
    if (!formData.content.trim()) {
      newErrors.push('Question content is required')
    } else if (formData.content.length < 20) {
      newErrors.push('Question content must be at least 20 characters long')
    }
    
    if (formData.tags.length === 0) {
      newErrors.push('At least one tag is required')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Here you would typically submit to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Redirect to questions page or the new question
      router.push('/questions')
    } catch (error) {
      setErrors(['Failed to submit question. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
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

  const suggestedTags = ['javascript', 'react', 'nextjs', 'typescript', 'nodejs', 'database', 'api', 'css', 'html', 'python']

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Ask a Question</h1>
          <p className="text-[#ebebeb] opacity-80">
            Get help from the community by asking a clear, detailed question
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Question Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.length > 0 && (
                    <Alert className="bg-[#b53c27] border-[#b53c27] text-white">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside">
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#ebebeb] font-medium">
                      Question Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., How to implement authentication in Next.js?"
                      className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#947bc5]"
                    />
                    <p className="text-[#ebebeb] opacity-60 text-sm">
                      Be specific and imagine you're asking a question to another person
                    </p>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-[#ebebeb] font-medium">
                      Question Content *
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Describe your problem in detail. Include what you've tried and what you expected to happen..."
                      className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#947bc5] min-h-[200px]"
                    />
                    <p className="text-[#ebebeb] opacity-60 text-sm">
                      Include all the information someone would need to answer your question
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-[#ebebeb] font-medium">
                      Tags * (up to 5)
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[#947bc5] text-white flex items-center gap-1"
                        >
                          {tag}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-[#b53c27]"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a tag..."
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#947bc5]"
                        disabled={formData.tags.length >= 5}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!currentTag.trim() || formData.tags.length >= 5}
                        className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-[#ebebeb] opacity-60 text-sm">
                      Add tags to describe what your question is about
                    </p>
                    
                    {/* Suggested Tags */}
                    <div className="mt-3">
                      <p className="text-[#ebebeb] text-sm mb-2">Suggested tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags
                          .filter(tag => !formData.tags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer border-[#947bc5] text-[#947bc5] hover:bg-[#947bc5] hover:text-white transition-colors"
                              onClick={() => {
                                if (formData.tags.length < 5) {
                                  setFormData({
                                    ...formData,
                                    tags: [...formData.tags, tag]
                                  })
                                }
                              }}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white px-8"
                    >
                      {isSubmitting ? 'Submitting...' : 'Post Question'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="border-[#fed5ff] text-[#ebebeb] hover:bg-[#fed5ff] hover:text-[#2b2731]"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Tips Card */}
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] flex items-center text-lg">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#fed5ff]" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-[#ebebeb] opacity-80">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Be specific about your problem</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Include relevant code snippets</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Describe what you've already tried</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Use proper formatting and grammar</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Add relevant tags to help others find your question</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] flex items-center text-lg">
                  <AlertCircle className="w-5 h-5 mr-2 text-[#e59770]" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-[#ebebeb] opacity-80">
                  <p>• Be respectful and constructive</p>
                  <p>• Search for existing answers first</p>
                  <p>• Provide context and details</p>
                  <p>• Accept helpful answers</p>
                  <p>• Follow up with solutions you find</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}