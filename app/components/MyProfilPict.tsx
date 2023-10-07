import React from "react";
import Image from "next/image";

const MyProfilPict = () => {
  return (
    <section className="w-full mx-auto ">
      <Image
        src={"/images/fb.jpg"}
        width={200}
        height={200}
        alt="avom"
        priority={true}
        className="mt-8 mx-auto border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full "
      />
    </section>
  );
};

export default MyProfilPict;
