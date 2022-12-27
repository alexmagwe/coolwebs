import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
// import { getSession } from "@auth0/nextjs-auth0";

type Props = {};

function CreateForm({}: Props) {
  const createWebMutation = gql`
    mutation($title:String!,$description:String!,$link:String!,$imageUrl:String!,$category:String!){
    createWebsite(title:$title,description:$description,link:$link,imageUrl:$imageUrl,category:$category){
    title link description imageUrl category
    }
    }
    `;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createWebsite, { loading, error }] = useMutation(createWebMutation, {
    onCompleted: () => reset(),
  });
  async function onSubmit(data: any) {
    let { title, link, category, description, imageUrl } = data;
    if (!imageUrl) {
      imageUrl = `https://via.placeholder.com/300`;
    }
    const variables = { title, link, category, description, imageUrl };
    try {
      toast.promise(createWebsite({ variables }), {
        loading: "Creating new website...",
        success: "Website successfully added! 🎉",
        error: `Something went wrong 😥, Please try again - ${error}`,
      });
    } catch (err) {
      console.error(err);
    }

    // body
  }

  return (
    <div>
      <Toaster />

      <form
        className="flex md:w-2/3 lg:w-1/2 mx-auto flex-col gap-y-6 shadow-lg p-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="title"
            type="text"
            {...register("title", { required: true })}
          />
        </label>
        <label className="block">
        <span className="text-gray-700">Link</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="https://example.com"
            type="text"
            {...register("link", { required: true })}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Image url</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="ImageUrl"
            type="text"
            {...register("imageUrl")}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Category</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Title"
            type="text"
            {...register("category", { required: true })}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <input
          type='text'
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="description"
            {...register("description", { required: true })}
          />
        </label>
        <button disabled={loading} className='px-6 py-3 rounded-lg bg-green-600 text-white'>Create </button>
      </form>
    </div>
  );
}

export default CreateForm;

