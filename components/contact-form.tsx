"use client";

import { FormEvent, useState } from "react";

type MessageState = {
  kind: "idle" | "success" | "error";
  text: string;
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<MessageState>({
    kind: "idle",
    text: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ kind: "idle", text: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send inquiry.");
      }

      form.reset();
      setMessage({
        kind: "success",
        text: data.message ?? "Inquiry saved successfully.",
      });
    } catch (error) {
      setMessage({
        kind: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving the inquiry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" required />
      </label>

      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Company
        <input name="company" type="text" />
      </label>

      <label>
        Message
        <textarea name="message" required />
      </label>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="form-message" data-state={message.kind}>
        {message.text}
      </p>
    </form>
  );
}
