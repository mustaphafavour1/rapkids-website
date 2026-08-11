import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import RegisterForm from "@/components/RegisterForm";
import CharacterImage from "@/components/primitives/CharacterImage";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register your child (or children) for the RapKids TypeMaster Championship. One subscription covers up to two kids.",
};

export default function RegisterPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Register"
        caret="punch"
        align="center"
        segments={[
          { text: "Enter Your ", accent: "punch" },
          { text: "Child" },
        ]}
        intro="Takes about two minutes. One RapKids subscription covers up to two children; add both here if you've got them."
      />
      <Section tone="ink" className="!pt-8">
        <div className="mx-auto flex max-w-7xl items-end justify-center gap-6">
          {/* left — Grand Champion character */}
          <CharacterImage
            src="/characters/comic-champion.png"
            alt="A RapKids Grand Champion character"
            placeholderLabel="characters/comic-champion.png"
            className="hidden h-[26rem] w-auto max-w-[240px] shrink-0 self-end object-contain object-bottom xl:block"
          />
          <div className="w-full max-w-2xl">
            <RegisterForm />
          </div>
          {/* right — safety character */}
          <CharacterImage
            src="/characters/char-rules.png"
            alt="A RapKids character giving a thumbs up"
            placeholderLabel="characters/char-rules.png"
            className="hidden h-[26rem] w-auto max-w-[240px] shrink-0 self-end object-contain object-bottom xl:block"
          />
        </div>
      </Section>
    </PageShell>
  );
}
