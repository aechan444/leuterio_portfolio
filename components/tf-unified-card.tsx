"use client";
import React from 'react';

export type TfUnifiedCardProps = {
  title: string;
  body: string;
  cta: string;
  href: string;
  featured?: boolean;
  external?: boolean;
};

export function TfUnifiedCard({ title, body, cta, href, featured, external }: TfUnifiedCardProps) {
  return (
    <article className={`tf-eco-card reveal ${featured ? 'tf-eco-card--featured' : ''}`}>
      <h3 className="tf-eco-card-title">{title}</h3>
      <p className="tf-eco-card-body">{body}</p>
      <a
        href={href}
        className="tf-eco-link"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {cta}
      </a>
    </article>
  );
}
