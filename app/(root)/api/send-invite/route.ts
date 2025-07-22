import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, meetingLink } = await req.json();
    if (!to || !meetingLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const {  error } = await resend.emails.send({
      from: 'GoPro Support <support@goproibpl.com>',
      to,
      subject: 'You are invited to a meeting!',
      html: `<p>You have been invited to a meeting. Click the link below to join:</p><a href="${meetingLink}">${meetingLink}</a>`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 