import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const valor = '<form><label>Name</label><input type="text" name="user_name"><label>Email</label><input type="email" name="user_email"><label>Message</label><textarea name="message"></textarea><input type="submit" value="Send"></form>'
    console.log(form.current)
    emailjs
      .sendForm('service_ed2rlr9', 'template_o5s4i1n',form.current, {
        publicKey: 'EbEldik7lyNTXM7a4',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};