import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@mahi-ro-care.com',
    subject,
    text,
    html,
  };

  try {
    if (!msg.to || !msg.from) {
      throw new Error('Missing "to" or "from" email address');
    }
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    let errorDetail = error.message;
    if (error.response && error.response.body && error.response.body.errors) {
      errorDetail = error.response.body.errors.map(err => err.message).join(', ');
    }
    console.error('SendGrid Email Error:', errorDetail);
    return { success: false, error: errorDetail };
  }
};

export const sendOTP = async (to, otp) => {
  return sendEmail({
    to,
    subject: 'Mahi Ro Care - Your Login OTP',
    text: `Your OTP for login is ${otp}. It is valid for 10 minutes.`,
    html: `<strong>Your OTP for login is: ${otp}</strong><br/>It is valid for 10 minutes.`,
  });
};
