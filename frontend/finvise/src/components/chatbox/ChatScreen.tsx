import { ChatDataReducer } from "@/store/store";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AiData } from "@/features/chatData/ChatDataSlice";
import { motion } from "framer-motion";

const ChatScreen: React.FC = () => {
    const aiData: AiData[] | null = useSelector((state: ChatDataReducer) => state.ChatData.data);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const COLORS = ["#0088FE", "#00C49F"];

    const parseGrowthData = (growthString: any) => {
        return growthString.split("\n").map((line: any) => {
            const [year, value] = line.split(": ");
            return { year, value: parseFloat(value.replace(",", "")) };
        });
    };

    useEffect(() => {
        console.log(aiData, "aiData===========");

        if (aiData && aiData.length > 0) {
            parseGrowthData(aiData[0].growth);
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }, [aiData]);

    return (
        <div className="flex flex-col justify-center items-center w-full py-4 h-screen">
            <div className="border border-gray-700 w-[80%] h-full bg-[#191919] rounded-3xl p-10">
                <p className="text-center text-3xl mb-4">Welcome To FinVise</p>
                <div className="overflow-y-auto h-[75vh]">
                    {aiData?.map((item: AiData, index: number) => (
                        <div key={index} className="mt-4 bg-gray-800 p-4 rounded-lg mb-4">
                            <div ref={messagesEndRef}></div>
                            {item.profit_loss_evaluation
                                .split(/\n\n+/)
                                .map((paragraph: string, paragraphIndex: number) => (
                                    <React.Fragment key={paragraphIndex}>
                                        {paragraph.split(/\*\*(.*?)\*\*/).map((text: string, textIndex: number) => (
                                            <React.Fragment key={textIndex}>
                                                {text.startsWith("**") ? (
                                                    <strong>{text.substring(2)}</strong>
                                                ) : (
                                                    text.split("\n").map((line: string, lineIndex: number) => (
                                                        <React.Fragment key={lineIndex}>
                                                            {line}

                                                            <br />
                                                        </React.Fragment>
                                                    ))
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))}
                            <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                <h6 className="text-lg text-slate-300 font-bold m-3">Revenue of 2 years:</h6>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={parseGrowthData(item.growth)}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        label={({ name, percent, index }) =>
                                            `${parseGrowthData(item.growth)[index].year}: ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {parseGrowthData(item.growth).map((entry: any, index: any) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
