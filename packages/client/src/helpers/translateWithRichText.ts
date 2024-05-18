import NextIntlDefaultRichText from "@/components/others/NextIntlDefaultRichText";

const translateWithRichText = (translate: any, namespace: string) => {
  return translate.rich(namespace, NextIntlDefaultRichText());
};

export default translateWithRichText;
