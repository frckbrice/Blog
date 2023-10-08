import React from "react";
import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  post: Meta;
};

const ListItems = ({ post }: Props) => {
  const { id, title, date } = post;

  const formatedDate = getFormattedDate(date);
  return (
    <li className="mt-4 text-2xl text-white/80">
      <Link
        href={`/post/${id}`}
        className="underline hover:text-white/70 text-white/60 "
      >
        {title}{" "}
      </Link>{" "}
      <br /> <p className="text-sm mt-1">{formatedDate} </p>
    </li>
  );
};

export default ListItems;
