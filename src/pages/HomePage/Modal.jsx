import React, { useState } from "react";
import Modal from "react-modal";
import { HiX } from "react-icons/hi"; // Import the close icon from react-icons
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../schemas/transactionSchema";
import { newTransaction } from "../../services/transactions";

Modal.setAppElement("#root");

function ModalApp() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(transactionSchema) });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const body = { ...data };
      await newTransaction(body);
      reset();
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <div className="mt-8">
      <div onClick={openModal}>
        <Button value={"Add Transaction"} type={"button"} />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Form"
      >
        <div>
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={closeModal}
              className="text-gray-700 hover:text-gray-900"
            >
              <HiX size={24} />
            </button>
          </div>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Type</label>
              <select
                className="border border-gray-300 rounded w-full py-2 px-3"
                {...register("type", { required: true })}
              >
                <option value="input">Input</option>
                <option value="output">Output</option>
              </select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Value
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded w-full py-2 px-3"
                {...register("value", { required: true })}
              />
              {errors.value && (
                <p className="text-red-500">{errors.value.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full py-2 px-3"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalApp;
