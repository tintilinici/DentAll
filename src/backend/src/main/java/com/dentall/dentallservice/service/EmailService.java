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
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }"
                + ".container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }"
                + "h1 { color: #333366; font-size: 24px; font-weight: bold; }"
                + "p, li { color: #333333; line-height: 1.6; }"
                + "ul { list-style: none; padding: 0; }"
                + ".detail-box { background-color: #e8e8e8; padding: 15px; margin-bottom: 10px; border-radius: 5px; }"
                + ".detail-box strong { color: #333366; display: block; margin-bottom: 5px; font-weight: bold; }"
                + ".footer { font-size: 14px; color: #999999; margin-top: 20px; text-align: center; font-weight: bold; }"
                + ".emphasis { font-weight: bold; color: #333366; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<h1>Transportation Booking Details</h1>"
                + "<p>Dear <span class=\"emphasis\">Driver</span>,</p>"
                + "<p>You have a new <span class=\"emphasis\">transportation booking</span>. Please find the details below:</p>"
                + "<div class=\"detail-box\">"
                + "<strong>Patient Email:</strong>"
                + "<span class=\"emphasis\"> " + patientEmail + " </span>"
                + "</div>"
                + "<div class=\"detail-box\">"
                + "<strong>Patient Phone Number:</strong>"
                + "<span class=\"emphasis\"> " + patientPhoneNumber + " </span>"
                + "</div>"
                + "<div class=\"detail-box\">"
                + "<strong>Clinic Address:</strong>"
                + "<span class=\"emphasis\"> " + clinicAddress + " </span>"
                + "</div>"
                + "<div class=\"detail-box\">"
                + "<strong>Accommodation Address:</strong>"
                + "<span class=\"emphasis\"> " + accommodationAddress + " </span>"
                + "</div>"
                + "<p>Please ensure <span class=\"emphasis\">timely and safe transportation</span> for the patient. Thank you for your service.</p>"
                + "<div class=\"footer\">"
                + "<p>Best Regards,<br/><span class=\"emphasis\">DentAll Clinic Team</span></p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(body,true);
        helper.setTo(driverEmail);
        helper.setSubject(subject);
        mailSender.send(mimeMessage);
    }

    @SneakyThrows
    public void sendBookingEmailToPatient(
            String driverEmail,
            String patientEmail,
            String clinicAddress,
            String accommodationAddress,
            String patientName
    ) {
        String subject = "TransportationBooking";
        String body = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }"
                + ".container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }"
                + "h1 { color: #333366; font-size: 24px; font-weight: bold; }"
                + "p, li { color: #333333; line-height: 1.6; }"
                + "ul { list-style: none; padding: 0; }"
                + ".detail-box { background-color: #e8e8e8; padding: 15px; margin-bottom: 10px; border-radius: 5px; }"
                + ".detail-box strong { color: #333366; display: block; margin-bottom: 5px; font-weight: bold; }"
                + ".footer { font-size: 14px; color: #999999; margin-top: 20px; text-align: center; font-weight: bold; }"
                + ".emphasis { font-weight: bold; color: #333366; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<h1>Transportation Booking Details</h1>"
                + "<p>Dear <span class=\"emphasis\">" + patientName + "</span>,</p>"
                + "<p>Your <span class=\"emphasis\">transportation booking</span> has been successfully arranged. Please find the details below:</p>"
                + "<div class=\"detail-box\">"
                + "<strong>Driver Email:</strong>"
                + "<span class=\"emphasis\"> " + driverEmail + " </span>"
                + "</div>"
                + "<div class=\"detail-box\">"
                + "<strong>Clinic Address:</strong>"
                + "<span class=\"emphasis\"> " + clinicAddress + " </span>"
                + "</div>"
                + "<div class=\"detail-box\">"
                + "<strong>Accommodation Address:</strong>"
                + "<span class=\"emphasis\"> " + accommodationAddress + " </span>"
                + "</div>"
                + "<p>We are committed to providing you with <span class=\"emphasis\">reliable and comfortable transportation</span>. We look forward to serving you and wish you a pleasant experience.</p>"
                + "<div class=\"footer\">"
                + "<p>Best Regards,<br/><span class=\"emphasis\">DentAll Clinic Team</span></p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(body,true);
        helper.setTo(patientEmail);
        helper.setSubject(subject);
        mailSender.send(mimeMessage);
    }
}
