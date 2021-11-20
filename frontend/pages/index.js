
import { Grid } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Card from "@components/Card";
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
];
export default function Home() {
  return (
        <Grid templateColumns="repeat(4, 1fr)" gap={3}>
          {projects.map((project) => (
            <Link
              key={`project/${project.id}`}
              href={`project/${project.id}`}
            >
              <Card project={project} />
            </Link>
          ))}
        </Grid>
  );
}
