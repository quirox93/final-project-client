import React from "react";
import Link from "next/link";
import Arrowright from "@/assets/svg/Arrowright";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-2 bg-blue-100 opacity-75">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li key={breadCrumb.name} className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600 mr-3"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <Arrowright/>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;