import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => [
  {
    rel: "canonical",
    href: "https://miraibogo.org/privacy-policy",
    hrefLang: "en",
  },
];

export default function Page() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="container max-w-screen-lg">
        <article>
          <h1 className="text-3xl font-bold mb-2">
            Privacy Policy for Miraigo Go
          </h1>
          <p className="text-base text-zinc-600">
            Effective Date:{" "}
            {new Date("2024-10-10").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="mt-8">
            <p>
              Welcome to miraibogo.org! Your privacy is important to us. This
              Privacy Policy explains how we collect, use, protect, and handle
              your personal information on our website located at{" "}
              <a
                className="underline"
                href="https://miraibogo.org/"
                target="_blank"
                title="Miraibo Go"
              >
                https://miraibogo.org/
              </a>
              . This policy applies to all users of the Website.
            </p>

            <h2>1. Information We Collect</h2>
            <div>
              <h3>1.1 Personal Data</h3>
              <p>
                We collect personal information that you voluntarily provide to
                us when you use our services. This information includes your:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
              </ul>

              <h3>1.2 Non-Personal Data</h3>
              <p>
                We also collect non-personal information through web cookies.
                This includes information about your browsing behavior on our
                Website.
              </p>
            </div>
            <h2>2. Purpose of Data Collection</h2>
            <p>
              We collect your personal data solely for improving our website and
              services.
            </p>
            <h2>3. Data Sharing</h2>
            <p>
              We do not share your personal information with any third parties,
              except as necessary to provide our services or as required by law.
            </p>
            <h2>4. Children's Privacy</h2>
            <p>
              Our Website does not address anyone under the age of 13. We do not
              knowingly collect personal information from children. If we become
              aware that we have collected personal data from children without
              verification of parental consent, we take steps to remove that
              information from our servers.
            </p>
            <h2>5. Use of Cookies</h2>
            <p>
              We use cookies to enhance your experience on our Website. Cookies
              are small files that a site or its service provider transfers to
              your computer's hard drive through your Web browser (if you allow)
              that enables the site's or service provider's systems to recognize
              your browser and capture and remember certain information.
            </p>
            <h2>6. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Effective Date" at the top of this Privacy
              Policy. We will also inform you via email of significant changes.
            </p>
            <h2>7. Your Consent</h2>
            <p>By using our Website, you consent to our Privacy Policy.</p>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about our Privacy Policy, please contact
              us at{" "}
              <a className="underline" href="mailto:hi@miraibogo.org">
                hi@miraibogo.org
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
