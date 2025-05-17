"use client";

import { useRouter, usePathname } from "next/navigation";

const ResetFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.replace(pathname);
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="border border-cyan-500 rounded px-5 py-2.5 w-auto sm:w-fit cursor-pointer"
    >
      Reset
    </button>
  );
};

export default ResetFilter;
