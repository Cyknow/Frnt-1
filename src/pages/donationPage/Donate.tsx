import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import theme from "../../components/themes/Theme";
import ProgressMeter from "../../components/types/ProgressMeter";
import TeamBios from "./TeamBios";
import type { Currency } from "../../components/types/currency";

/* =====================
   Motion Variants
===================== */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Donate() {
  const [currency, setCurrency] = React.useState<Currency>("NGN");
  const [amount, setAmount] = React.useState<number | "">("");
  const [recurring, setRecurring] =
    React.useState<"one-off" | "monthly">("one-off");
  const [selectedTier, setSelectedTier] = React.useState<string | null>(null);
  const [progress] = React.useState<number>(35);

  /* =====================
     Payment Handlers
  ===================== */

  const createStripeCheckout = async () => {
    if (!amount || amount === 0) {
      alert("Please enter an amount");
      return;
    }

    const resp = await fetch(
      "/api/payments/stripe/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, recurring }),
      }
    );
    const data = await resp.json();
    if (data.url) window.location.href = data.url;
    else alert("Failed to create session");
  };

  const createPaystackPayment = async () => {
    const resp = await fetch("/api/payments/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await resp.json();
    if (data.authorization_url) window.location.href = data.authorization_url;
    else alert("Failed to initialize Paystack");
  };

  const createCryptoCheckout = async () => {
    const resp = await fetch("/api/payments/crypto/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency }),
    });
    const data = await resp.json();
    if (data.checkout_url) window.location.href = data.checkout_url;
    else alert("Failed to initialize crypto checkout");
  };

