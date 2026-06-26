import nodemailer from "nodemailer";

// ── Easy to change ────────────────────────────────────────────────────────────
// To update the recipient, change CONTACT_FORM_RECIPIENT in .env.local.
// Falls back to this default so it works without any env setup.
const RECIPIENT = process.env.CONTACT_FORM_RECIPIENT ?? "zohaib@faazfinancialgroup.com";
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailHtml({ firstName, lastName, email, phone, businessType, subject, message }) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:8px;">
      <div style="background:#f97316;padding:16px 24px;border-radius:6px 6px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;">New Contact Form Submission</h2>
        <p style="color:#fff9;margin:4px 0 0;font-size:13px;">Faaz Financial Group — faazfinancialgroup.com</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;border:1px solid #e5e7eb;border-top:none;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#f97316;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${phone || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Business Type</td><td style="padding:8px 0;">${businessType || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;">${subject || "—"}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <p style="color:#6b7280;font-size:13px;margin:0 0 8px;">Message</p>
        <p style="background:#f9fafb;padding:16px;border-radius:6px;margin:0;white-space:pre-wrap;font-size:14px;">${message}</p>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">
        Reply directly to this email to respond to ${firstName}.
      </p>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject } = body;

    if (!firstName || !email || !subject) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Guard: catch missing env vars before nodemailer gives a cryptic error
    if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
      console.error("Contact form: SMTP_USER or SMTP_APP_PASSWORD not set in .env.local");
      return Response.json(
        { error: "Server email config missing. Check SMTP_USER and SMTP_APP_PASSWORD in .env.local, then restart the dev server." },
        { status: 500 }
      );
    }

    // Gmail App Passwords are 16 chars; strip spaces/dashes in case they were copy-pasted with them
    const appPassword = process.env.SMTP_APP_PASSWORD.replace(/[\s-]/g, "");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: appPassword,
      },
    });

    await transporter.sendMail({
      from: `"Faaz Financial Group" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `[Contact Form] ${subject} — from ${firstName} ${lastName ?? ""}`.trim(),
      html: buildEmailHtml(body),
    });

    return Response.json({ success: true });
  } catch (err) {
    // Return the real error in the response so it's visible during debugging
    console.error("Contact form error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
