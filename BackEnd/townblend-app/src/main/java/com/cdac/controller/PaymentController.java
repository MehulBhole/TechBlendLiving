package com.cdac.controller;


import com.cdac.entity.Payment;
import com.cdac.repository.PaymentRepository;
import com.cdac.util.Signature;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.SignatureException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class PaymentController {

    private static final String RAZORPAY_KEY = "key_secret";
    private static final String RAZORPAY_SECRET = "xNjqzwcBiVIwri31ADNIV6HE";


    @Autowired
    PaymentRepository paymentRepository;

    @GetMapping("/payments")
    public List<Payment> getPayments(){
        return paymentRepository.findAll();
    }

    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        int amount = Integer.parseInt(data.get("amount").toString());
        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);

        JSONObject ob = new JSONObject();
        ob.put("amount", amount*100);
        ob.put("currency", "INR");
        ob.put("receipt", "rec_1234");

        Order order = razorpayClient.orders.create(ob);
        System.out.println(order);
        return order.toString();
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestBody Payment payment) throws SignatureException {
        String generatedSignature = Signature.calculateRFC2104HMAC(payment.getRazorpayOrderId() + "|" +payment.getRazorpayPaymentId(), "xNjqzwcBiVIwri31ADNIV6HE");
        if(payment.getRazorpaySignature().equals(generatedSignature)) {
            payment.setPaymentDateTime(LocalDateTime.now());
            return ResponseEntity.ok(paymentRepository.save(payment));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Transaction, Signature not verified");
    }

}