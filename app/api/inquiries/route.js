import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ServiceInquiry from '@/lib/models/ServiceInquiry';
import Subscription from '@/lib/models/Subscription';
import webpush from 'web-push';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // In a production app, validate inputs using a library like Zod
    if (!body.name || !body.phone || !body.address || !body.serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inquiry = await ServiceInquiry.create(body);

    // --- Send Push Notifications to Admins ---
    try {
      if (process.env.VAPID_SUBJECT && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        // Configure Web Push with VAPID keys
        webpush.setVapidDetails(
          process.env.VAPID_SUBJECT,
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          process.env.VAPID_PRIVATE_KEY
        );
        
        // Find all subscriptions for admins (where userId is null for hardcoded admin or find admin users)
        const adminSubscriptions = await Subscription.find({}); 

        const notificationPayload = JSON.stringify({
        title: 'New Service Booking! 💧',
        body: `${body.name} requested a ${body.serviceType} RO service at ${body.address}.`,
        url: '/admin/inquiries'
      });

      // Send the notification to all registered admin devices
      const pushPromises = adminSubscriptions.map(sub => 
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          notificationPayload
        ).catch(err => {
          console.error("Failed sending to endpoint, maybe unsubscribed:", err);
          if (err.statusCode === 404 || err.statusCode === 410) {
            // Delete expired subscriptions
            return Subscription.deleteOne({ endpoint: sub.endpoint });
          }
        })
      );

        await Promise.all(pushPromises);
      } else {
        console.warn("Skipping Push Notifications: VAPID keys are completely missing from environment variables.");
      }
    } catch (pushError) {
      console.error('Error sending push notifications:', pushError);
      // We don't want to fail the inquiry creation if push fails
    }

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Service Inquiry Error:', error);
    return NextResponse.json({ 
       error: 'CRASHED', 
       realError: String(error), 
       message: error.message,
       stack: error.stack
    }, { status: 500 });
  }
}