// you need to add giftcard handling post request

  const handleProceed = () => {
    if (currency === "USD" || currency === "EUR" || currency === "GBP")
      return createStripeCheckout();
    if (currency === "NGN") return createPaystackPayment();
    if (["USDT", "BTC", "SOL", "ETH"].includes(currency))
      return createCryptoCheckout();
    
// also add giftcard submission request
    return alert("Unsupported payment method");
  };

  /* =====================
     Render
  ===================== */

  return (
    <motion.div
      className="container mx-auto py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-blue-700 text-center"
        variants={itemVariants}
      >
        Donate
      </motion.h2>

      <motion.div
        className="mt-10 grid md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Donation Form */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={itemVariants}
        >
          <motion.label className="block" variants={itemVariants}>
            <div className="text-sm font-medium">Choose payment method</div>
            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as Currency)
              }
              className="mt-2 w-full border rounded px-3 py-2"
            >
              <option value="NGN">Naira (NGN)</option>
              <option value="USD">US Dollars (USD)</option>
              <option value="GBP">Pounds (GBP)</option>
              <option value="EUR">Euros (EUR)</option>
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="GIFT">Gift Card</option>
            </select>
          </motion.label>

          {currency !== "GIFT" && (
            <motion.div className="mt-6" variants={itemVariants}>
              <label className="block">
                <div className="text-sm">Amount ({currency})</div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                  className="mt-2 w-full border rounded px-3 py-2"
                />
              </label>

              <div className="mt-4 flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={recurring === "one-off"}
                    onChange={() => setRecurring("one-off")}
                  />
                  <span className="text-sm">One-off</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={recurring === "monthly"}
                    onChange={() => setRecurring("monthly")}
                  />
                  <span className="text-sm">Monthly</span>
                </label>
              </div>

              <motion.button
                onClick={handleProceed}
                className="mt-6 px-6 py-3 rounded-full font-semibold text-blue-900 w-full"
                style={{ background: theme.gold }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Pay
              </motion.button>

              <div className="mt-6">
                <p className="font-semibold text-sm">Donation tiers</p>
                <div className="mt-3 flex space-x-2">
                  {["25", "50", "100"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedTier(t);
                        setAmount(Number(t));
                      }}
                      className={`px-3 py-1 rounded border ${
                        selectedTier === t
                          ? "ring-2 ring-yellow-400"
                          : ""
                      }`}
                    >
                      {t} {currency}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          className="bg-white rounded-2xl p-8 shadow-lg"
          variants={itemVariants}
        >
          <h4 className="font-semibold">Why your gift matters</h4>
          <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
            <li>Immediate relief for families in crisis</li>
            <li>Long-term independence programs</li>
            <li>Transparent reporting</li>
          </ul>

          <div className="mt-6">
            <h5 className="font-semibold">Campaign progress</h5>
            <ProgressMeter
              percent={progress}
              goalLabel="Yearly target: $100,000"
            />
          </div>
        </motion.aside>
      </motion.div>

      <motion.section
        className="container mx-auto mt-16"
        variants={itemVariants}
      >
        <TeamBios />
      </motion.section>
    </motion.div>
  );
}




/*import React from 'react'
import theme from '../../components/themes/Theme'
import ProgressMeter from '../../components/types/ProgressMeter'
import TeamBios from '../../components/types/TeamBios'

type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'USDT' | 'BTC' | 'SOL' | 'ETH' | 'GIFT'

export default function Donate(){
  const [currency, setCurrency] = React.useState<Currency>('NGN')
  const [amount, setAmount] = React.useState<number | ''>('')
  const [recurring, setRecurring] = React.useState<'one-off'|'monthly'>('one-off')
  const [selectedTier, setSelectedTier] = React.useState<string | null>(null)
  const [
    progress,
    setProgress
  ] = React.useState<number>(35)

  const createStripeCheckout = async ()=>{
    if(!amount || amount===0){ alert('Please enter an amount'); return }
    const resp = await fetch('/api/payments/stripe/create-checkout-session',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({amount,currency,recurring})})
    const data = await resp.json()
    if(data.url) window.location.href = data.url
    else alert('Failed to create session')
  }

  const createPaystackPayment = async ()=>{
    const resp = await fetch('/api/payments/paystack/initialize',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({amount})})
    const data = await resp.json()
    if(data.authorization_url) window.location.href = data.authorization_url
    else alert('Failed to initialize Paystack')
  }

  const createCryptoCheckout = async ()=>{
    const resp = await fetch('/api/payments/crypto/create-checkout',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({amount,currency})})
    const data = await resp.json()
    if(data.checkout_url) window.location.href = data.checkout_url
    else alert('Failed to initialize crypto checkout')
  }

  const handleProceed = ()=>{
    if(currency === 'USD' || currency === 'EUR' || currency === 'GBP') return createStripeCheckout()
    if(currency === 'NGN') return createPaystackPayment()
    if(currency === 'USDT' || currency === 'BTC' || currency === 'SOL' || currency === 'ETH') return createCryptoCheckout()
    return alert('Unsupported payment method')
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-blue-700">Donate</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded p-6 shadow">
          <label className="block">
            <div className="text-sm">Choose payment method</div>
            <select value={currency} onChange={(e)=>setCurrency(e.target.value as Currency)} className="mt-2 w-full border rounded px-3 py-2">
              <option value="NGN">Naira (NGN)</option>
              <option value="USD">US Dollars (USD)</option>
              <option value="GBP">Pounds (GBP)</option>
              <option value="EUR">Euros (EUR)</option>
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="GIFT">Gift Card (Buy / Upload)</option>
            </select>
          </label>

          {currency === 'GIFT' ? (
            <div className="mt-4">
              <h4 className="font-semibold">Buy / Upload Gift Card</h4>
              <p className="text-sm text-gray-600">Buy a gift card for donation or upload card details below.</p>
              <label className="block mt-3">
                <div className="text-sm">Upload gift card details (screenshot or file)</div>
                <input type="file" className="mt-1" />
              </label>
              <label className="block mt-3">
                <div className="text-sm">Card reference / details</div>
                <input className="mt-1 w-full border rounded px-3 py-2" />
              </label>
            </div>
          ) : (
            <div className="mt-4">
              <label className="block">
                <div className="text-sm">Amount ({currency})</div>
                <input value={amount} onChange={(e)=>setAmount(e.target.value === '' ? '' : Number(e.target.value))} type="number" className="mt-2 w-full border rounded px-3 py-2" />
              </label>

              <div className="mt-4">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2"><input type="radio" checked={recurring==='one-off'} onChange={()=>setRecurring('one-off')} /> <span className="text-sm">One-off</span></label>
                  <label className="flex items-center space-x-2"><input type="radio" checked={recurring==='monthly'} onChange={()=>setRecurring('monthly')} /> <span className="text-sm">Monthly</span></label>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">Secure payment will be processed via your selected gateway.</p>
                  <button onClick={handleProceed} className="mt-4 px-4 py-2 rounded" style={{background: theme.gold}}>Proceed to Pay</button>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold">Donation tiers</h5>
                  <div className="mt-3 flex space-x-2">
                    {['25','50','100'].map(t => (
                      <button key={t} onClick={()=>{setSelectedTier(t); setAmount(Number(t));}} className={`px-3 py-1 rounded border ${selectedTier===t? 'ring-2 ring-yellow-400':''}`}>{t} {currency}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600">
            <p>We support multiple currencies and crypto for convenience. Receipts and impact reports will be sent to your email.</p>
          </div>
        </div>

        <aside className="bg-white rounded p-6 shadow">
          <h4 className="font-semibold">Why your gift matters</h4>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>Immediate relief for families in crisis</li>
            <li>Long-term programs that create independence</li>
            <li>Transparent reporting and impact updates</li>
          </ul>

          <div className="mt-6">
            <h5 className="font-semibold">Campaign progress</h5>
            <ProgressMeter percent={progress} goalLabel="Yearly target: $100,000" />
          </div>

          <div className="mt-6">
            <h5 className="font-semibold">Quick donation tiers</h5>
            <div className="mt-3 flex space-x-2">
              <button onClick={()=>{setAmount(10); setSelectedTier(null);}} className="px-3 py-1 rounded border">Small</button>
              <button onClick={()=>{setAmount(50); setSelectedTier(null);}} className="px-3 py-1 rounded border">Medium</button>
              <button onClick={()=>{setAmount(200); setSelectedTier(null);}} className="px-3 py-1 rounded border">Large</button>
            </div>
          </div>
        </aside>
      </div>

      <section className="container mx-auto mt-12">
        <TeamBios />
      </section>
    </div>
  )
}
*/