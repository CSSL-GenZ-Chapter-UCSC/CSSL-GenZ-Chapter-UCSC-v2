"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";
import Link from "next/link";
import type { ReactNode } from "react";

type ContactCardProps = {
  svg: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  idx?: number;
};

export type ContactInfo = {
  linkedinLink?: string | null;
  email?: string | null;
  mapsLink?: string | null;
  phoneNumber?: string | null;
};

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="#318AFF"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M29.3337 8.00016C29.3337 6.5335 28.1337 5.3335 26.667 5.3335H5.33366C3.86699 5.3335 2.66699 6.5335 2.66699 8.00016V24.0002C2.66699 25.4668 3.86699 26.6668 5.33366 26.6668H26.667C28.1337 26.6668 29.3337 25.4668 29.3337 24.0002V8.00016ZM26.667 8.00016L16.0003 14.6668L5.33366 8.00016H26.667ZM26.667 24.0002H5.33366V10.6668L16.0003 17.3335L26.667 10.6668V24.0002Z"
      fill="#318AFF"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
  >
    <path
      d="M17.5 18.958C19.9162 18.958 21.875 16.9993 21.875 14.583C21.875 12.1668 19.9162 10.208 17.5 10.208C15.0838 10.208 13.125 12.1668 13.125 14.583C13.125 16.9993 15.0838 18.958 17.5 18.958Z"
      stroke="#318AFF"
      strokeWidth="3.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.4997 2.9165C14.4055 2.9165 11.438 4.14567 9.2501 6.33359C7.06217 8.52152 5.83301 11.489 5.83301 14.5832C5.83301 17.3423 6.41926 19.1478 8.02051 21.1457L17.4997 32.0832L26.9788 21.1457C28.5801 19.1478 29.1663 17.3423 29.1663 14.5832C29.1663 11.489 27.9372 8.52152 25.7493 6.33359C23.5613 4.14567 20.5939 2.9165 17.4997 2.9165Z"
      stroke="#318AFF"
      strokeWidth="3.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 31 31"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.40549 2.63893C8.97744 1.07602 11.5659 1.35372 12.8822 3.11297L14.5122 5.28814C15.5843 6.71931 15.4887 8.71881 14.2164 9.98335L13.909 10.2908C13.8742 10.4198 13.8706 10.5553 13.8987 10.686C13.9801 11.213 14.4205 12.329 16.265 14.1632C18.1095 15.9974 19.2333 16.4365 19.768 16.5192C19.9028 16.5463 20.0419 16.5423 20.1749 16.5076L20.7019 15.9831C21.8334 14.8594 23.5694 14.6489 24.9696 15.4096L27.4367 16.753C29.5511 17.9 30.0846 20.7726 28.3537 22.4944L26.5183 24.3183C25.9396 24.8931 25.162 25.3723 24.2139 25.4614C21.876 25.6797 16.4291 25.4007 10.7031 19.7083C5.35949 14.3944 4.3339 9.75989 4.20344 7.47623C4.13886 6.32148 4.68394 5.34497 5.37886 4.65522L7.40549 2.63893ZM11.3322 4.27418C10.6773 3.39972 9.45794 3.32997 8.77078 4.01327L6.74286 6.02827C6.31661 6.45193 6.11253 6.91952 6.13836 7.36643C6.24169 9.18123 7.06836 13.3624 12.0697 18.3353C17.3164 23.551 22.1615 23.7073 24.0344 23.5316C24.4167 23.4968 24.7965 23.2979 25.1517 22.9452L26.9859 21.1201C27.7324 20.3787 27.5684 19.0276 26.5118 18.4541L24.0447 17.1121C23.3627 16.7426 22.5645 16.8641 22.0685 17.3575L21.4808 17.9426L20.7962 17.2554C21.4808 17.9426 21.4795 17.9439 21.4782 17.9439L21.4769 17.9465L21.473 17.9504L21.464 17.9581L21.4446 17.9762C21.3901 18.0268 21.3313 18.0726 21.2689 18.1131C21.1656 18.1816 21.0287 18.2578 20.8569 18.3211C20.5082 18.4515 20.0457 18.5213 19.4748 18.4334C18.3549 18.2616 16.8708 17.4983 14.8984 15.5375C12.9274 13.5768 12.1575 12.1017 11.9844 10.9831C11.8953 10.4122 11.9664 9.94977 12.0981 9.60102C12.1706 9.40477 12.2744 9.22157 12.4055 9.05852L12.4469 9.01331L12.4649 8.99393L12.4727 8.98618L12.4766 8.98231L12.4792 8.97973L12.8512 8.61031C13.404 8.05877 13.4815 7.14556 12.9609 6.44935L11.3322 4.27418Z"
      fill="#318AFF"
    />
  </svg>
);

