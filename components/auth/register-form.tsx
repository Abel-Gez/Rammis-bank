"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account Created Successfully",
        description: "Welcome to Rammis Bank! Please check your email to verify your account.",
      })
      router.push("/login")
    }, 2000)

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account Created Successfully",
        description: "Welcome to Rammis Bank! Please check your email to verify your account.",
      })
      router.push("/login")
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      accountType: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="userName" className="text-sm font-medium text-rammisBlue/90">
            User Name <span className="text-rammisRed">*</span>
          </Label>
          <div className="relative">
            <Input
              id="userName"
              name="userName"
              placeholder="John"
              value={formData.userName}
              onChange={handleInputChange}
              className="h-12 border-rammisBlue/30 focus-visible:ring-2 focus-visible:ring-rammisBlue/20 focus:border-rammisBlue/50 transition-all duration-200"
              required
            />
          </div>
        </div>
      
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-rammisBlue/90">
          Email Address <span className="text-rammisRed">*</span>
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="h-12 border-rammisBlue/30 focus-visible:ring-2 focus-visible:ring-rammisBlue/20 focus:border-rammisBlue/50 transition-all duration-200"
            required
          />
          <svg 
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rammisBlue/50" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="accountType" className="text-sm font-medium text-rammisBlue/90">
          Role <span className="text-rammisRed">*</span>
        </Label>
        <Select
          value={formData.role}
          onValueChange={handleSelectChange}
          required
        >
          <SelectTrigger className="h-12 border-rammisBlue/30 focus-visible:ring-2 focus-visible:ring-rammisBlue/20 focus:border-rammisBlue/50 transition-all duration-200">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-rammisBlue/20 shadow-lg">
            <SelectItem 
              value="human-resource" 
              className="px-4 py-2 hover:bg-rammisBlue/5 focus:bg-rammisBlue/5 text-rammisBlue/90 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-rammisBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Human Resource</span>
              </div>
            </SelectItem>
            <SelectItem 
              value="marketing" 
              className="px-4 py-2 hover:bg-rammisBlue/5 focus:bg-rammisBlue/5 text-rammisBlue/90 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-rammisBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Marketing</span>
              </div>
            </SelectItem>
            <SelectItem 
              value="it" 
              className="px-4 py-2 hover:bg-rammisBlue/5 focus:bg-rammisBlue/5 text-rammisBlue/90 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-rammisBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>IT</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 relative">
        <Label htmlFor="password" className="text-sm font-medium text-rammisBlue/90">
          Password <span className="text-rammisRed">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="h-12 border-rammisBlue/30 focus-visible:ring-2 focus-visible:ring-rammisBlue/20 focus:border-rammisBlue/50 transition-all duration-200 pr-10"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-rammisBlue/50 hover:text-rammisBlue/80 transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-rammisBlue/60 mt-1">
          Must be at least 8 characters
        </p>
      </div>

      <div className="space-y-1.5 relative">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-rammisBlue/90">
          Confirm Password <span className="text-rammisRed">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="h-12 border-rammisBlue/30 focus-visible:ring-2 focus-visible:ring-rammisBlue/20 focus:border-rammisBlue/50 transition-all duration-200 pr-10"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-rammisBlue/50 hover:text-rammisBlue/80 transition-colors p-1"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
            className="mt-1 border-rammisBlue/40 data-[state=checked]:bg-rammisBlue data-[state=checked]:text-white hover:border-rammisBlue/60 transition-colors"
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-5 text-rammisBlue/90 cursor-pointer">
            I agree to the{" "}
            <Button 
              type="button" 
              variant="link" 
              className="p-0 h-auto text-rammisBlue hover:text-rammisLightBlue/90 hover:underline transition-colors text-sm font-medium"
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button 
              type="button"
              variant="link" 
              className="p-0 h-auto text-rammisBlue hover:text-rammisLightBlue/90 hover:underline transition-colors text-sm font-medium"
            >
              Privacy Policy
            </Button>
            <span className="text-rammisRed">*</span>
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-rammisBlue to-rammisLightBlue hover:from-rammisBlue/90 hover:to-rammisLightBlue/90 hover:shadow-lg transition-all duration-200 text-white font-semibold text-base rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <span className="flex items-center justify-center">
            Create Account
            <svg 
              className="ml-2 w-4 h-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}
      </Button>
    </form>
  )
}
