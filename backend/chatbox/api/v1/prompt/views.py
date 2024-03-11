from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework import status

from io import BytesIO

import google.generativeai as genai
from PyPDF2 import PdfReader
from settings import GENAI_API_KEY


genai.configure(api_key=GENAI_API_KEY)


class MessageView(APIView):
    def post(self, request):
        user_prompt = request.data.get('user_input', '')

        generated_message = self.get_gemini_response(user_prompt)

        return Response({'message': generated_message})
        
    
    def get_gemini_response(self, input_data):
        model=genai.GenerativeModel('gemini-pro')

        response=model.generate_content(input_data)
        
        return response.text

class CompanyView(APIView):
    def post(self, request):
        if 'file' not in request.data:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        print("hello")
        uploaded_file = request.data['file']
        print(uploaded_file)
        if not uploaded_file.name.endswith('.pdf'):
            return Response({'error': 'Uploaded file is not a PDF'}, status=status.HTTP_400_BAD_REQUEST)

        extracted_text = self.extract_text_from_pdf(uploaded_file)
        print(extracted_text)
        profit_loss_evaluation = self.evaluate_profit_loss(extracted_text)
        growth = self.evaluate_growth(extracted_text)

        return Response({'profit_loss_evaluation': profit_loss_evaluation, "growth": growth})

    def extract_text_from_pdf(self, uploaded_file):
        try:
            if not uploaded_file.closed:
                uploaded_file.seek(0)
                file_data = BytesIO(uploaded_file.read())
                reader = PdfReader(file_data)

                if len(reader.pages) == 0:
                    return 'Empty PDF'

                text = ""
                for page in reader.pages:
                    text += str(page.extract_text())

                return text
            else:
                return 'Uploaded file is closed'
        except Exception as e:
            return str(e)
        
    def evaluate_growth(self, input_data):
        input_prompt = f"""
                    Please provide the revenue data for the following years based on the Profit and Loss (P&L) report:

                    Format your input as follows:
                    - Year followed by revenue separated by a colon
                    - Separate each entry with a newline
                    - Replace the placeholders with actual revenue data
                    Example:
                    2019: 2,99,190.59
                    2020: 2,58,594.36

                    Thank you.
                    
                    Revenue Data:
                    {input_data}
                """
        
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(input_prompt)

        return response.text



    def evaluate_profit_loss(self, extracted_text):
        input_prompt = f"""
                    Dear Gemmi-Pro,

                    As an investor, I'm seeking an evaluation of the company's financial health based on the provided profit and loss data. Additionally, I'm interested in your recommendation regarding whether it's advisable to invest in this company or not.

                    Here's the financial data for evaluation:
                    {extracted_text}

                    Please provide a comprehensive assessment that includes key metrics such as profitability, revenue growth, cost structure, liquidity, and any other relevant factors. Your insights will greatly assist in making an informed investment decision.
                """

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(input_prompt)

        return response.text
    




# input_prompt = f"""
#             Hey Gemmi-Pro, please evaluate the company's profit and loss based on the provided financial data and also should i invest in or not:
#             {extracted_text}
#             """