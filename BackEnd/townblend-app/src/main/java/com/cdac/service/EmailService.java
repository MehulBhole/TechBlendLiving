package com.cdac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cdac.entity.Email;
import com.cdac.entity.PropertyOwner;
import com.cdac.entity.ServiceProvider;
import com.cdac.entity.User;
@Service
public class EmailService {
	@Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserService userService;

    public void sendThankYouEmail(Integer orderId) {
        User user = userService.userInfo(orderId);

        if (user != null) {
            Email email = new Email();
            email.setRecipient(user.getEmail());
            email.setSubject("Thank You for Booking Our Services!");
            email.setBody("Dear " + user.getName() + ",\n\n"
                         + "Thank you for booking our services!\n\n"
                         + "We are excited to serve you.\n\n"
                         + "Best regards,\n"
                         + "Your Service Provider");

            sendEmail(email);
        }
    }
   public  void sendEmailApproval(PropertyOwner owner) {
	   Email email = new Email();
       email.setRecipient(owner.getEmail());
       email.setSubject("Thank You for Registering Yourself on TechBlendLiving!");
       email.setBody("Dear " + owner.getName() + ",\n\n"
                    + "Thank you for your Patience We truly Appreciate You waited for so Long!\n\n"
                    + "You can Now Login and Use our Services.\n\n"
                    + "We are excited to serve you.\n\n"
                    + "Best regards,\n"
                    + "TechBlendLiving team");

       sendEmail(email);
   }
   public void sendEmailApprovalServiceProvider( ServiceProvider serviceProvider) {
	   Email email = new Email();
       email.setRecipient(serviceProvider.getEmail());
       email.setSubject("Thank You for Registering Yourself on TechBlendLiving!");
       email.setBody("Dear " + serviceProvider.getName() + ",\n\n"
                    + "Thank you for your Patience We truly Appreciate You waited for so Long!\n\n"
                    + "You can Now Login and Use our Services.\n\n"
                    + "We are excited to serve you.\n\n"
                    + "Best regards,\n"
                    + "TechBlendLiving team");

       sendEmail(email);
   }
    private void sendEmail(Email email) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email.getRecipient());
        mailMessage.setSubject(email.getSubject());
        mailMessage.setText(email.getBody());

        javaMailSender.send(mailMessage);
    }
}
