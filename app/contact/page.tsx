"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";

import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactAddress,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactPhone,
  type ContactFormFields,
} from "@/lib/contact";
import { fadeIn } from "@/variants";

const ContactFormContent = () => {
  const recaptchaContext = useGoogleReCaptcha();
  const executeRecaptcha = recaptchaContext?.executeRecaptcha;

  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    emergencyContact: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitSuccess(false);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isValidContactName(form.name)) {
      errors.name = "Please enter your name.";
    }
    if (!isValidContactEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!isValidContactPhone(form.phone)) {
      errors.phone = "Please enter your phone number.";
    }
    if (!isValidContactAddress(form.address)) {
      errors.address = "Please enter your address.";
    }
    if (!isValidContactMessage(form.message)) {
      errors.message = "Please enter your message.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields properly.");
      return;
    }

    setIsLoading(true);

    try {
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_v3abdop";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_fqbuhnr";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "sZFnkcvuneTb_H4kJ";

      const emailjs = (await import("@emailjs/browser")).default;
      emailjs.init({ publicKey });

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          name: form.name,
          from_email: form.email,
          email: form.email,
          phone: form.phone,
          address: form.address,
          message: form.message,
          emergency_contact: form.emergencyContact || "N/A",
          emergencyContact: form.emergencyContact || "N/A",
          to_name: "Yasar A R",
          to_email: "aryasar2001@gmail.com",
        },
        publicKey,
      );

      toast.success("Message sent successfully!");
      setSubmitSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        emergencyContact: "",
      });
      setFieldErrors({});
    } catch (error: any) {
      console.error("EmailJS submission error:", error);
      const detail =
        error?.text ||
        error?.message ||
        (typeof error === "string" ? error : "EmailJS configuration error. Check EmailJS dashboard service & template setup.");
      toast.error(`EmailJS Error: ${detail}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex-1 flex flex-col gap-5 w-full mx-auto text-left"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Row 1: Full Name & Email Address */}
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="flex-1 min-w-0">
          <label htmlFor="name" className="block text-xs uppercase tracking-wider mb-1.5 text-white/80 font-medium">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            className={`input w-full ${fieldErrors.name ? "border-accent focus:border-accent" : ""}`}
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={200}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-accent">{fieldErrors.name}</p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-1.5 text-white/80 font-medium">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={`input w-full ${fieldErrors.email ? "border-accent focus:border-accent" : ""}`}
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={100}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-accent">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Phone Number & Emergency Contact */}
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="flex-1 min-w-0">
          <label htmlFor="phone" className="block text-xs uppercase tracking-wider mb-1.5 text-white/80 font-medium">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter your phone number (e.g. +91 9876543210)"
            className={`input w-full ${fieldErrors.phone ? "border-accent focus:border-accent" : ""}`}
            value={form.phone}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={30}
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-accent">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label htmlFor="emergencyContact" className="block text-xs uppercase tracking-wider mb-1.5 text-white/60 font-medium">
            Emergency Contact <span className="text-white/40 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="emergencyContact"
            type="tel"
            name="emergencyContact"
            placeholder="Enter emergency contact number"
            className="input w-full"
            value={form.emergencyContact}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={30}
          />
        </div>
      </div>

      {/* Row 3: Address */}
      <div className="w-full">
        <label htmlFor="address" className="block text-xs uppercase tracking-wider mb-1.5 text-white/80 font-medium">
          Address <span className="text-accent">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter your address"
          className={`textarea w-full resize-y min-h-20 ${fieldErrors.address ? "border-accent focus:border-accent" : ""}`}
          rows={2}
          value={form.address}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={500}
        />
        {fieldErrors.address && (
          <p className="mt-1 text-xs text-accent">{fieldErrors.address}</p>
        )}
      </div>

      {/* Row 4: Message */}
      <div className="w-full">
        <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-1.5 text-white/80 font-medium">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message here..."
          className={`textarea w-full resize-y min-h-28 ${fieldErrors.message ? "border-accent focus:border-accent" : ""}`}
          rows={3}
          value={form.message}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={2000}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-accent">{fieldErrors.message}</p>
        )}
      </div>

      {/* Success Notification Banner */}
      {submitSuccess && (
        <div className="p-3.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-sm font-medium text-center">
          Message sent successfully!
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-start">
        <button
          type="submit"
          className="btn rounded-full border border-white/50 min-w-48 px-8 py-3 transition-all duration-300 flex items-center justify-center gap-x-2 hover:border-accent hover:bg-accent/10 group disabled:opacity-50 disabled:pointer-events-none"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          <span>{isLoading ? "Sending..." : "Send Message"}</span>
          {!isLoading && (
            <BsArrowRight
              className="text-xl group-hover:translate-x-1 transition-all duration-300"
              aria-hidden
            />
          )}
        </button>
      </div>
    </motion.form>
  );
};

const Contact = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className="h-full bg-primary/30 overflow-y-auto py-20 xl:py-28">
      <div className="container mx-auto px-4 text-center xl:text-left flex items-center justify-center min-h-full">
        <div className="flex flex-col w-full max-w-2xl py-8">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-8"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          {siteKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
              <ContactFormContent />
            </GoogleReCaptchaProvider>
          ) : (
            <ContactFormContent />
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
