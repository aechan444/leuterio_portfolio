"use client";
import React from 'react';

export type TfUnifiedCardProps = {
  title: string;
  body: string;
  cta: string;
  href: string;
  image?: string;
  featured?: boolean;
  external?: boolean;
};

export function TfUnifiedCard({ title, body, cta, href, image, featured, external }: TfUnifiedCardProps) {
  return (
    <article className={`tf-eco-card reveal ${featured ? 'tf-eco-card--featured' : ''} ${image ? 'tf-eco-card--has-image' : ''}`}>
      {image && (
        <div className="tf-eco-card-visual">
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}
      <h3 className="tf-eco-card-title">{title}</h3>
      <p className="tf-eco-card-body">{body}</p>
      <a
        href={href}
        className="tf-eco-link"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {cta} <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>&rarr;</span>
      </a>
    </article>
  );
}
