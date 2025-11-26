import { Container } from "../shared/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import { TeamGroupPhoto } from "../elements/TeamGroupPhoto";
import { MemberCardItem, MemberCardProps } from "../elements/MemberCard";

type MemberCard = MemberCardProps;

type SanityMember = {
  name: string;
  role: string;
  slug: string;
  category: "president" | "executive" | "teamLead" | "teamMember";
  bgImage?: unknown;
  fgImage?: unknown;
  bgClassName?: string;
  fgClassName?: string;
  cardClassName?: string;
  order?: number;
};

type SanityTeam = {
  name: string;
  slug: string;
  description?: string;
  groupPhoto?: unknown;
  order?: number;
  leads?: SanityMember[];
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

const teamQuery = groq`*[_type == "team"] | order(order asc, name asc) {
  name,
  "slug": slug.current,
  description,
  groupPhoto,
  order,
  leads[]->{
    name,
    role,
    "slug": slug.current,
    bgImage,
    fgImage,
    bgClassName,
    fgClassName,
    cardClassName,
    order
  }
}`;

async function getMembers(): Promise<{
  presidents: MemberCard[];
  executiveCommittee: MemberCard[];
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

  return { presidents, executiveCommittee };
}

async function getTeams(): Promise<
  Array<{
    name: string;
    description?: string;
    groupSrc?: string;
    leads: MemberCard[];
  }>
> {
  const teams = await client.fetch<SanityTeam[]>(teamQuery);
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
  return teams.map((t) => ({
    name: t.name,
    description: t.description,
    groupSrc: t.groupPhoto
      ? urlFor(t.groupPhoto).width(1200).height(800).url()
      : undefined,
    leads: (t.leads || [])
      .slice()
      .sort(
        (a, b) =>
          (a.order ?? 9999) - (b.order ?? 9999) || a.name.localeCompare(b.name)
      )
      .map(toCard),
  }));
}

export const Members = async () => {
  const { presidents, executiveCommittee } = await getMembers();
  const teams = await getTeams();
  return (
    <section className="w-full h-auto flex flex-col bg-black pt-20 md:pt-30">
      <Container className="flex flex-col pb-20 md:pb-30 gap-10 md:gap-[35px]">
        <div className="flex flex-col lg:flex-row lg:h-[32vh] items-start gap-5 self-stretch">
          <div className="flex flex-col items-start md:gap-2 gap-1 lg:gap-[-10px] w-full lg:flex-[1_0_0]">
            <h2 className="text-white font-poppins text-2xl md:text-[30px] font-medium leading-tight md:leading-[38px] tracking-[2px] md:tracking-[3.3px]">
              EXECUTIVE COMMITTEE
            </h2>
            <p className="text-(--secondaryText,#E0E0E0) font-poppins text-sm md:text-[14px] font-normal leading-normal md:leading-[38px] tracking-[1px] md:tracking-[1.54px]">
              Leading with vision, building legacy at UCSC
            </p>
          </div>
          <div className="grid grid-cols-2 md:gap-5 gap-3 w-full lg:flex-[1_0_0] lg:flex lg:h-full">
            {presidents.map((m) => (
              <div
                key={m.href}
                className="w-full aspect-3/4 lg:aspect-auto lg:w-1/2 lg:h-full flex"
              >
                <MemberCardItem member={m} />
              </div>
            ))}
          </div>
        </div>
        {/* Executive Committee Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3 w-full self-stretch">
          {executiveCommittee.map((m) => (
            <div
              key={m.href}
              className="w-full aspect-3/4 lg:aspect-auto lg:h-[32vh] flex mt-10"
            >
              <MemberCardItem member={m} />
            </div>
          ))}
        </div>

        {teams.map((team, teamIdx) => {
          const isEven = teamIdx % 2 === 0;
          const flexDirection = isEven ? "lg:flex-row" : "lg:flex-row-reverse";
          const textAlignment = isEven
            ? "items-start"
            : "lg:items-end lg:text-right items-start";
          const originClass = isEven
            ? "origin-bottom-right"
            : "origin-bottom-left";

          return (
            <div
              key={`team-${teamIdx}`}
              className="flex flex-col gap-8 self-stretch pt-10 md:pt-20"
            >
              <div
                className={`flex flex-col ${flexDirection} lg:h-[60vh] items-start gap-5 self-stretch pt-5 md:pt-10`}
              >
                <div
                  className={`flex flex-col ${textAlignment} md:gap-[13px] gap-1.5 w-full lg:flex-2`}
                >
                  <h2 className="text-white font-poppins text-2xl md:text-[30px] font-medium leading-tight md:leading-[38px] tracking-[2px] md:tracking-[3.3px]">
                    {team.name}
                  </h2>
                  {team.description ? (
                    <p className="text-(--secondaryText,#E0E0E0) w-full lg:w-3/4 font-poppins text-[14px] md:text-[14px] font-normal leading-5 tracking-[1px] md:tracking-[1.54px]">
                      {team.description}
                    </p>
                  ) : null}
                </div>
                <div className="flex w-full lg:h-full items-start gap-[15px] lg:flex-3 aspect-video lg:aspect-auto">
                  <TeamGroupPhoto
                    src={team.groupSrc}
                    alt={`${team.name} group photo`}
                    className={originClass}
                  />
                </div>
              </div>

              {team.leads.length > 0 && (
                <div className="flex flex-col items-start gap-[13px] self-stretch">
                  <h3 className="text-white font-poppins text-lg md:text-[20px] font-medium tracking-[1.5px] md:tracking-[2px]">
                    Leads
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                    {team.leads.map((m) => (
                      <div
                        key={m.href}
                        className="w-full aspect-3/4 lg:aspect-auto lg:h-[32vh] flex"
                      >
                        <MemberCardItem member={m} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </section>
  );
};