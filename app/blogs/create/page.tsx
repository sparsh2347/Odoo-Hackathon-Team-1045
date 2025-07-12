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
  BookOpen, 
  Tag, 
  X, 
  Plus,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Wand2,
  Eye
} from 'lucide-react'

export default function CreateBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [] as string[]
  })
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  // Auto-suggestions based on content
  useEffect(() => {
    if (formData.content.length > 100) {
      // Mock AI suggestions
      const mockSuggestions = [
        "Consider adding code examples to illustrate your points",
        "You might want to include a conclusion section",
        "Adding screenshots or diagrams could help readers understand better",
        "Consider breaking down complex concepts into smaller sections"
      ]
      setSuggestions(mockSuggestions.slice(0, 2))
    } else {
      setSuggestions([])
    }
  }, [formData.content])

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

  const generateTitle = () => {
    if (formData.content.length > 50) {
      // Mock AI-generated title based on content
      const titles = [
        "A Comprehensive Guide to Modern Web Development",
        "Best Practices for Building Scalable Applications",
        "Understanding the Fundamentals of Software Architecture",
        "Advanced Techniques for Performance Optimization"
      ]
      const randomTitle = titles[Math.floor(Math.random() * titles.length)]
      setFormData({...formData, title: randomTitle})
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!formData.title.trim()) {
      newErrors.push('Title is required')
    } else if (formData.title.length < 10) {
      newErrors.push('Title must be at least 10 characters long')
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.push('Excerpt is required')
    } else if (formData.excerpt.length < 20) {
      newErrors.push('Excerpt must be at least 20 characters long')
    }
    
    if (!formData.content.trim()) {
      newErrors.push('Blog content is required')
    } else if (formData.content.length < 100) {
      newErrors.push('Blog content must be at least 100 characters long')
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
      
      // Redirect to blogs page or the new blog
      router.push('/blogs')
    } catch (error) {
      setErrors(['Failed to publish blog. Please try again.'])
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

  const suggestedTags = ['tutorial', 'javascript', 'react', 'nextjs', 'typescript', 'nodejs', 'database', 'api', 'css', 'python', 'architecture', 'performance']

  return (
    <div className="min-h-screen bg-[#2b2731] pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ebebeb] mb-2">Write a Blog Post</h1>
          <p className="text-[#ebebeb] opacity-80">
            Share your knowledge and insights with the community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#ebebeb] flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Blog Details
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPreview(!isPreview)}
                    className="border-[#e59770] text-[#e59770] hover:bg-[#e59770] hover:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreview ? 'Edit' : 'Preview'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!isPreview ? (
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="title" className="text-[#ebebeb] font-medium">
                          Blog Title *
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={generateTitle}
                          className="text-[#e59770] hover:text-[#d4845a]"
                        >
                          <Wand2 className="w-4 h-4 mr-1" />
                          Generate Title
                        </Button>
                      </div>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Building Scalable Web Applications with Next.js"
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#e59770]"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt" className="text-[#ebebeb] font-medium">
                        Excerpt *
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        placeholder="A brief summary of your blog post that will appear in listings..."
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#e59770]"
                        rows={3}
                      />
                      <p className="text-[#ebebeb] opacity-60 text-sm">
                        This will be shown in blog listings and search results
                      </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-[#ebebeb] font-medium">
                        Blog Content *
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Write your blog content here. You can use markdown formatting..."
                        className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#e59770] min-h-[400px]"
                      />
                      <p className="text-[#ebebeb] opacity-60 text-sm">
                        Supports markdown formatting for rich text content
                      </p>
                    </div>

                    {/* AI Suggestions */}
                    {suggestions.length > 0 && (
                      <Card className="bg-[#2b2731] border-[#e59770]">
                        <CardHeader>
                          <CardTitle className="text-[#e59770] text-sm flex items-center">
                            <Wand2 className="w-4 h-4 mr-2" />
                            AI Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Lightbulb className="w-4 h-4 text-[#e59770] mt-0.5 flex-shrink-0" />
                                <p className="text-[#ebebeb] text-sm">{suggestion}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

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
                            className="bg-[#e59770] text-white flex items-center gap-1"
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
                          className="bg-[#2b2731] border-[#fed5ff] text-[#ebebeb] focus:ring-[#e59770]"
                          disabled={formData.tags.length >= 5}
                        />
                        <Button
                          type="button"
                          onClick={handleAddTag}
                          disabled={!currentTag.trim() || formData.tags.length >= 5}
                          className="bg-[#e59770] hover:bg-[#d4845a] text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Suggested Tags */}
                      <div className="mt-3">
                        <p className="text-[#ebebeb] text-sm mb-2">Suggested tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags
                            .filter(tag => !formData.tags.includes(tag))
                            .slice(0, 10)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer border-[#e59770] text-[#e59770] hover:bg-[#e59770] hover:text-white transition-colors"
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
                        className="bg-[#e59770] hover:bg-[#d4845a] text-white px-8"
                      >
                        {isSubmitting ? 'Publishing...' : 'Publish Blog'}
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
                ) : (
                  /* Preview Mode */
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#ebebeb] mb-4">{formData.title || 'Blog Title'}</h1>
                      <p className="text-[#ebebeb] opacity-80 text-lg mb-4">{formData.excerpt || 'Blog excerpt will appear here...'}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} className="bg-[#e59770] text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="text-[#ebebeb] whitespace-pre-wrap">
                        {formData.content || 'Blog content will appear here...'}
                      </div>
                    </div>
                  </div>
                )}
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
            {/* Writing Tips */}
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
                    <p>Start with a compelling introduction</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Use headings to structure your content</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Include code examples when relevant</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>End with a clear conclusion</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#48bb78] mt-0.5 flex-shrink-0" />
                    <p>Proofread before publishing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Guidelines */}
            <Card className="bg-[#3a3741] border-[#fed5ff]">
              <CardHeader>
                <CardTitle className="text-[#ebebeb] flex items-center text-lg">
                  <AlertCircle className="w-5 h-5 mr-2 text-[#e59770]" />
                  Blog Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-[#ebebeb] opacity-80">
                  <p>• Share original, valuable content</p>
                  <p>• Be respectful and professional</p>
                  <p>• Cite sources when appropriate</p>
                  <p>• Use clear, engaging language</p>
                  <p>• Focus on helping the community learn</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}