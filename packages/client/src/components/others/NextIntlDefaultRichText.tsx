import { Link } from "@/navigation";
import React from "react";

const NextIntlDefaultRichText = () => {
  return {
    span: (chunks: React.ReactNode) => <span>{chunks}</span>,
    viewTool: (chunks: React.ReactNode) => (
      <span style={{ color: "blue" }}>{chunks}</span>
    ),
    profile: (chunks: React.ReactNode) => <Link href="/profile">{chunks}</Link>,
    createTool: (chunks: React.ReactNode) => (
      <Link href="/create-tool">{chunks}</Link>
    ),
    multiViewTool: (chunks: React.ReactNode) => (
      <Link href="/multi-view-tool">{chunks}</Link>
    ),
    addLog: (chunks: React.ReactNode) => (
      <Link href="/create-log">{chunks}</Link>
    ),
    settings: (chunks: React.ReactNode) => (
      <Link href="/settings">{chunks}</Link>
    ),
    faq: (chunks: React.ReactNode) => <Link href="/faq">{chunks}</Link>,
    contact: (chunks: React.ReactNode) => <Link href="/contact">{chunks}</Link>,
  };
};

export default NextIntlDefaultRichText;
