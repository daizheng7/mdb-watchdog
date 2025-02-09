import pandas as pd
import ast

# Define file path
file_path = r"C:\Users\david\Downloads\world_bank_projects_pakistan_2024-11-05.xlsx"

# Load the Excel file
df = pd.read_excel(file_path, dtype=str)  # Read all as string to avoid conversion issues

# Select required columns
columns_to_keep = [
    "id", "totalcommamt", "url", "teamleadname", "status", "sector1", "project_name",
    "lendinginstr", "impagency", "countrycode", "boardapprovaldate", "closingdate"
]
df = df[columns_to_keep]

# Convert data types
df["id"] = df["id"].astype(str)
df["totalcommamt"] = pd.to_numeric(df["totalcommamt"], errors="coerce")  # Convert to number

# Convert both date columns to standardized format (YYYY-MM-DD)
df["boardapprovaldate"] = pd.to_datetime(df["boardapprovaldate"], errors="coerce").dt.date
df["closingdate"] = pd.to_datetime(df["closingdate"], errors="coerce").dt.date

# Function to extract 'Name' value from dictionary-like strings in sector1
def extract_sector_name(value):
    try:
        # Convert string to dictionary safely
        if isinstance(value, str) and value.startswith("{"):
            value_dict = ast.literal_eval(value)  # Safely evaluate dictionary-like string
            return value_dict.get("Name", None)  # Extract 'Name' field
        return value  # Return value as is if not a dictionary
    except (ValueError, SyntaxError):
        return None  # Return None if conversion fails

# Apply extraction function to 'sector1' column
df["sector1"] = df["sector1"].apply(extract_sector_name)

# Save cleaned data as CSV
cleaned_file_path = r"C:\Users\david\Downloads\cleaned_world_bank_projects_pakistan_2024.csv"
df.to_csv(cleaned_file_path, index=False)

print(f"Cleaned file saved at: {cleaned_file_path}")
