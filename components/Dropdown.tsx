import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdLogOut } from "react-icons/io";
import { BsChevronBarDown } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Dropdown() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Menu as="div" className="w-24 h-12 relative items-center sm:flex hidden">
      <div className="w-full absolute right-1 group">
        <Menu.Button className="flex  justify-between items-center  p-2  font-medium text-white bg-[#1A1A1A] gap-x-2 rounded-full hover:bg-[#3E3E3E]">
          <p className="whitespace-nowrap text-sm">{session?.user?.name}</p>
          <BsChevronBarDown className=" text-[#686868]" aria-hidden="true" />

          <div className="">
            {/* <Image
              src={session?.user?.image ?? ""}
              width={35}
              height={35}
              alt="profile-img"
              objectFit="cover"
              className="rounded-full w-11 h-11 absolute -right-1 object-cover"
            /> */}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-24 origin-top-right bg-[#1A1A1A] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-white/10"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white cursor-default`}
                  onClick={() =>
                    signOut({ redirect: false, callbackUrl: "/auth/signin" })
                  }
                >
                  <IoMdLogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
