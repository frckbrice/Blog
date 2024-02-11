import React from "react";
import Image from "next/image";

const MyProfilPict = () => {
  return (
    <section className="w-full mx-auto ">
      <Image
        src={"/images/profile-pict.jpg"}
        width={200}
        height={200}
        alt="avom"
        // priority={true}
        className="mt-8 w-52 h-52 mx-auto border-4  dark:border-slate-500 drop-shadow-xl shadow-black rounded-full"
      />
    </section>
  );
};

export default MyProfilPict;
