import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { PROFILE } from "@/data/profile";
import {
  BookOpen,
  BriefcaseBusiness,
  Cpu,
  FileText,
  HomeIcon,
  Layers3,
} from "lucide-react";

const navItems = [
  { href: "#home", icon: HomeIcon, label: "首页" },
  { href: "#expertise", icon: Layers3, label: "能力" },
  { href: "#work", icon: BriefcaseBusiness, label: "经历" },
  { href: "#projects", icon: Cpu, label: "项目" },
  { href: "#publications", icon: BookOpen, label: "相关工作" },
  { href: "/blog", icon: FileText, label: "文章" },
];

const socialIcons = {
  GitHub: Icons.github,
  LinkedIn: Icons.linkedin,
  X: Icons.x,
  email: Icons.email,
};

export default function Navbar() {
  const socialItems = Object.entries(PROFILE.contact.social)
    .filter(([, social]) => social.navbar && social.url)
    .map(([key, social]) => ({
      ...social,
      icon: socialIcons[key as keyof typeof socialIcons],
    }))
    .filter((social) => social.icon);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="pointer-events-auto relative z-50 mx-auto flex h-14 w-fit gap-2 border bg-card/90 p-2 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                >
                  <DockIcon className="size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-colors hover:bg-muted hover:text-foreground">
                    <item.icon className="size-full overflow-hidden rounded-sm object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}

        {socialItems.length > 0 ? (
          <>
            <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />
            {socialItems.map((social) => {
              const IconComponent = social.icon;
              return (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <DockIcon className="size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-colors hover:bg-muted hover:text-foreground">
                        <IconComponent className="size-full overflow-hidden rounded-sm object-contain" />
                      </DockIcon>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <p>{social.name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </>
        ) : null}

        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-colors hover:bg-muted hover:text-foreground">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>主题</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
