# Stripe Billing Integration Setup

This document outlines how to set up Stripe billing for subscription management in the Culturin Pro platform.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed
3. Next.js application running

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs for subscription plans
STRIPE_STARTER_PRICE_ID=price_starter_plan_id
STRIPE_GROWTH_PRICE_ID=price_growth_plan_id
STRIPE_PRO_PRICE_ID=price_pro_plan_id
```

## Stripe Dashboard Setup

### 1. Create Products and Prices

In your Stripe Dashboard:

1. Go to Products → Add Product
2. Create three products:

   - **Starter Plan**: $29/month
   - **Growth Plan**: $99/month
   - **Pro Plan**: $199/month

3. For each product, create a recurring price:
   - Set billing period to Monthly
   - Copy the Price ID (starts with `price_`) for your environment variables

### 2. Set up Webhooks

1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook signing secret for your environment variables

### 3. Get API Keys

1. Go to Developers → API Keys
2. Copy the Publishable key and Secret key
3. Add them to your environment variables

## Features Implemented

### Subscription Management

- ✅ Create new subscriptions
- ✅ Update existing subscriptions (upgrade/downgrade)
- ✅ Cancel subscriptions
- ✅ Handle subscription status changes via webhooks

### Payment Processing

- ✅ Secure payment collection using Stripe Elements
- ✅ Payment method management
- ✅ Invoice generation and download
- ✅ Failed payment handling

### Customer Management

- ✅ Automatic customer creation
- ✅ Customer data synchronization
- ✅ Payment method storage

### UI Components

- ✅ Subscription plan selection
- ✅ Payment form with Stripe Elements
- ✅ Billing history display
- ✅ Payment method management

## API Endpoints

The following API endpoints are available:

- `POST /api/stripe/create-customer` - Create or retrieve a Stripe customer
- `POST /api/stripe/create-subscription` - Create a new subscription
- `POST /api/stripe/update-subscription` - Update an existing subscription
- `POST /api/stripe/cancel-subscription` - Cancel a subscription
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Usage

### Creating a Subscription

```typescript
import { useStripeBilling } from "@/hooks/useStripe";

const { createCustomer, createSubscription } = useStripeBilling();

// Create customer first
const customerId = await createCustomer(userEmail, userName);

// Create subscription
const subscriptionId = await createSubscription("growth", customerId);
```

### Using the Subscription Manager Component

```tsx
import { SubscriptionManager } from "@/components/stripe/SubscriptionManager";

<SubscriptionManager
  userEmail="user@example.com"
  userName="John Doe"
  currentPlan="growth"
/>;
```

## Security Considerations

1. **Environment Variables**: Never expose secret keys in client-side code
2. **Webhook Verification**: Always verify webhook signatures
3. **Customer Validation**: Validate customer ownership before operations
4. **Error Handling**: Implement proper error handling for failed payments

## Testing

Use Stripe's test mode and test cards:

- `4242424242424242` - Visa (succeeds)
- `4000000000000002` - Visa (declined)
- `4000000000009995` - Visa (insufficient funds)

## Production Deployment

1. Switch to live API keys in production
2. Update webhook endpoints to production URLs
3. Test all payment flows thoroughly
4. Monitor webhook delivery and handle failures

## Support

For issues with the Stripe integration:

1. Check Stripe Dashboard logs
2. Review webhook delivery attempts
3. Monitor application logs for errors
4. Contact Stripe support for payment-related issues

## Next Steps

Future enhancements could include:

- Proration handling for mid-cycle changes
- Usage-based billing
- Multiple payment methods per customer
- Advanced subscription analytics
- Dunning management for failed payments
