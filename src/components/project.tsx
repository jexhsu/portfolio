"use client";

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type TProject = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: TProject) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-2xl overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 group-even:pl-8 sm:h-[20rem] sm:pr-8">
        <div className="mt-10 flex h-72 flex-col px-5 pb-7 group-even:ml-[18rem] sm:mt-auto sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 w-60 leading-relaxed text-gray-700">
            {description}
          </p>
          <ul className="mt-4 flex w-60 flex-wrap gap-2 sm:mt-4">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute -right-40 top-8 w-[28.25rem] rounded-t-lg shadow-2xl transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-105 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2"
        />
      </section>
    </motion.div>
  );
}
