import { motion } from 'framer-motion'
import SeoHead from '../../components/SeoHead/SeoHead.jsx'
import './Privacy.css'

export default function Privacy() {
  return (
    <>
      <SeoHead route="/privacy" />
      <motion.main
        className="legal-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="legal-page__inner">
          <p className="legal-page__eyebrow">Privacy Policy</p>
          <h1 className="legal-page__title">How we handle your data.</h1>
          <p className="legal-page__updated">Last updated: 2026-05-15</p>

          <section>
            <h2>What we collect</h2>
            <p>
              When you join the waitlist, we collect your email address and the city you selected.
              When you visit metakitchen.io, our hosting provider records standard server logs
              (anonymised IP, user agent, page visited) for 30 days. We do not run third-party
              analytics or advertising trackers on this site.
            </p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>
              Your email is used to send you launch and clinical-trial updates, no more than twice
              per month. You can unsubscribe at any time via the link in every email. We will never
              sell, rent, or share your email address with third parties.
            </p>
          </section>

          <section>
            <h2>Where it lives</h2>
            <p>
              Waitlist data is stored with our email-delivery provider. The MetaKitchen website is
              hosted by Vercel. We do not store personal data on our own servers.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You can request a copy of the data we hold on you, or request deletion, by emailing{' '}
              <a href="mailto:contact@evaa.enterprises">contact@evaa.enterprises</a>. We will respond
              within 30 days under PDPA (Singapore) / DPDP (India) requirements.
            </p>
          </section>

          <section>
            <h2>About us</h2>
            <p>
              MetaKitchen is operated by EVAA Pte. Ltd., a Singapore-registered company. Questions
              about this policy can be sent to{' '}
              <a href="mailto:contact@evaa.enterprises">contact@evaa.enterprises</a>.
            </p>
          </section>
        </div>
      </motion.main>
    </>
  )
}
