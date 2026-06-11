import { PageLoader } from "@/Shared/PageLoader";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center text-5xl">
      <PageLoader />
    </div>
  );
};

export default loading;
