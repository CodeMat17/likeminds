import Image from "next/image";
import { isExecutive, type Member } from "@/lib/data/members";
import { cn } from "@/lib/utils";

// Round, sepia-toned portrait used in the "Our people" grids. Expects to sit inside a
// `group` element so hover/focus on the parent brings the photo to full colour.
export function MemberAvatar({
  member,
  sizes,
  className,
}: {
  member: Member;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-background transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-green-deep/20 group-hover:ring-gold group-focus-visible:ring-clay",
        isExecutive(member) ? "ring-gold/45" : "ring-transparent",
        className,
      )}>
      <Image
        src={member.photo}
        alt=''
        fill
        sizes={sizes}
        className='object-cover object-top grayscale-[0.6] sepia-[0.25] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia-0'
      />
    </div>
  );
}
