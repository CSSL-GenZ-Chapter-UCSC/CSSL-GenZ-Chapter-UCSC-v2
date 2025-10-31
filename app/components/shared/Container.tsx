interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[95%] px-3 sm:px-6 md:px-10 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
};
