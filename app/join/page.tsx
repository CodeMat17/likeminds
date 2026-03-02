"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  UserIcon, MapPinIcon, BriefcaseIcon, HeartHandshakeIcon,
  CheckCircle2Icon, ArrowRightIcon, ArrowLeftIcon, SendIcon,
  PhoneIcon, CalendarIcon, ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Emblem } from "@/components/ui/Emblem";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

// ─── Schema ─────────────────────────────────────────────
const schema = z.object({
  // Step 1 – Personal
  firstName:   z.string().min(2, "First name must be at least 2 characters"),
  lastName:    z.string().min(2, "Last name must be at least 2 characters"),
  otherNames:  z.string().optional(),
  dateOfBirth: z
    .date({ error: "Please select your date of birth" })
    .refine(
      (d) => d.getFullYear() >= 1980 && d.getFullYear() <= 1986,
      "You must be born between 1980 and 1986"
    ),
  fathersName: z.string().min(2, "Father's name is required"),
  mothersName: z.string().min(2, "Mother's name is required"),
  familyName:  z.string().min(2, "Family / Umunna name is required"),

  // Step 2 – Contact & Work
  phone:               z.string().min(7, "Phone number is required"),
  residentialAddress:  z.string().min(5, "Residential address is required"),
  city:                z.string().min(2, "City is required"),
  stateOfResidence:    z.string().min(2, "State of residence is required"),
  occupation:          z.string().min(2, "Occupation / Business is required"),

  // Step 3 – Declaration
  agreeIndigene:       z.boolean().refine((v) => v === true, "You must confirm you are an indigene of Nomeh Unateze"),
  agreeCharacter:      z.boolean().refine((v) => v === true, "You must confirm you are of good character"),
  agreeBirthYear:      z.boolean().refine((v) => v === true, "You must confirm you were born between 1980 and 1986"),
  agreeConstitution:   z.boolean().refine((v) => v === true, "You must agree to be bound by the association's constitution"),
  agreeRegistrationFee: z.boolean().refine((v) => v === true, "You must acknowledge the one-time registration fee of ₦100,000"),
});

type FormData = z.infer<typeof schema>;

// ─── Steps ──────────────────────────────────────────────
const steps = [
  { id: 1, title: "Personal Details",  icon: UserIcon,         description: "Your identity and family background" },
  { id: 2, title: "Contact & Work",    icon: PhoneIcon,        description: "How to reach you and your occupation" },
  { id: 3, title: "Declaration",       icon: HeartHandshakeIcon, description: "Eligibility confirmation and pledge" },
];

