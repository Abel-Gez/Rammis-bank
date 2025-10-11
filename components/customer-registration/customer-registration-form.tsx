"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"



// -------------------- TYPES --------------------
interface FormData {
  firstName: string
  middleName: string
  lastName: string
  mothersName: string
  gender: string
  nationality: string
  idNumber: string
  phoneNumber: string
  monthlyIncome: string
  accountType: string
  branchPreference: string // Branch ID from backend
  faydaNumber: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

interface UploadedFile {
  id: string
  file: File
  name: string
  type: string
  size: number
  status: "uploading" | "completed" | "error"
}

interface FormErrors {
  [key: string]: string
}

interface Branch {
  id: number
  name: string
}

// -------------------- COMPONENT --------------------
export function CustomerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [branches, setBranches] = useState<Branch[]>([])
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
    faydaNumber: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Contact & Account Information" },
    { id: 3, title: "Upload Documents" },
    { id: 4, title: "Review & Submit" },
  ]

  // -------------------- LOAD BRANCH LIST --------------------
  useEffect(() => {
    async function loadBranches() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/branches/")
        const data = await res.json()
        setBranches(data)
      } catch (error) {
        console.error("Failed to load branches:", error)
      }
    }
    loadBranches()
  }, [])

  // -------------------- FORM HANDLERS --------------------
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFormErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const fileId = Math.random().toString(36).substring(2, 9)
      const newFile: UploadedFile = {
        id: fileId,
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        status: "uploading",
      }
      setUploadedFiles((prev) => [...prev, newFile])

      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "completed" } : f
          )
        )
      }, 1200)
    })
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  // -------------------- VALIDATION --------------------
  const validateStep = (): boolean => {
    const errors: FormErrors = {}
    let valid = true

    switch (currentStep) {
      case 1:
        if (!formData.firstName) {
          errors.firstName = "First name is required"
          valid = false
        }
        if (!formData.lastName) {
          errors.lastName = "Last name is required"
          valid = false
        }
        if (!formData.mothersName) {
          errors.mothersName = "Mother's name is required"
          valid = false
        }
        if (!formData.gender) {
          errors.gender = "Gender is required"
          valid = false
        }
        if (!formData.nationality) {
          errors.nationality = "Nationality is required"
          valid = false
        }
        if (!formData.faydaNumber) {
          errors.faydaNumber = "Fayda number is required"
          valid = false
        }
        break

      case 2:
        if (!formData.phoneNumber) {
          errors.phoneNumber = "Phone number is required"
          valid = false
        }
        if (!formData.monthlyIncome) {
          errors.monthlyIncome = "Monthly income is required"
          valid = false
        }
        if (!formData.accountType) {
          errors.accountType = "Account type is required"
          valid = false
        }
        if (!formData.branchPreference) {
          errors.branchPreference = "Please select a branch"
          valid = false
        }
        break

      case 3:
        if (
          uploadedFiles.length === 0 ||
          uploadedFiles.every((f) => f.status !== "completed")
        ) {
          toast({
            title: "Missing ID Document",
            description:
              "Please upload your ID document (National ID, Kebele, or Passport).",
          })
          valid = false
        }
        break

      case 4:
        if (!formData.agreeToTerms) {
          toast({
            title: "Terms Agreement Required",
            description: "You must agree to the Terms and Conditions.",
          })
          valid = false
        }
        break
    }

    setFormErrors(errors)
    return valid
  }

  const nextStep = () => {
    if (validateStep()) setCurrentStep((s) => s + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1)
  }

  // -------------------- SUBMIT --------------------
  const handleSubmit = async () => {
  if (!validateStep()) return

  setIsSubmitting(true)
  try {
    const data = new FormData()

    const fullName = `${formData.firstName} ${
      formData.middleName ? formData.middleName + " " : ""
    }${formData.lastName}`.trim()

    data.append("full_name", fullName)
    data.append("mother_name", formData.mothersName)
    data.append("phone", formData.phoneNumber)
    data.append("gender", formData.gender)
    data.append("nationality", formData.nationality)
    data.append("fayda_number", formData.faydaNumber)
    data.append("monthly_income", formData.monthlyIncome)
    data.append("account_type", formData.accountType)
    data.append("branch_id", formData.branchPreference)
    data.append("agree_to_terms", String(formData.agreeToTerms))
    data.append("agree_to_marketing", String(formData.agreeToMarketing))

    const firstCompleted = uploadedFiles.find((f) => f.status === "completed")
    if (firstCompleted) {
      data.append("national_id_file", firstCompleted.file, firstCompleted.name)
    }

    const res = await fetch("http://127.0.0.1:8000/api/v1/accounts/", {
      method: "POST",
      body: data,
    })

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      console.error("Backend Error:", json)
      toast({
        title: "❌ Submission Failed",
        description:
          json.detail || "Please review your form. Some fields may be invalid.",
        variant: "destructive",
        duration: 5000,
      })
      setFormErrors(json)
      return
    }

    // -------------------- GREAT SUCCESS TOAST --------------------
    toast({
      title: "🎉 Application Submitted!",
      description: "Your application has been successfully submitted.",
      variant: "default",
      duration: 4000,
    })

    setFormErrors({})

    // -------------------- RESET FORM --------------------
    setFormData({
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
      faydaNumber: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    })
    setUploadedFiles([])
    setCurrentStep(1)
  } catch (error) {
    console.error("Submission error:", error)
    toast({
      title: "🌐 Network Error",
      description: "Unable to submit. Please try again later.",
      variant: "destructive",
      duration: 8000,
    })
  } finally {
    setIsSubmitting(false)
  }
}


  // -------------------- UI HELPERS --------------------
  const SelectTriggerClass =
    "bg-white text-black border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-100"

  const SelectContentClass =
    "bg-white text-black shadow-lg border border-gray-200 rounded-md z-50"

  // -------------------- STEP RENDER --------------------
  const renderStepContent = () => {
    switch (currentStep) {
      // Step 1 - Personal
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Label>Middle Name</Label>
                <Input
                  value={formData.middleName}
                  onChange={(e) =>
                    handleInputChange("middleName", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Last Name *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              <div>
                <Label>Mother's Name *</Label>
                <Input
                  value={formData.mothersName}
                  onChange={(e) =>
                    handleInputChange("mothersName", e.target.value)
                  }
                />
                {formErrors.mothersName && (
                  <p className="text-red-500 text-sm">
                    {formErrors.mothersName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => handleInputChange("gender", v)}
                >
                  <SelectTrigger className={SelectTriggerClass}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className={SelectContentClass}>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.gender && (
                  <p className="text-red-500 text-sm">{formErrors.gender}</p>
                )}
              </div>

              <div>
                <Label>Nationality *</Label>
                <Input
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange("nationality", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label>Fayda Number *</Label>
              <Input
                value={formData.faydaNumber}
                onChange={(e) =>
                  handleInputChange("faydaNumber", e.target.value)
                }
              />
              {formErrors.faydaNumber && (
                <p className="text-red-500 text-sm">
                  {formErrors.faydaNumber}
                </p>
              )}
            </div>
          </div>
        )

      // Step 2 - Contact & Account
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  placeholder="+251 9XX XXX XXX"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Monthly Income (ETB) *</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={formData.monthlyIncome}
                  onChange={(e) =>
                    handleInputChange("monthlyIncome", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Account Type *</Label>
                <Select
                  value={formData.accountType}
                  onValueChange={(v) => handleInputChange("accountType", v)}
                >
                  <SelectTrigger className={SelectTriggerClass}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className={SelectContentClass}>
                    <SelectItem value="wadia">Wadia Account</SelectItem>
                    <SelectItem value="mudarabah">
                      Mudarabah Account
                    </SelectItem>
                    <SelectItem value="qard">Qard</SelectItem>
                    <SelectItem value="haji_saving">
                      Haji Saving Account
                    </SelectItem>
                    <SelectItem value="foreign_currency">
                      Foreign Currency Account
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Preferred Branch *</Label>
                <Select
                  value={formData.branchPreference}
                  onValueChange={(v) => handleInputChange("branchPreference", v)}
                >
                  <SelectTrigger className={SelectTriggerClass}>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className={SelectContentClass}>
                    {branches.length > 0 ? (
                      branches.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        Loading...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      // Step 3 - Upload
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Upload Your ID Document
              </h3>
              <p className="text-gray-600 mb-6">
                Please upload a clear scan/photo of your{" "}
                <strong>National ID, Kebele ID, or Passport</strong>.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative bg-white">
              <Upload className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-lg font-medium">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supported: PDF, JPG, PNG. Max 5MB.
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-500 w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                                            {file.status === "uploading" && (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      )}
                      {file.status === "completed" && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
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

      // Step 4 - Review & Submit
      case 4:
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Full Name:</strong>{" "}
                    {`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
                  </div>
                  <div>
                    <strong>Mother’s Name:</strong> {formData.mothersName}
                  </div>
                  <div>
                    <strong>Gender:</strong> {formData.gender}
                  </div>
                  <div>
                    <strong>Nationality:</strong> {formData.nationality}
                  </div>
                  <div>
                    <strong>Phone:</strong> {formData.phoneNumber}
                  </div>
                  <div>
                    <strong>Fayda Number:</strong> {formData.faydaNumber}
                  </div>
                  <div>
                    <strong>Monthly Income:</strong> {formData.monthlyIncome} ETB
                  </div>
                  <div>
                    <strong>Account Type:</strong> {formData.accountType}
                  </div>
                  <div>
                    <strong>Branch Preference:</strong>{" "}
                    {
                      branches.find(
                        (b) => String(b.id) === formData.branchPreference
                      )?.name
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(v) =>
                    handleInputChange("agreeToTerms", Boolean(v))
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Terms and Conditions
                  </a>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(v) =>
                    handleInputChange("agreeToMarketing", Boolean(v))
                  }
                />
                <Label htmlFor="marketing" className="text-sm">
                  I want to receive updates and marketing information.
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // -------------------- MAIN RETURN --------------------
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Progress Header */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 text-center ${
              currentStep >= step.id
                ? "text-blue-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                currentStep >= step.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.id}
            </div>
            <div className="text-xs md:text-sm">{step.title}</div>
          </div>
        ))}
      </div>

      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < steps.length ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
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

export default CustomerRegistrationForm

