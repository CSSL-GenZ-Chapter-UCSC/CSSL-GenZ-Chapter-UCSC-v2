import { Container } from "../shared/Container";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

type MemberCard = {
  name: string;
  role: string;
  href: string;
  bgSrc?: string;
  fgSrc?: string;
  bgClassName?: string;
  fgClassName?: string;
  cardClassName?: string; // optional wrapper class
};
type SanityMember = {
  name: string;
  role: string;
  slug: string;
  category: "president" | "executive" | "teamLead";
  bgImage?: unknown;
  fgImage?: unknown;
  bgClassName?: string;
  fgClassName?: string;
  cardClassName?: string;
  order?: number;
};

const memberQuery = groq`*[_type == "member"] | order(category asc, order asc, name asc) {
  name,
  role,
  "slug": slug.current,
  category,
  bgImage,
  fgImage,
  bgClassName,
  fgClassName,
  cardClassName,
  order
}`;

async function getMembers(): Promise<{
  presidents: MemberCard[];
  executiveCommittee: MemberCard[];
  teamLeads: MemberCard[];
}> {
  const docs = await client.fetch<SanityMember[]>(memberQuery);

  const toCard = (m: SanityMember): MemberCard => ({
    name: m.name,
    role: m.role,
    href: `/people/${m.slug}`,
    bgSrc: m.bgImage
      ? urlFor(m.bgImage).width(800).height(800).url()
      : undefined,
    fgSrc: m.fgImage
      ? urlFor(m.fgImage).width(800).height(800).url()
      : undefined,
    bgClassName: m.bgClassName,
    fgClassName: m.fgClassName,
    cardClassName: m.cardClassName,
  });

  const presidents = docs
    .filter((d) => d.category === "president")
    .slice(0, 2)
    .map(toCard);
  const executiveCommittee = docs
    .filter((d) => d.category === "executive")
    .map(toCard);
  const teamLeads = docs.filter((d) => d.category === "teamLead").map(toCard);
  return { presidents, executiveCommittee, teamLeads };
}

const MemberCardItem = ({ member }: { member: MemberCard }) => {
  return (
    <Link
      href={member.href}
      className={`flex h-full w-full flex-col items-start ${member.cardClassName || ""}`}
    >
      <div className="relative w-full h-[80%] bg-gray-600 shrink-0 self-stretch overflow-hidden">
        {member.bgSrc ? (
          <Image
            src={member.bgSrc}
            alt={`${member.name} background`}
            fill
            unoptimized
            className={`object-cover absolute inset-0 ${member.bgClassName || ""}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : null}
        {member.fgSrc ? (
          <Image
            src={member.fgSrc}
            alt={member.name}
            fill
            unoptimized
            className={`object-cover absolute inset-0 ${member.fgClassName || ""}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : null}
      </div>
      <div className="flex py-[9px] flex-col items-start flex-[1_0_0]">
        <h2 className="text-white font-poppins text-[17px] font-normal tracking-[1.87px]">
          {member.name}
        </h2>
        <p className="text-(--secondaryText,#E0E0E0) font-poppins text-[12px] font-light tracking-[0.72px]">
          {member.role}
        </p>
      </div>
    </Link>
  );
};

export const Members = async () => {
  const { presidents, executiveCommittee, teamLeads } = await getMembers();
  return (
    <section className="w-full h-auto flex flex-col bg-black pt-30">
      <Container className="flex flex-col pb-30 gap-[35px]">
        <div className="flex h-[32vh] items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-[-10px] flex-[1_0_0]">
            <h2 className="text-white font-poppins text-[30px] font-medium leading-[38px] tracking-[3.3px]">
              EXECUTIVE COMMITTEE
            </h2>
            <p className="text-(--secondaryText,#E0E0E0) font-poppins text-[14px] font-normal leading-[38px] tracking-[1.54px]">
              Leading with vision, building legacy at UCSC
            </p>
          </div>
          <div className="flex h-full items-start gap-[15px] flex-[1_0_0]">
            {presidents.map((m) => (
              <MemberCardItem key={m.href} member={m} />
            ))}
          </div>
        </div>
        {/* Executive Committee in rows of 4 */}
        <div className="flex flex-col items-start gap-[13px] self-stretch">
          {Array.from({ length: Math.ceil(executiveCommittee.length / 4) }).map(
            (_, rowIdx) => {
              const row = executiveCommittee.slice(rowIdx * 4, rowIdx * 4 + 4);
              return (
                <div
                  key={`exec-row-${rowIdx}`}
                  className="flex h-[32vh] items-start gap-5 w-full"
                >
                  {row.map((m) => (
                    <div key={m.href} className="w-1/4 h-full flex">
                      <MemberCardItem member={m} />
                    </div>
                  ))}
                  {row.length < 4 &&
                    Array.from({ length: 4 - row.length }).map((_, i) => (
                      <div
                        key={`exec-placeholder-${rowIdx}-${i}`}
                        className="w-1/4 h-full"
                        aria-hidden="true"
                      />
                    ))}
                </div>
              );
            }
          )}
        </div>
        <div className="flex flex-col justify-center items-end h-[20vh]">
          <h2 className="text-white font-poppins text-[30px] font-medium leading-[38px] tracking-[3.3px]">
            TEAM LEADS
          </h2>
          <p className="text-(--secondaryText,#E0E0E0) font-poppins text-[14px] font-normal leading-[38px] tracking-[1.54px]">
            Guiding 50+ innovators with vision, shaping the future of UCSC
          </p>
        </div>
        {/* Team Leads in rows of 4 */}
        <div className="flex flex-col items-start gap-[35px] self-stretch">
          {Array.from({ length: Math.ceil(teamLeads.length / 4) }).map(
            (_, rowIdx) => {
              const row = teamLeads.slice(rowIdx * 4, rowIdx * 4 + 4);
              return (
                <div
                  key={`lead-row-${rowIdx}`}
                  className="flex h-[32vh] items-start gap-5 w-full"
                >
                  {row.map((m) => (
                    <div key={m.href} className="w-1/4 h-full flex">
                      <MemberCardItem member={m} />
                    </div>
                  ))}
                  {row.length < 4 &&
                    Array.from({ length: 4 - row.length }).map((_, i) => (
                      <div
                        key={`lead-placeholder-${rowIdx}-${i}`}
                        className="w-1/4 h-full"
                        aria-hidden="true"
                      />
                    ))}
                </div>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
};