// ─── Step 1 ─────────────────────────────────────────────
function Step1({ control, register, errors }: {
  control: Control<FormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
          <Input id="firstName" placeholder="e.g. Chukwuemeka" {...register("firstName")} />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
          <Input id="lastName" placeholder="e.g. Okafor" {...register("lastName")} />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherNames">Other Names <span className="text-muted-foreground text-xs">(optional)</span></Label>
        <Input id="otherNames" placeholder="e.g. Emmanuel" {...register("otherNames")} />
      </div>

      {/* Date of Birth — shadcn Calendar + Popover */}
      <div className="space-y-2">
        <Label>Date of Birth <span className="text-destructive">*</span></Label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {field.value
                    ? field.value.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
                    : "Select your date of birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  defaultMonth={new Date(1983, 0)}
                  disabled={(date) =>
                    date < new Date(1980, 0, 1) || date > new Date(1986, 11, 31)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
        <p className="text-[11px] text-muted-foreground">Only dates between 1 Jan 1980 and 31 Dec 1986 are selectable.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fathersName">Father&apos;s Name <span className="text-destructive">*</span></Label>
          <Input id="fathersName" placeholder="e.g. Ikechukwu Okafor" {...register("fathersName")} />
          {errors.fathersName && <p className="text-xs text-destructive">{errors.fathersName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="mothersName">Mother&apos;s Name <span className="text-destructive">*</span></Label>
          <Input id="mothersName" placeholder="e.g. Ngozi Okafor" {...register("mothersName")} />
          {errors.mothersName && <p className="text-xs text-destructive">{errors.mothersName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyName">Family / Umunna Name <span className="text-destructive">*</span></Label>
        <Input id="familyName" placeholder="e.g. Umunna Ezenwachi" {...register("familyName")} />
        {errors.familyName && <p className="text-xs text-destructive">{errors.familyName.message}</p>}
      </div>
    </div>
  );
}

// ─── Step 2 ─────────────────────────────────────────────
function Step2({ register, errors }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input id="phone" type="tel" placeholder="+234 800 000 0000" className="pl-9" {...register("phone")} />
        </div>
        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="residentialAddress">Residential Address <span className="text-destructive">*</span></Label>
        <div className="relative">
          <MapPinIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Textarea
            id="residentialAddress"
            placeholder="House number, Street, Area"
            className="pl-9 min-h-[80px]"
            {...register("residentialAddress")}
          />
        </div>
        {errors.residentialAddress && <p className="text-xs text-destructive">{errors.residentialAddress.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
          <Input id="city" placeholder="e.g. Enugu" {...register("city")} />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stateOfResidence">State of Residence <span className="text-destructive">*</span></Label>
          <Input id="stateOfResidence" placeholder="e.g. Enugu State" {...register("stateOfResidence")} />
          {errors.stateOfResidence && <p className="text-xs text-destructive">{errors.stateOfResidence.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation / Business <span className="text-destructive">*</span></Label>
        <div className="relative">
          <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="occupation"
            placeholder="e.g. Medical Doctor, Contractor, Businessman"
            className="pl-9"
            {...register("occupation")}
          />
        </div>
        {errors.occupation && <p className="text-xs text-destructive">{errors.occupation.message}</p>}
      </div>
    </div>
  );
}

// ─── Step 3 ─────────────────────────────────────────────
function Step3({ register, errors }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}) {
  const declarations = [
    {
      name: "agreeIndigene" as const,
      label: "I confirm that I am an indigene of Nomeh Unateze community.",
    },
    {
      name: "agreeCharacter" as const,
      label: "I certify that I am of good character and do not have any questionable conduct that could bring the association into disrepute.",
    },
    {
      name: "agreeBirthYear" as const,
      label: "I confirm that I was born between 1980 and 1986, as indicated by the date of birth I have provided.",
    },
    {
      name: "agreeConstitution" as const,
      label: "I agree to be governed by the provisions of the LikeMinds 1980–1986 Association Constitution and to uphold its values and objectives.",
    },
    {
      name: "agreeRegistrationFee" as const,
      label: "I acknowledge the one-time registration fee of ₦100,000, payable upon formal acceptance of my application by the Executive Council.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Eligibility summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="size-4 text-primary shrink-0" />
          <p className="text-sm font-semibold text-foreground">Membership Eligibility Criteria</p>
        </div>
        {[
          { icon: "🏡", text: "You are an indigene of Nomeh Unateze" },
          { icon: "✅", text: "You are of good and unquestionable character" },
          { icon: "📅", text: "You were born between 1980 and 1986" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <span className="text-base shrink-0">{icon}</span>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      {/* Registration fee callout */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl shrink-0">💳</span>
        <div>
          <p className="text-sm font-semibold text-foreground">Registration Fee: ₦100,000</p>
          <p className="text-xs text-muted-foreground mt-1">
            A one-time fee payable upon formal acceptance of your application by the Executive Council. Payment details will be communicated to successful applicants.
          </p>
        </div>
      </div>

      <Separator />

      {/* Declaration & pledge */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Solemn Declaration & Pledge</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            By submitting this application I solemnly declare that all information provided is true and correct,
            and I pledge to uphold the spirit of{" "}
            <em className="font-semibold text-foreground">Ofu Obi Umunwanne</em> in all my dealings as a member.
          </p>
        </div>

        {declarations.map(({ name, label }) => (
          <div key={name}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register(name)}
                className="accent-primary mt-0.5 shrink-0 size-4"
              />
              <span className="text-sm text-foreground leading-relaxed">
                {label} <span className="text-destructive">*</span>
              </span>
            </label>
            {errors[name] && (
              <p className="text-xs text-destructive mt-1 ml-7">{errors[name].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, trigger, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["firstName", "lastName", "dateOfBirth", "fathersName", "mothersName", "familyName"],
    2: ["phone", "residentialAddress", "stateOfResidence", "city", "occupation"],
    3: ["agreeIndigene", "agreeCharacter", "agreeBirthYear", "agreeConstitution", "agreeRegistrationFee"],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success("Application submitted successfully!", {
      description: "We will review your application and contact you soon.",
    });
  };

  if (isSubmitted) {
    return (
      <div className='pt-16 min-h-screen bg-muted/30 flex items-center justify-center px-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-md w-full text-center bg-card rounded-2xl border border-border p-10 shadow-xl'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className='mb-3'>
            <CheckCircle2Icon className='size-16 text-green-light mx-auto' />
          </motion.div>
       
         

          <h2 className='font-serif text-2xl font-bold text-foreground mb-3'>
            Application Received!
          </h2>
          <p className='text-muted-foreground text-sm leading-relaxed mb-6'>
            Thank you for applying to join the{" "}
            <strong className='text-foreground'>
              LikeMinds 1980–1986 Association
            </strong>
            . Your application will be reviewed by the Executive Council. We
            will contact you within 2–7 working days.
          </p>
          <p className='font-serif italic font-semibold text-lg mb-6'>
            &ldquo;Ofu Obi Umunwanne&rdquo;
          </p>
          <Button asChild className='bg-primary hover:bg-primary/90 w-full'>
            <Link href='/'>Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="relative py-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.48_0.07_218)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-4">
            <motion.div variants={fadeInUp}>
              <Image alt="logo" width={90} height={90} src="/logo.webp" className="object-cover" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge variant="gold" className="text-xs tracking-widest">BECOME A MEMBER</Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Membership Application
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 max-w-lg text-sm leading-relaxed">
              Membership is open exclusively to male indigenes of Nomeh Unateze of good character, born between 1980 and 1986.
            </motion.p>

            {/* Eligibility chips */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2">
              {["Nomeh Unateze Indigene", "Good Character", "Born 1980 – 1986"].map((c) => (
                <span key={c} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/85 text-xs px-3 py-1.5 rounded-full">
                  <CheckCircle2Icon className="size-3 shrink-0" />
                  {c}
                </span>
              ))}
            </motion.div>

            {/* Fee */}
            <motion.div variants={fadeInUp} className="bg-white/10 border border-white/20 rounded-xl px-6 py-3">
              <p className="text-white/60 text-xs">One-time Registration Fee</p>
              <p className="text-white font-serif font-bold text-2xl mt-0.5">₦100,000</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
            <motion.div
              className="absolute top-5 left-0 h-0.5 bg-primary"
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            {steps.map((step) => {
              const isComplete = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isComplete
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-border text-muted-foreground"
                  }`}>
                    {isComplete ? <CheckCircle2Icon className="size-5" /> : <step.icon className="size-4" />}
                  </div>
                  <div className="hidden sm:flex flex-col items-center">
                    <span className={`text-[11px] font-semibold ${isActive ? "text-primary" : isComplete ? "text-primary/60" : "text-muted-foreground"}`}>
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <p className="font-semibold text-foreground text-sm">Step {currentStep}: {steps[currentStep - 1].title}</p>
            <p className="text-xs text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">{steps[currentStep - 1].title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{steps[currentStep - 1].description}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {currentStep === 1 && <Step1 control={control} register={register} errors={errors} />}
                  {currentStep === 2 && <Step2 register={register} errors={errors} />}
                  {currentStep === 3 && <Step3 register={register} errors={errors} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6 flex items-center justify-between gap-3 border-t border-border pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>
              <span className="text-xs text-muted-foreground">{currentStep} / {steps.length}</span>
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90">
                  Next
                  <ArrowRightIcon className="size-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="gap-2 bg-primary hover:bg-primary/90">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Submit Application
                      <SendIcon className="size-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help? Contact us at{" "}
          <a href="mailto:info@likeminds-nomeh.org" className="text-primary hover:underline">
            info@likeminds-nomeh.org
          </a>
        </p>
      </div>
    </div>
  );
}
