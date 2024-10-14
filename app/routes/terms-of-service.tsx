export default function Page() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="container max-w-screen-lg">
        <article>
          <h1 className="text-3xl font-bold mb-2">
            Terms of Service for Miraigo Go
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
              Welcome to miraibogo.org! These Terms of Service ("Terms") govern
              your use of the PokéRogue website located at{" "}
              <a
                className="underline"
                href="https://miraibogo.org/"
                target="_blank"
                title="Miraibo Go"
              >
                https://miraibogo.org/
              </a>{" "}
              ("Website"), including all content, services, and products
              available at or through the website. The Website is owned and
              operated by MiraiboGo ("we", "us", or "our").
            </p>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Website, you agree to be bound by these
              Terms, including our Privacy Policy found at
              https://miraibogo.org/privacy-policy. If you disagree with any
              part of the terms, then you do not have permission to access the
              Website.
            </p>
            <h2>2. Use of Website </h2>
            <p>
              Miraibogo.org offers a palworld-like open world games. enabling
              user free to play the game. These services are provided to you
              free of charge for personal, non-commercial use.
            </p>
            <div>
              <h3>2.1 Ownership of Generated Content</h3>
              <p>
                The ownership of any content generated using miraibogo.org's
                services belongs to miraibogo.org, subject to the terms outlined
                herein.
              </p>
            </div>
            <h2>3. User Data</h2>
            <p>
              In order to provide our services, we collect certain personal
              information from our users, such as name, email, and payment
              information. Our use of your personal information is governed by
              our Privacy Policy.
            </p>
            <h2>4. Non-Personal Data Collection</h2>
            <p>
              We also collect non-personal data through web cookies as described
              in our Privacy Policy.
            </p>
            <h2>5. Prohibited Uses</h2>
            <p>You agree not to use the Website:</p>
            <ul>
              <li>For any unlawful purpose</li>
              <li>
                To solicit others to perform or participate in any unlawful acts
              </li>
              <li>
                To harass, abuse, insult, harm, defame, slander, disparage,
                intimidate, or discriminate based on gender, sexual orientation,
                religion, ethnicity, race, age, national origin, or disability.
              </li>
              <li>
                To make any unauthorised copies, modify, adapt, translate,
                reverse engineer, disassemble, decompile or create any
                derivative works of the services or any content of our Platform
                included therein, including any files, tables or documentation
                (or any portion thereof) or determine or attempt to determine
                any source code, algorithms, methods or techniques embodied by
                the Services or any derivative works thereof;
              </li>
              <li>
                To distribute, license, transfer, or sell, in whole or in part,
                any of the Services or any derivative works thereof;
              </li>
            </ul>
            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
            <h2>7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of the United States, without regard to its conflict of law
              provisions.
            </p>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a className="underline" href="mailto:hi@miraibogo.org">
                hi@miraibogo.org
              </a>
              .
            </p>
            <p>
              By using our Website, you acknowledge that you have read and
              understand these Terms of Service and agree to be bound by them.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
