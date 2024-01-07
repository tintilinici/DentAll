package com.dentall.dentallservice.service;

import jakarta.mail.internet.MimeMessage;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @SneakyThrows
    public void sendBookingEmailToDriver(
            String driverEmail,
            String patientEmail,
            String patientPhoneNumber,
            String clinicAddress,
            String accommodationAddress
    ) {
        String subject = "TransportationBooking";
        String body = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; }"
                + "h1 { color: #333366; }"
                + "p { color: #666666; }"
                + "ul { color: #666666; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<h1>Transportation Booking Details</h1>"
                + "<p>Dear Driver,</p>"
                + "<p>You have a new transportation booking. Please find the details below:</p>"
                + "<ul>"
                + "<li><strong>Patient Email:</strong> " + patientEmail + "</li>"
                + "<li><strong>Patient Phone Number:</strong> " + patientPhoneNumber + "</li>"
                + "<li><strong>Clinic Address:</strong> " + clinicAddress + "</li>"
                + "<li><strong>Accommodation Address:</strong> " + accommodationAddress + "</li>"
                + "</ul>"
                + "<p>Please ensure timely and safe transportation for the patient. Thank you for your service.</p>"
                + "<p>Best Regards,<br/>DentAll clinic team</p>"
                + "</body>"
                + "</html>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(body,true);
        helper.setTo("madzarmaksim@gmail.com");
        helper.setSubject(subject);
        helper.setFrom("madzarmaksim@gmail.com");
        mailSender.send(mimeMessage);
    }

}
