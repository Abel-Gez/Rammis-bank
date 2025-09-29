"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  mothersName: string
  gender: string
  nationality: string
  idNumber: string
  phoneNumber: string

  // Address Information
  

  // Employment Information
  monthlyIncome: string

  // Account Information
  accountType: string
  branchPreference: string


  // Agreements
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  status: "uploading" | "completed" | "error"
}

export function CustomerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    mothersName: "",
    gender: "",
    nationality: "Ethiopian",
    idNumber: "",
    phoneNumber: "",
    monthlyIncome: "",
    accountType: "",
    branchPreference: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic personal details" },
    { id: 2, title: "Contact & Account Information", description: "Contact and Account information" },
    { id: 3, title: "Upload Documents", description: "Required documents" },
    { id: 4, title: "Review & Submit", description: "Final review" },
  ]

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9)
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        status: "uploading",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate file upload
      setTimeout(() => {
        setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "completed" } : f)))
      }, 2000)
    })
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and contact you within 24-48 hours.",
      })
      // Redirect to success page or dashboard
    }, 3000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input className="bg-white"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input className="bg-white"
                id="middleName"
                value={formData.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
              />
            </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input className="bg-white"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mothersName">Mother's Name</Label>
              <Input className="bg-white"
                id="mothersName"
                value={formData.mothersName}
                onChange={(e) => handleInputChange("mothersName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue className="bg-white" placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationality" >Nationality *</Label>
                <Input className="bg-white"
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber" >ID Number *</Label>
                <Input className="bg-white"
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="Ethiopian ID or Passport Number"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input className="bg-white"
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+251 9XX XXX XXX"
                  required
                />
              </div>
            </div>
              <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (ETB)</Label>
                  <Select
                    value={formData.monthlyIncome}
                    onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectContent className="bg-white shadow-lg">
                        <SelectItem value="below-5000">Below 5,000 ETB</SelectItem>
                        <SelectItem value="5000-15000">5,000 - 15,000 ETB</SelectItem>
                        <SelectItem value="15000-30000">15,000 - 30,000 ETB</SelectItem>
                        <SelectItem value="30000-50000">30,000 - 50,000 ETB</SelectItem>
                      </SelectContent>
                      <SelectItem value="above-50000">Above 50,000 ETB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type *</Label>
              <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="current">Current Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="business">Business Account</SelectItem>
                  <SelectItem value="investment">Investment Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchPreference">Preferred Branch</Label>
              <Select
                value={formData.branchPreference}
                onValueChange={(value) => handleInputChange("branchPreference", value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select preferred branch" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="bole">Bole Branch</SelectItem>
                  <SelectItem value="piazza">Piazza Branch</SelectItem>
                  <SelectItem value="merkato">Merkato Branch</SelectItem>
                  <SelectItem value="kazanchis">Kazanchis Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Upload Required Documents</h3>
              <p className="text-gray-600 mb-6">Please upload clear, readable copies of the required documents</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="bg-white w-12 h-12 text-gray-700 mx-auto mb-4" />
              <div className="space-y-2 ">
                <p className="text-lg font-medium">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG (Max 5MB each)</p>
              </div>
              <input 
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="bg-white absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Uploaded Files</h4>
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === "uploading" && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                      {file.status === "completed" && <CheckCircle className="w-4 h-4 text-rammisLightBlue" />}
                      {file.status === "error" && <Badge variant="destructive">Error</Badge>}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review Your Application</h3>
              <p className="text-gray-600 mb-6">Please review all information before submitting</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Gender:</strong> {formData.gender}
                  </p>
                  <p>
                    <strong>ID Number:</strong> {formData.idNumber}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Phone:</strong> {formData.phoneNumber}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Account Type:</strong> {formData.accountType}
                  </p>
                  <p>
                    <strong>Preferred Branch:</strong> {formData.branchPreference}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                  I agree to the Terms and Conditions, Privacy Policy, and confirm that all information provided is
                  accurate and complete.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreeToMarketing" className="text-sm leading-relaxed">
                  I agree to receive marketing communications about Rammis Bank products and services.
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep >= step.id ? "bg-rammisBlue text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? "bg-rammisBlue" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
        <p className="text-gray-600">{steps[currentStep - 1].description}</p>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={nextStep} className="bg-rammisBlue hover:bg-rammisLightBlue">
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!formData.agreeToTerms || isSubmitting}
            className="bg-rammisBlue hover:bg-rammisLightBlue"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
