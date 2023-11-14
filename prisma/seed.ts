//import { hashPassword } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: await hashPassword("password"),
      projects: {
        create: {
          name: "Project",
          due: new Date(2022, 11, 25),
        },
      },
    },
    include: {
      projects: true,
    },
  });

  const project = user.projects[0]; // Get the first project from the user's projects

  const task = await db.task.create({
    data: {
      name: "Task",
      ownerId: user.id,
      projectId: project.id,
      description: "Everything that describes the task",
      status: getRandomTaskStatus(),
    },
  });

  console.log({ user, task });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
