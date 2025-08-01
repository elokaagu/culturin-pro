// Stripe integration disabled for now
// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { headers } from 'next/headers';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-07-30.basil',
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.text();
//     const headersList = await headers();
//     const signature = headersList.get('stripe-signature');

//     if (!signature) {
//       return NextResponse.json(
//         { error: 'Missing stripe signature' },
//         { status: 400 }
//       );
//     }

//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
//     } catch (err) {
//       console.error('Webhook signature verification failed:', err);
//       return NextResponse.json(
//         { error: 'Invalid signature' },
//         { status: 400 }
//       );
//     }

//     // Handle the event
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object as Stripe.Checkout.Session;
//         console.log('Payment successful for session:', session.id);
        
//         // Update user's subscription status in your database
//         // This is where you would update the user's pro access
//         await handleSuccessfulPayment(session);
//         break;

//       case 'customer.subscription.created':
//         const subscription = event.data.object as Stripe.Subscription;
//         console.log('Subscription created:', subscription.id);
//         break;

//       case 'customer.subscription.updated':
//         const updatedSubscription = event.data.object as Stripe.Subscription;
//         console.log('Subscription updated:', updatedSubscription.id);
//         break;

//       case 'customer.subscription.deleted':
//         const deletedSubscription = event.data.object as Stripe.Subscription;
//         console.log('Subscription deleted:', deletedSubscription.id);
//         // Handle subscription cancellation
//         await handleSubscriptionCancellation(deletedSubscription);
//         break;

//       case 'invoice.payment_succeeded':
//         const invoice = event.data.object as Stripe.Invoice;
//         console.log('Payment succeeded for invoice:', invoice.id);
//         break;

//       case 'invoice.payment_failed':
//         const failedInvoice = event.data.object as Stripe.Invoice;
//         console.log('Payment failed for invoice:', failedInvoice.id);
//         // Handle failed payment
//         await handleFailedPayment(failedInvoice);
//         break;

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return NextResponse.json(
//       { error: 'Webhook handler failed' },
//       { status: 500 }
//     );
//   }
// }

// async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
//   try {
//     // Here you would:
//     // 1. Get the customer email from the session
//     // 2. Update the user's subscription status in your database
//     // 3. Grant them Pro access
    
//     const customerEmail = session.customer_details?.email;
//     const subscriptionId = session.subscription as string;
    
//     if (customerEmail) {
//       // Update user's pro access in your database
//       // This is a placeholder - implement based on your database structure
//       console.log(`Granting Pro access to: ${customerEmail}`);
      
//       // Example: Update user in Supabase
//       // await supabase
//       //   .from('users')
//       //   .update({ 
//       //     pro_access: true, 
//       //     subscription_id: subscriptionId,
//       //     trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
//       //   })
//       //   .eq('email', customerEmail);
//     }
//   } catch (error) {
//     console.error('Error handling successful payment:', error);
//   }
// }

// async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
//   try {
//     // Handle subscription cancellation
//     // Update user's access status in your database
//     console.log(`Cancelling Pro access for subscription: ${subscription.id}`);
    
//     // Example: Update user in Supabase
//     // await supabase
//     //   .from('users')
//     //   .update({ 
//     //     pro_access: false, 
//     //     subscription_id: null 
//     //   })
//     //   .eq('subscription_id', subscription.id);
//   } catch (error) {
//     console.error('Error handling subscription cancellation:', error);
//   }
// }

// async function handleFailedPayment(invoice: Stripe.Invoice) {
//   try {
//     // Handle failed payment
//     // You might want to send an email to the customer
//     console.log(`Payment failed for invoice: ${invoice.id}`);
    
//     // Example: Send email notification
//     // await sendPaymentFailedEmail(invoice.customer_email);
//   } catch (error) {
//     console.error('Error handling failed payment:', error);
//   }
// }

// Temporary placeholder response
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe webhook is currently disabled' },
    { status: 503 }
  );
} 