const stripe = Stripe('YOUR_PUBLIC_STRIPE_KEY');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const selectedPaymentMethod = document.querySelector('input[name="payment-option"]:checked').value;

    if (selectedPaymentMethod === 'credit-card') {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            document.getElementById('card-errors').textContent = error.message;
        } else {
            // Handle the payment method here (e.g., send to server)
            console.log('Payment Method:', paymentMethod);
            alert('Payment successful!');
        }
    } else if (selectedPaymentMethod === 'paypal') {
        // Handle PayPal payment here (this would typically redirect to PayPal)
        alert('PayPal payment method selected (implement PayPal logic here)');
    }
});
