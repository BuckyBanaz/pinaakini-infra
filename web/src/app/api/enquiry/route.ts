import { NextRequest, NextResponse } from "next/server";
import { EnquirySubmission } from "@/types/project";

export async function POST(req: NextRequest) {
  try {
    const body: EnquirySubmission = await req.json();

    // 1. Honeypot check for spam bots
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Silently drop spam submission
      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully." },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const phoneClean = body.phoneNumber ? body.phoneNumber.replace(/[\s-]/g, "") : "";
    if (!phoneClean || phoneClean.length < 8 || !/^\+?[0-9]{8,15}$/.test(phoneClean)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact phone number." },
        { status: 400 }
      );
    }

    if (body.email && body.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: "Please confirm your consent for our team to contact you." },
        { status: 400 }
      );
    }

    // 3. Dispatch lead to destination if configured (e.g., Email or Webhook)
    const destinationEmail = process.env.LEAD_DESTINATION_EMAIL || "enquiries@pinakiniinfra.com";
    const resendApiKey = process.env.RESEND_API_KEY;
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    // Log internally for developer/server tracing
    console.log("[Pinaakini Lead Ingestion]", {
      timestamp: new Date().toISOString(),
      destination: destinationEmail,
      lead: {
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        projectName: body.projectName || "General Enquiry",
        enquiryType: body.enquiryType,
        preferredDate: body.preferredDate,
        message: body.message,
      },
    });

    if (resendApiKey) {
      // Dispatches via Resend transactional email API if provider key is configured
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Pinaakini Web <leads@pinakiniinfra.com>",
            to: destinationEmail,
            subject: `[New Lead - ${body.enquiryType}] ${body.fullName} - ${body.projectName || "General"}`,
            text: `
Name: ${body.fullName}
Phone: ${body.phoneNumber}
Email: ${body.email || "Not provided"}
Project: ${body.projectName || "General"}
Type: ${body.enquiryType}
Preferred Date: ${body.preferredDate || "N/A"}
Message: ${body.message || "N/A"}
            `,
          }),
        });
      } catch (mailErr) {
        console.error("Resend delivery failed:", mailErr);
      }
    }

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (webhookErr) {
        console.error("Webhook lead dispatch failed:", webhookErr);
      }
    }

    // Only claim delivery when a destination is actually configured.
    const delivered = Boolean(resendApiKey || webhookUrl);
    return NextResponse.json(
      {
        success: true,
        delivered,
        message: delivered
          ? "Thank you. Your enquiry has been received. Our team will contact you shortly."
          : "Demo mode: this website is not yet connected to an email or CRM, so your enquiry was not sent. Please call or WhatsApp us.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request. Please try calling or WhatsApp." },
      { status: 500 }
    );
  }
}
