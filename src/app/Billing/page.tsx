"use client";

import { useEffect } from "react";
import SidebarCommon from "../_components/SidebarCommon";
declare global {
    interface Window {
        paypal: any;
    }
}


export default function BillingPage() {
    useEffect(() => {
        const paypalScript = document.createElement("script");
        paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
        paypalScript.async = true;
        document.body.appendChild(paypalScript);
    }, []);

    const handlePayment = (amount: string, credits: number) => {
        // Wait for PayPal SDK to be loaded
        if (typeof window.paypal === "undefined") {
            alert("PayPal is still loading...");
            return;
        }

        window.paypal
            .Buttons({
                createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: { value: amount },
                            },
                        ],
                    });
                },
                onApprove: (data: any, actions: any) => {
                    return actions.order.capture().then(async function (details: any) {
                        const res = await fetch("/api/billing", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderID: data.orderID, credits }),
                        });
                        const json = await res.json();
                        alert(`Payment Successful! You now have ${json.credits} credits.`);
                    });
                },
            })
            .render("#paypal-button-container");
    };

    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#020409] via-[#020409] to-black" />
            <SidebarCommon />

            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br flex-1 overflow-auto p-6">
                <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 shadow-[0_0_60px_10px_rgba(0,255,255,0.2)] rounded-3xl p-10 w-full max-w-2xl flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold mb-4 text-cyan-300 neon">
                        Upgrade Your Credits
                    </h1>
                    <p className="text-gray-300 mb-8">
                        Unlock more features with extra credits.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {[
                            { credits: 20, price: "9.00" },
                            { credits: 50, price: "20.00" },
                            { credits: 100, price: "35.00" },
                        ].map((pack) => (
                            <div
                                key={pack.credits}
                                className="bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 flex flex-col items-center shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_50px_rgba(0,255,255,0.4)] transition-all duration-300"
                            >
                                <h2 className="text-2xl font-bold text-cyan-300 neon">
                                    {pack.credits} Credits
                                </h2>
                                <p className="text-green-500 mt-2 mb-4 font-bold">${pack.price}</p>
                                <button
                                    onClick={() => handlePayment(pack.price, pack.credits)}
                                    className="bg-cyan-400/80 hover:bg-cyan-500/60 font-medium text-white hover:text-gray-300 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.1)] neon transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>

                    <div id="paypal-button-container" className="mt-10 w-full max-w-2xl"></div>

                    <style jsx>{`
          .neon {
            text-shadow: 0 0 5px #000000, 0 0 10px #4b4b4b, 0 0 20px #464646,
              0 0 40px #e8ffff;
          }
        `}</style>
                </div>
            </main>
        </div>
    );
}
