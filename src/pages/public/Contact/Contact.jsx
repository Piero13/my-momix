import {
  ContactForm,
  ContactHero,
  ContactInfos,
} from "@/components/contact";

import {
  PageSeo,
} from "@/components/seo";

export default function Contact() {
  return (
    <>
      <PageSeo
        title="Contact | MyMomix"
        description="Contactez MyMomix pour poser une question, signaler un problème ou proposer une amélioration."
      />

      <ContactHero />

      <ContactForm />

      <ContactInfos />
    </>
  );
}