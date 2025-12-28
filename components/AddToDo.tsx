"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddToDo = ({ setTodos }: { setTodos: (state: any) => any }) => {
  const [showForm, setShowForm] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm();

  async function onSubmit(formData: FieldValues) {
    const newTodo: ToDo = {
      id: crypto.randomUUID(),
      status: "TO DO",
      title: formData["title"],
      description: formData["description"],
      checked: false,
      userId: "",
    };
    setTodos((prev: ToDo[]) => [...prev, newTodo]);
    reset();
    setShowForm((prev) => !prev);
  }

  return (
    <div className="w-full mb-3">
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="px-5 hover:bg-gray-200 cursor-pointer w-full text-xl rounded-md py-3 border"
      >
        +
      </button>
      {showForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-2"
        >
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="border px-2 py-1 w-full"
              type="text"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message as string}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="border px-2 py-1 w-full"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message as string}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 disabled:opacity-60"
          >
            Add ToDo
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default AddToDo;
