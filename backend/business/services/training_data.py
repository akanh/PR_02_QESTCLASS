"""
Sample training data for department classification
"""

TRAINING_DATA = {
    "questions": [
        # HR Questions
        "How do I request vacation days?",
        "What is the company policy on sick leave?",
        "How do I update my personal information?",
        "What are the employee benefits?",
        "How do I report workplace harassment?",
        "What is the dress code policy?",
        "How do I schedule a performance review?",
        "What training programs are available?",
        "How do I submit my timesheet?",
        "What is the remote work policy?",
        
        # Finance Questions
        "How do I submit an expense report?",
        "What is the budget for my department?",
        "How do I request a budget increase?",
        "What are the payment terms for vendors?",
        "How do I process an invoice?",
        "What is the company's fiscal year?",
        "How do I get reimbursed for business expenses?",
        "What is the procedure for purchasing equipment?",
        "How do I track project costs?",
        "What are the tax implications of this expense?",
        
        # IT Questions
        "How do I reset my password?",
        "My computer is running slowly, what should I do?",
        "How do I install new software?",
        "What is the VPN setup process?",
        "How do I backup my files?",
        "My email is not working, can you help?",
        "How do I access the company network remotely?",
        "What antivirus software should I use?",
        "How do I set up a printer?",
        "How do I update my operating system?",
        
        # Production Questions
        "What is the manufacturing schedule?",
        "How do I report a quality issue?",
        "What are the safety protocols?",
        "How do I request materials for production?",
        "What is the maintenance schedule?",
        "How do I report equipment downtime?",
        "What are the production targets?",
        "How do I access the production reports?",
        "What is the procedure for equipment calibration?",
        "How do I report a workplace accident?",
        
        # Sales Questions
        "How do I access the CRM system?",
        "What is the sales target for this quarter?",
        "How do I create a customer proposal?",
        "What are the current pricing guidelines?",
        "How do I track my sales performance?",
        "What marketing materials are available?",
        "How do I schedule a client meeting?",
        "What is the commission structure?",
        "How do I handle customer complaints?",
        "What are the territory assignments?"
    ],
    "departments": [
        # HR (10)
        "HR", "HR", "HR", "HR", "HR", "HR", "HR", "HR", "HR", "HR",
        # Finance (10)
        "Finance", "Finance", "Finance", "Finance", "Finance", 
        "Finance", "Finance", "Finance", "Finance", "Finance",
        # IT (10)
        "IT", "IT", "IT", "IT", "IT", "IT", "IT", "IT", "IT", "IT",
        # Production (10)
        "Production", "Production", "Production", "Production", "Production",
        "Production", "Production", "Production", "Production", "Production",
        # Sales (10)
        "Sales", "Sales", "Sales", "Sales", "Sales", 
        "Sales", "Sales", "Sales", "Sales", "Sales"
    ]
}

def get_training_data():
    """Get sample training data for testing"""
    return TRAINING_DATA


def get_test_questions():
    """Get sample questions for testing classification"""
    return [
        "How can I change my health insurance?",
        "What is my quarterly budget allocation?", 
        "I forgot my login credentials",
        "When is the next production run scheduled?",
        "How do I contact our biggest client?"
    ]
