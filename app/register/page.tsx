import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import RegisterForm from "@/components/RegisterForm";

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
        segments={[
          { text: "Enter Your ", accent: "punch" },
          { text: "Child" },
        ]}
        intro="Takes about two minutes. One RapKids subscription covers up to two children; add both here if you've got them."
      />
      <Section tone="ink" className="!pt-8">
        <RegisterForm />
      </Section>
    </PageShell>
  );
}
