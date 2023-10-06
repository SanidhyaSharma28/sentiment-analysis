import requests
import matplotlib.pyplot as plt

# Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
API_KEY = 'oPEL5pMid8Npss0cyILvhfzbHofiNP4S'
SYMBOL = 'AAPL'  # Replace with the stock symbol you want to fetch data for

# API endpoint for time series data (daily intervals)
endpoint = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={SYMBOL}&apikey={API_KEY}'

# Make a GET request to the API endpoint
response = requests.get(endpoint)

# Parse the JSON response
data = response.json()

dates = list(data['Time Series (Daily)'].keys())
prices = [float(data['Time Series (Daily)'][date]['4. close']) for date in dates]

# Plotting the stock price chart
plt.figure(figsize=(12, 6))
plt.plot(dates, prices, marker='o', linestyle='-', color='b')
plt.title(f'{SYMBOL} Stock Price Chart')
plt.xlabel('Date')
plt.ylabel('Price (USD)')
plt.xticks(dates[::20], rotation=45)  # Show every 20th date for better visibility
plt.tight_layout()
plt.show()
