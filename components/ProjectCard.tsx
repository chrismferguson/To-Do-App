'use client'

import { FC, useState } from "react";
import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const format = (date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED
  ).length;

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Save the edited name to the backend
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving project name:", error);
    }
  };

  const handleCancelClick = () => {
    // Cancel the editing and revert back to the original name
    setEditedName(project.name);
    setIsEditing(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {format(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="text-3xl text-gray-600 focus:outline-none"
          />
        ) : (
          <span className="text-3xl text-gray-600">{project.name}</span>
        )}
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick} className="mr-2">
            Save
          </button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </Card>
  );
};

export default ProjectCard;
