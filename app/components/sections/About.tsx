import { Container } from "../shared/Container";

export const About = () => {
  return (
    <section className="h-screen flex items-start justify-center bg-black text-white pt-30">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col items-stretch">
          <h2 className="flex items-center justify-start text-(--lightBlue,#318AFF) font-[Poppins] text-[213px] not-italic font-medium leading-none tracking-[10.65px] flex-1">
            ABOUT
          </h2>
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              An initiative dedicated to empowering the next generation of IT
              professionals
            </p>
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              Founded in 2025
            </p>
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              CSSL GenZ Chapter of UCSC
            </p>
          </div>
          <div className="flex justify-between items-end self-stretch flex-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-[150px] h-[150px] bg-gray-500" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
