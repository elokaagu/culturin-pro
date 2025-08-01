# Stripe Setup for Culturin Pro

**⚠️ NOTE: Stripe integration is currently disabled for development purposes.**

This guide will help you set up Stripe payments for the Pro upgrade functionality when you're ready to enable it.

## 🔧 Environment Variables

Add these environment variables to your `.env.local` file when you enable Stripe:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000 # Your app URL
```

## 📊 Stripe Dashboard Setup

### 1. Create a Stripe Account
- Go to [stripe.com](https://stripe.com) and create an account
- Complete the account setup and verification

### 2. Get Your API Keys
- In your Stripe Dashboard, go to **Developers** → **API Keys**
- Copy your **Publishable key** and **Secret key**
- Add them to your `.env.local` file

### 3. Create a Product and Price
- Go to **Products** in your Stripe Dashboard
- Create a new product called "Culturin Pro"
- Add a recurring price of $99/month
- Note the **Price ID** (starts with `price_`)

### 4. Set Up Webhooks
- Go to **Developers** → **Webhooks**
- Click **Add endpoint**
- Set the endpoint URL to: `https://your-domain.com/api/webhooks/stripe`
- Select these events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- Copy the **Webhook signing secret** and add it to your `.env.local`

## 🚀 Testing

### Test Mode
- Use test card numbers for testing:
  - **Success**: `4242 4242 4242 4242`
  - **Decline**: `4000 0000 0000 0002`
  - **Expiry**: Any future date
  - **CVC**: Any 3 digits

### Live Mode
- Switch to live mode in your Stripe Dashboard
- Update your environment variables with live keys
- Test with real cards

## 🔍 Troubleshooting

### Common Issues:

1. **Webhook not receiving events**
   - Check your webhook endpoint URL
   - Verify the webhook secret
   - Check your server logs

2. **Payment failing**
   - Verify your Stripe keys are correct
   - Check the browser console for errors
   - Verify your price ID exists

3. **User not getting Pro access**
   - Check webhook handler logs
   - Verify database updates are working
   - Check user authentication

4. **Build errors**
   - Ensure you're using the latest Stripe API version (`2025-07-30.basil`)
   - Update your Stripe package if needed: `npm install stripe@latest`

## 🔄 Enabling Stripe Integration

To re-enable Stripe integration:

1. **Uncomment the Stripe code** in:
   - `components/pro/ProAccessDialog.tsx` - Uncomment the Stripe checkout functions
   - `app/api/create-checkout-session/route.ts` - Uncomment the entire file
   - `app/api/webhooks/stripe/route.ts` - Uncomment the entire file

2. **Set up environment variables** as described above

3. **Test the integration** with test cards

4. **Deploy to production** with live Stripe keys

## 📝 Next Steps

1. Set up your environment variables
2. Create your Stripe product and price
3. Configure webhooks
4. Test the payment flow
5. Deploy to production

For more help, check the [Stripe documentation](https://stripe.com/docs) or reach out to the team!
