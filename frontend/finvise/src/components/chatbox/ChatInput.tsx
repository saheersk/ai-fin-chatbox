import React, { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setChatData } from "@/features/chatData/ChatDataSlice";

const ChatInput = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("http://localhost:8000/generate/data/company/test/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            dispatch(setChatData([response.data]));
            console.log("Response:", response.data);
            setLoading(false);
            const fileInput: any = document.getElementById("file-input");
            fileInput.value = "";
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full relative">
            <div className="border border-gray-700 w-[70%] rounded-3xl absolute bottom-[30px] flex items-center ">
                <div className="mr-2 flex-1">
                    <Input
                        type="file"
                        id="file-input"
                        disabled={loading}
                        className="border rounded-3xl h-[50px] bg-[#373d3f] placeholder:text-white text-white w-full"
                        placeholder="Enter your prompt"
                        onChange={handleFileChange}
                    />
                </div>

                <button
                    className="border rounded-3xl w-[100px] h-[50px] bg-[#273d44] placeholder:text-white flex justify-center items-center"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="animate-spin lucide lucide-loader-2"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    ) : (
                        "Submit"
                    )}
                </button>
                {/* <Loader2 /> */}
            </div>
        </div>
    );
};

export default ChatInput;