const buildContactCards = (contactInfo: ContactInfo): ContactCardProps[] => {
  const cards: ContactCardProps[] = [];

  if (contactInfo.linkedinLink) {
    cards.push({
      svg: <LinkedInIcon />,
      title: "Connect on LinkedIn",
      description: "Follow us on LinkedIn.",
      link: contactInfo.linkedinLink,
      linkText: "LinkedIn profile",
    });
  }

  if (contactInfo.email) {
    cards.push({
      svg: <EmailIcon />,
      title: "Shoot us an email",
      description: "Reach out to our friendly team via email",
      link: `mailto:${contactInfo.email}`,
      linkText: contactInfo.email,
    });
  }

  if (contactInfo.mapsLink) {
    cards.push({
      svg: <LocationIcon />,
      title: "Visit Us",
      description: "Chat with us in person at our office",
      link: contactInfo.mapsLink,
      linkText: "Open in Maps",
    });
  }

  if (contactInfo.phoneNumber) {
    const rawPhone = contactInfo.phoneNumber.replace(/\s+/g, "");
    cards.push({
      svg: <PhoneIcon />,
      title: "Call us",
      description: "Mon-Fri from 8 AM to 5 PM",
      link: `tel:${rawPhone}`,
      linkText: contactInfo.phoneNumber,
    });
  }

  return cards;
};

export const Contact = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  const contactCards = buildContactCards(contactInfo);

  return (
    <section className="md:h-screen h-auto flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch">
          <PageTitle
            text="CONTACT"
            className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[58px] mt-10 md:mt-0 tracking-wide md:tracking-[12.65px]"
          />
          <div className="flex md:px-2.5 px-1.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] py-5 font-[Poppins] sm:text-[14px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[474px] w-[200px] mt-5"
            >
              Let us know how we can help you whether you have a question, an
              idea, or want to collaborate, we&apos;re always open to hearing
              from you
            </motion.p>
          </div>
          <div className="w-full h-1/2 flex flex-col gap-[29px] md:flex-row mt-20">
            {contactCards.map((card, idx) => (
              <ContactCard key={idx} idx={idx} {...card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

const ContactCard = ({
  svg,
  title,
  description,
  link,
  linkText,
  idx,
}: ContactCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: idx ? idx * 0.15 + 0.3 : 0.3,
      }}
      className="md:w-1/4 w-full md:h-full h-[200px] bg-(--frostedGlass,rgba(92,92,92,0.22)) md:p-10 p-5  "
    >
      <div className="w-full h-1/2 flex flex-col justify-start items-start">
        {svg}
      </div>
      <div className="w-full h-1/2 flex flex-col items-start justify-start">
        <h2 className="text-white font-poppins md:text-[18px] text-[16px] font-normal leading-normal">
          {title}
        </h2>
        <p className="text-gray-400 font-poppins md:text-[16px] text-[14px] font-light leading-normal">
          {description}
        </p>
        <Link href={link} className="mt-auto underline text-gray-400">
          {linkText}
        </Link>
      </div>
    </motion.div>
  );
};
