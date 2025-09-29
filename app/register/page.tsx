import { RegisterForm } from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2 } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rammisBlue/5 via-white to-rammisLightBlue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-rammisBlue rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold bg-gradient-to-r from-rammisBlue to-rammisLightBlue bg-clip-text text-transparent">
                Rammis Bank
              </span>
              <span className="text-sm text-rammisLightBlue font-medium">Interest Free Banking</span>
            </div>
          </Link>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl border border-rammisBlue/10 bg-white/95 backdrop-blur-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-rammisBlue via-rammisLightBlue to-rammisBlue"></div>
          <CardHeader className="text-center space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-rammisBlue">Create Your Account</CardTitle>
            <CardDescription className="text-rammisBlue/80 text-sm">
              Join our growing community of satisfied customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center border-t border-rammisBlue/10 pt-4">
              <p className="text-sm text-rammisBlue/80">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-rammisBlue hover:text-rammisLightBlue font-semibold hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Trust Indicators */}
        <div className="text-center space-y-2 px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-rammisBlue/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rammisBlue">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="text-sm text-rammisBlue/80">Bank-level security & encryption</p>
          </div>
          <p className="text-xs text-rammisBlue/70">
            By creating an account, you agree to our{" "}
            <Link 
              href="/terms" 
              className="text-rammisBlue hover:text-rammisLightBlue font-medium hover:underline transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              href="/privacy" 
              className="text-rammisBlue hover:text-rammisLightBlue font-medium hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
