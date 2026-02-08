package com.example.inventory.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;



@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender{
    private final static Logger LOGGER= LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to ,String email){
        try{
            MimeMessage mimeMessage=mailSender.createMimeMessage();
            MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,"utf-8");

            helper.setText(email,true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("developer.ankitmishra@gmail.com");
            mailSender.send(mimeMessage);
        }catch(MessagingException e){
            LOGGER.error("Failed to send message",e);
            throw new IllegalStateException("failed to send email");
        }
    }

    public String buildEmail(String name, String link, String title) {
        return "<div>" +
                "<h1>" + title + "</h1>" +
                "<p>Hi " + name + ",</p>" +
                "<p>Click the link below:</p>" +
                "<a href=\"" + link + "\">Click Here</a>" +
                "</div>";
    }
}
