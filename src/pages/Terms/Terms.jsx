import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { SEO } from '../../data/content.js'
import '../Privacy/Privacy.css'

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>{SEO['/terms'].title}</title>
        <meta name="description" content={SEO['/terms'].description} />
      </Helmet>
      <motion.main
        className="legal-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="legal-page__inner">
          <p className="legal-page__eyebrow">Terms of Use</p>
          <h1 className="legal-page__title">The rules of this site.</h1>
          <p className="legal-page__updated">Last updated: 2026-05-15</p>

          <section>
            <h2>Acceptance</h2>
            <p>
              By using metakitchen.io you agree to these terms. If you don't agree, please don't use
              the site. These terms may be updated; the "last updated" date above will reflect any
              changes.
            </p>
          </section>

          <section>
            <h2>What MetaKitchen is</h2>
            <p>
              MetaKitchen is a food brand operated by EVAA Pte. Ltd. (Singapore). This website is
              informational. No products are sold directly through this site at present —
              joining the waitlist registers your interest in future product availability.
            </p>
          </section>

          <section>
            <h2>Medical information</h2>
            <p>
              The clinical and nutritional information on this site is provided for educational
              purposes. Aara, our AI clinical companion, is not a substitute for advice from your
              physician. Consult a qualified medical professional for personal health decisions,
              particularly if you are managing diabetes, pregnancy, or a chronic condition.
            </p>
          </section>

          <section>
            <h2>Intellectual property</h2>
            <p>
              All content on this site — copy, photography, illustrations, design, code — is
              owned by EVAA Pte. Ltd. or licensed for our use. Please don't republish without
              permission. Open-source libraries used to build this site are credited in our
              public repository.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a href="mailto:contact@evaa.enterprises">contact@evaa.enterprises</a>.
            </p>
          </section>
        </div>
      </motion.main>
    </>
  )
}
