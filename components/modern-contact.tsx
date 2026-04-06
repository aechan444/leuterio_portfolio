"use client";
import React from 'react';

export function ModernContact() {
  return (
    <section className="tf-contact" id="contact">
      <div className="tf-shell tf-contact-inner">
        <h2 className="tf-contact-headline reveal">Would you like to generate and convert more leads in less time?</h2>
        <a href="#consultation-form" className="btn-primary-sale tf-contact-primary reveal">
          Schedule a free coaching consultation
        </a>
        <p className="tf-contact-phone reveal">
          Call <a href="tel:+6320000000">+63 (0) 000 0000</a>
          <span className="tf-contact-phone-note"> — update with your direct line</span>
        </p>

        <div id="consultation-form" className="tf-contact-form-wrap reveal">
          <form
            className="connect-form tf-contact-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const status = document.getElementById('contactStatus');
              if (status) status.textContent = 'Sending…';
              const form = e.currentTarget;
              const name = (form.querySelector('#contactName') as HTMLInputElement)?.value;
              const email = (form.querySelector('#contactEmail') as HTMLInputElement)?.value;
              const message = (form.querySelector('#contactMessage') as HTMLTextAreaElement)?.value;
              try {
                const { supabase } = await import('../lib/supabase');
                await supabase.from('contact_messages').insert([{ name, email, message }]);
                if (status) status.textContent = 'Success — our team will follow up.';
                form.reset();
              } catch {
                if (status) status.textContent = 'Something went wrong. Please try again.';
              }
            }}
          >
            <input type="text" id="contactName" placeholder="Full name" required />
            <input type="email" id="contactEmail" placeholder="Email address" required />
            <textarea id="contactMessage" placeholder="How can we help you scale?" required style={{ height: '120px' }} />
            <button type="submit" className="btn-primary-sale" style={{ width: '100%', justifyContent: 'center' }}>
              Submit consultation request
            </button>
            <div id="contactStatus" className="form-status tf-form-status" />
          </form>
        </div>
      </div>
    </section>
  );
}
