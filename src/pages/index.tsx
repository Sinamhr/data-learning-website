import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): JSX.Element {
  const illustrationUrl = useBaseUrl('/img/illustration.png');

  return (
    <Layout
      title="Data Learning"
      description="A guided framework for choosing methods based on your data, task, and constraints."
    >
      <main className="dl-homepage">
        <section className="dl-hero">
          <div className="container dl-hero-container">
            <div className="dl-hero-text">
              <h1 className="dl-hero-title">
                Start Your
                <br />
                <span>Data Learning</span> Journey
              </h1>

              <p className="dl-hero-subtitle">
                Get structured recommendations for data-driven methods,
                tailored to your modality, task, constraints, and data challenges.
              </p>

              <div className="dl-hero-buttons">
                <Link className="button button--lg dl-primary-btn" to="/wizard">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="dl-hero-image-wrap">
              <img
                src={illustrationUrl}
                alt="Data Learning illustration"
                className="dl-hero-image"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}