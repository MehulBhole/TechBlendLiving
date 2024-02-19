import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../Css/PaymentGateway.css";
import { NavigationBar } from "./NavigationBar";

export function PaymentGateway() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cleanup = () => {
      const script = document.querySelector('[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
    return cleanup;
  }, []);

  const savePaymentToDb = async (razorpayRes, orderId, status) => {
    const payment = {
      orderId: orderId,
      amount: amount,
      razorpayPaymentId: razorpayRes ? razorpayRes.razorpay_payment_id : null,
      razorpayOrderId: razorpayRes ? razorpayRes.razorpay_order_id : null,
      razorpaySignature: razorpayRes ? razorpayRes.razorpay_signature : null,
      paymentDateTime: "",
      status: status,
      mobileNumber: mobileNumber,
      emailId: email,
    };

    try {
      await axios.post("http://localhost:9090/api/payment", payment);
    } catch (error) {
      console.error("Failed to save payment to the database:", error);
    }
  };

  const createOrder = async () => {
    try {
      setLoading(true);
      const order = await axios.post("http://localhost:9090/api/create_order", {
        amount: amount,
      });
      return order.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const order = await createOrder();
      if (!order) {
        throw new Error("Failed to create order");
      }
      const options = {
        key: "key_secret", // Replace with your Razorpay key
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Your Company Name",
        image: "https://www.svgrepo.com/show/261072/rupee.svg", // Replace with your logo URL
        description: "For Testing purpose",
        order_id: order.data.id,
        handler: async (res) => {
          swal(
            "Payment Successful!",
            `Your Payment ID is: ${res.razorpay_payment_id}`,
            "success"
          );
          savePaymentToDb(res, order.data.id, "Paid");
          setName("");
          setEmail("");
          setMobileNumber("");
          setAmount("");
        },
        prefill: {
          name: name,
          email: email,
          contact: mobileNumber,
        },
        notes: {
          address: "This is a test note",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment handling error:", error);
      swal("Oops", "Something went wrong. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
       <NavigationBar></NavigationBar>
        <div className="appPayment">
      <form onSubmit={paymentHandler}>
        <label htmlFor="fname">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="mobnum">Mobile Number: </label>
        <input
          type="number"
          id="mobnum"
          name="mobnum"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <br />

        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />

        <input type="submit" value={loading ? "Processing..." : "Pay"} disabled={loading} />
      </form>
      </div>
    </div>
  );
}
