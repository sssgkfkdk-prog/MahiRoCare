import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOTP = async (to, otp) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@mahi-ro-care.com', // Must be verified in SendGrid
    subject: 'Mahi Ro Care - Your Login OTP',
    text: `Your OTP for login is ${otp}. It is valid for 10 minutes.`,
    html: `<strong>Your OTP for login is: ${otp}</strong><br/>It is valid for 10 minutes.`,
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
    
    console.error('SendGrid Error Detail:', {
      message: error.message,
      body: error.response?.body
    });
    
    return { success: false, error: errorDetail };
  }
};
