import React from "react";
import { useRouter } from "next/router";

import Project from "@components/Project";
import type { ProgressBarProps } from "@components/ProgressBar";

const projects = [
  {
    id: 1,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 2,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 3,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 4,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 5,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 6,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 7,
    collected: 10,
    goal: 20,
    max: 100,
  },
];
const ProductPage = (props: ProgressBarProps) => {
  const router = useRouter();

  return <Project />;
};

export default ProductPage;

export const getStaticPaths = async () => {
  const staticPaths: {
    params: { id: string };
  }[] = [];
  projects.forEach((project) => {
    staticPaths.push({
      params: { id: `project/${project}` },
    });
  });

  return {
    paths: staticPaths,
    fallback: true,
  };
};

interface PageContext {
  params: {
    id: string;
  };
  fallback: true;
}

export async function getStaticProps(context: PageContext) {
  const { id } = context.params;
  const project = {
    id: 1,
    collected: 10,
    goal: 20,
    max: 100,
  };

  return {
    props: project,
    revalidate: 120, // In seconds
  };
}
