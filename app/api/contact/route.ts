import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

import { CONTACT_RECAPTCHA_ACTION, validateContactForm } from "@/lib/contact";

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  message?: unknown;
  emergencyContact?: unknown;
  recaptchaToken?: unknown;
};

const getClientIp = (request: Request): string | undefined => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
};

const verifyRecaptcha = async (
  token: string,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let data: RecaptchaVerifyResponse;
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    data = (await response.json()) as RecaptchaVerifyResponse;
  } catch (error) {
    console.error("reCAPTCHA verification request failed:", error);
    return {
      ok: false,
      status: 502,
      error: "Unable to verify reCAPTCHA. Please try again.",
    };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  const score = data.score ?? 0;

  if (
    !data.success ||
    data.action !== CONTACT_RECAPTCHA_ACTION ||
    Number.isNaN(minScore) ||
    score < minScore
  ) {
    console.error("reCAPTCHA verification failed:", {
      success: data.success,
      action: data.action,
      errorCodes: data["error-codes"],
    });
    return {
      ok: false,
      status: 403,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  return { ok: true };
};

export async function POST(request: Request) {
  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const address = typeof payload.address === "string" ? payload.address.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const emergencyContact =
    typeof payload.emergencyContact === "string" ? payload.emergencyContact.trim() : "";
  const recaptchaToken =
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : "";

  const validationError = validateContactForm({
    name,
    email,
    phone,
    address,
    message,
    emergencyContact,
  });

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(
      recaptchaToken,
      getClientIp(request),
    );
    if (!recaptchaResult.ok) {
      return NextResponse.json(
        { error: recaptchaResult.error },
        { status: recaptchaResult.status },
      );
    }
  }

  const emailHost = process.env.EMAIL_HOST;
  const emailPort = Number(process.env.EMAIL_PORT || 587);
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    "aryasar2001@gmail.com";

  const subject = `New Portfolio Contact - ${name}`;
  const textBody = `New Contact Form Submission

Name:
${name}

Email:
${email}

Phone:
${phone}

Address:
${address}

Emergency Contact:
${emergencyContact || "N/A"}

Message:
${message}

--------------------------------
Submitted from Yasar's Portfolio
--------------------------------`;

  // 1. Send via SMTP (Nodemailer) if EMAIL_USER and EMAIL_PASSWORD are set
  if (emailHost && emailUser && emailPassword) {
    try {
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: receiverEmail,
        subject,
        text: textBody,
      });

      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("Nodemailer SMTP failed:", error);
      return NextResponse.json(
        { error: "Failed to send email via SMTP. Please verify email credentials in .env.local." },
        { status: 500 },
      );
    }
  }

  // 2. Fallback to Resend if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (resendApiKey && resendFrom) {
    try {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: resendFrom,
        to: receiverEmail,
        replyTo: email,
        subject,
        text: textBody,
      });

      if (error) {
        console.error("Resend send failed:", error);
        return NextResponse.json(
          { error: "Failed to send message via Resend. Please try again." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("Unexpected error in Resend:", error);
      return NextResponse.json(
        { error: "Failed to send message via Resend. Please try again." },
        { status: 500 },
      );
    }
  }

  // 3. Dev / Fallback mode: Log submission to terminal and accept submission
  console.log("==========================================");
  console.log("   NEW CONTACT FORM SUBMISSION RECEIVED   ");
  console.log("==========================================");
  console.log(`Target Recipient: ${receiverEmail}`);
  console.log(`Subject         : ${subject}`);
  console.log("------------------------------------------");
  console.log(textBody);
  console.log("==========================================");

  return NextResponse.json({
    ok: true,
    message: "Form submitted successfully! (To enable live email delivery, add EMAIL_USER & EMAIL_PASSWORD to .env.local)",
  });
}
