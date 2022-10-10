import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICategory } from "../interface";

interface IProps {
  category: ICategory;
}
const CategoryCard = ({ category }: IProps) => {
  return (
    <Link href="/">
        <div className="relative cursor-pointer">
            <Image
                src={category.icons[0].url}
                height={category.icons[0].height ?? 300}
                width={category.icons[0].width ?? 300}
                className="rounded-xl"
            />
            <p className="text-xl text-white font-semibold absolute top-4 left-4 w-16">{category.name}</p>
        </div>
    </Link>
   
  );
};

export default CategoryCard;
