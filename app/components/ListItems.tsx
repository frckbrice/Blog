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
    <li className="mt-4 text-2xl">
      <Link href={`/post/${id}`} className="underline">
        {title}{" "}
      </Link>{" "}
      <br /> <p className="text-sm mt-1">{formatedDate} </p>
    </li>
  );
};

export default ListItems;
