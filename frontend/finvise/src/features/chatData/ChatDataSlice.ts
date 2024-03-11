import { createSlice } from "@reduxjs/toolkit";

export type AiData = {
    profit_loss_evaluation: string;
    growth: string;
};

type ChatDataPayload = {
    payload: AiData[];
    type: string;
};

export type ChatData = {
    data: AiData[] | null;
};

const initialState: ChatData = {
    data: [
        {
            profit_loss_evaluation:
                "**Profit and Loss Evaluation**\n\n**Revenue:**\n\n* The company's total income increased by 7.5% from INR 155,885.28 crore in fiscal year 2021 to INR 167,695.40 crore in fiscal year 2022.\n* Interest earned, which accounts for the majority of revenue, grew by 5.7% to INR 135,936.41 crore.\n* Other income also increased by 16.2% to INR 31,758.99 crore.\n\n**Expenses:**\n\n* Interest expended remained mostly stable, decreasing slightly from INR 59,247.59 crore to INR 58,584.33 crore.\n* Operating expenses saw a significant increase of 15.2% from INR 35,001.26 crore to INR 40,312.43 crore.\n* Provisions and contingencies also increased moderately by 2.9%.\n\n**Profit:**\n\n* Consolidated net profit attributable to the group increased by 19.8% from INR 31,833.21 crore to INR 38,052.75 crore.\n* Basic earnings per share rose from INR 57.88 to INR 68.77, while diluted earnings per share rose from INR 57.61 to INR 68.31.\n\n**Investment Recommendation:**\n\n**Yes, it may be a good investment to consider.**\n\nThe company has shown consistent growth in revenue and profitability. It has a strong financial position with ample reserves and a low debt-to-equity ratio. The banking sector in India is expected to continue to grow, and HDFC Bank is well-positioned to benefit from this growth.\n\nHowever, it is important to note that all investments carry risk. Investors should thoroughly research the company and consider their own financial situation and risk tolerance before making any investment decisions.",
            growth: "2021: 155,885.28\n2022: 167,695.40",
        },
    ],
};

const ChatDataSlice = createSlice({
    name: "ChatData",
    initialState,
    reducers: {
        setChatData: (state, action: ChatDataPayload) => {
            console.log(action.payload, "===============payload");

            state.data = state.data ? [...state.data, ...action.payload] : action.payload;
        },
    },
});

export const { setChatData } = ChatDataSlice.actions;

export default ChatDataSlice.reducer;
