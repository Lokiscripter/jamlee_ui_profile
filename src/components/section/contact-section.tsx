import { PROFILE } from "@/data/profile";
import Link from "next/link";

export default function ContactSection() {
  const contacts = Object.values(PROFILE.contact.social).filter((item) => item.url);

  if (contacts.length === 0) {
    return null;
  }

  return (
    <div className="relative rounded-lg border p-8">
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">保持联系</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {contacts.map((contact) => (
            <Link
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent/50"
            >
              {contact.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
