// import { delay } from "@/lib/async";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import PomodoroTimer from "@/components/Pomodoro";
import Card from "@/components/Card";


const getData = async () => {
  await delay(2000)
  const user = await getUserFromCookie(cookies())

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true
    }
  })

  return {projects}
}

export default async function Page() {
  const { projects } = await getData();
  const project = projects[0]; // Get the first project from the array

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className="h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-1/3 p-3">
              <PomodoroTimer />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-1/3 p-3">
              <NewProject />
            </div>
          </div>
        </div>
      </div>
    
  );
}

