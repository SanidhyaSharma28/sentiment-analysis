import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import axios from 'axios';
import "../styles/news.css"

import ApexCharts from 'react-apexcharts';
import Loader from './Loader';

function News() {
    const [topStockNews, setTopStockNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stockChartDailyData, setstockChartDailyData] = useState({});
    const [stockChartWeeklyData, setstockChartWeeklyData] = useState({});
    const [stockChartMonthlyData, setstockChartMonthlyData] = useState({});
    const [loaderPercentage, setLoaderPercentage] = useState(0);

    useEffect(() => {
        fetchTopStockNews();
    }, []);

    const fetchTopStockNews = async () => {
        try {
            setLoading(true); // Start loading
            setLoaderPercentage(0); // Initialize loader percentage
            let url = "https://cloud.iexapis.com/stable/stock/market/news/last/24?token=pk_6e707d17d95746f186440e3610f204e7";
            let data = await fetch(url);
            let parsedData = await data.json();
            setTopStockNews(parsedData);
            setLoading(false);
            setLoaderPercentage(100);
        } catch (error) {
            console.error("Error fetching top stock news:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHistoricalData = async (symbol) => {
        try {
            let response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=9k_njIQwSUl2Qb2JWG_IZuIC85DAnJ1d`);
            let data = response.data['Time Series (Daily)'];
            let dates = Object.keys(data).slice(0, 7);
            let prices = dates.map(date => parseFloat(data[date]['4. close']));
            return prices.reverse();
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return [];
        }
    };

    const fetchWeeklyHistoricalData = async (symbol) => {
        try {
            let response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=YOUR_API_KEY`);
            let data = response.data['Weekly Time Series'];
            let dates = Object.keys(data).slice(0, 7); // Get the latest 7 weeks
            let prices = dates.map(date => parseFloat(data[date]['4. close']));
            return prices.reverse();
        } catch (error) {
            console.error('Error fetching weekly historical data:', error);
            return [];
        }
    };

    const fetchMonthlyHistoricalData = async (symbol) => {
        try {
          let response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=YOUR_API_KEY`);
          let data = response.data['Monthly Time Series'];
          let dates = Object.keys(data).slice(0, 7); // Get the latest 7 months
          let prices = dates.map(date => parseFloat(data[date]['4. close']));
          return prices.reverse();
        } catch (error) {
          console.error('Error fetching monthly historical data:', error);
          return [];
        }
      };

    const handleSearch = async () => {
        try {
            setLoading(true); // Start loading
            setLoaderPercentage(0);
            let url = `https://cloud.iexapis.com/stable/stock/${searchQuery}/news?token=pk_6e707d17d95746f186440e3610f204e7`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setTopStockNews(parsedData);

            // Fetch historical data and set it for chart
            const historicalData = await fetchHistoricalData(searchQuery);
            setstockChartDailyData({ [searchQuery]: historicalData });
            const weeklyHistoricalData = await fetchWeeklyHistoricalData(searchQuery);
            setstockChartWeeklyData({ [searchQuery]: weeklyHistoricalData });
            const monthlyHistoricalData = await fetchMonthlyHistoricalData(searchQuery);
            setstockChartMonthlyData({ [searchQuery]: monthlyHistoricalData });
            setLoading(false);
            setLoaderPercentage(100);
        } catch (error) {
            console.error("Error fetching top stock news:", error);
        } finally {
            setLoading(false);
        }
    };
    // Function to limit description length
    const limitDescription = (description, limit) => {
        if (description.length > limit) {
            return description.slice(0, limit) + " ...";
        }
        return description;
    };

    return (
        <div>
            <h2>Search News</h2>

            <input
                type="text"
                placeholder="Enter a stock symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {loaderPercentage < 100 && (
                <p className='container'>
                    <Loader percentage={loaderPercentage} />
                </p>
            )}

            {stockChartDailyData[searchQuery] && (
                <div className="chart-container" style={{ backgroundColor: "white", width: "50%" }}>
                    <ApexCharts
                        options={{
                            xaxis: {
                                categories: stockChartDailyData[searchQuery].map((_, index) => {
                                    // Use your historical data's dates here
                                    // Adjust the code to extract the correct date from your data
                                    // Example: return '2023-01-01' for the first data point
                                    return '2023-01-0' + (index + 1);
                                }),
                            },
                            yaxis: {
                                tickAmount: 15, // You can adjust this number based on your chart's height and desired interval
                                tickInterval: 50, // Desired difference between each level on the y-axis
                            },
                            title: {
                                text: 'Daily Chart',
                                align: 'center', // You can also use 'left' or 'right' for alignment
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize: '24px', // Adjust the font size as needed
                                  color: '#333', // Set the title color
                                },
                              },
                        }}
                        series={[{ name: 'Price', data: stockChartDailyData[searchQuery] }]}
                        type="bar"
                        height={300}
                    />
                </div>
            )}

            <div style={{ display: 'flex' }} >


            {stockChartWeeklyData[searchQuery] && (
                <div className="chart-container" style={{ backgroundColor: "white", width: "50%", flex: 1, marginRight: '10px' }}>
                    {/* <h2>Weekly Data</h2> */}
                    <ApexCharts
                        options={{
                            xaxis: {
                                categories: stockChartWeeklyData[searchQuery].map((_, index) => {
                                    // Use your historical data's dates here
                                    // Adjust the code to extract the correct date from your data
                                    // Example: return '2023-01-01' for the first data point
                                    return 'Week ' + (index + 1);
                                }),
                            },
                            yaxis: {
                                tickAmount: 15, // You can adjust this number based on your chart's height and desired interval
                                tickInterval: 50, // Desired difference between each level on the y-axis
                            },
                            title: {
                                text: 'Weekly Chart',
                                align: 'center', // You can also use 'left' or 'right' for alignment
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize: '24px', // Adjust the font size as needed
                                  color: '#333', // Set the title color
                                },
                              },
                        }}
                        series={[{ name: 'Price', data: stockChartWeeklyData[searchQuery] }]}
                        type="bar"
                        height={300}
                        />
                </div>
            )}

{/* <h2>Monthly Data</h2> */}
        {stockChartMonthlyData[searchQuery] && (
            <div className="chart-container" style={{ backgroundColor: "white", width: "50%",flex:1,marginRight:"10px" }}>
                  <ApexCharts
                    options={{
                        xaxis: {
                            categories: stockChartMonthlyData[searchQuery].map((_, index) => {
                                // Use your historical data's dates here
                                // Adjust the code to extract the correct date from your data
                          // Example: return '2023-01-01' for the first data point
                          return 'Month ' + (index + 1);
                        }),
                    },
                    yaxis: {
                        tickAmount: 15, // You can adjust this number based on your chart's height and desired interval
                        tickInterval: 50, // Desired difference between each level on the y-axis
                    },
                    title: {
                        text: 'Monthly Chart',
                        align: 'center', // You can also use 'left' or 'right' for alignment
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                          fontSize: '24px', // Adjust the font size as needed
                          color: '#333', // Set the title color
                        },
                      },
                }}
                series={[{ name: 'Price', data: stockChartMonthlyData[searchQuery] }]}
                type="bar"
                height={300}
                />
                </div>
              )}
              </div>

            {!loading && loaderPercentage === 100 && (
                <div className="row">
                    {topStockNews.map((newsItem, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-3">
                            <Newsitem
                                source={newsItem.source}
                                imgUrl={newsItem.image}
                                title={newsItem.headline}
                                description={limitDescription(newsItem.summary, 150)}
                                author={newsItem.related && newsItem.related.split("|")[0]}
                                date={newsItem.datetime}
                                newsUrl={newsItem.url}
                                mode={'dark'}
                            />
                        </div>
                    ))}
                </div>
            )}

            {searchResults.length > 0 && (
                <div className="row">
                    {searchResults.map((newsItem, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-3">
                            <Newsitem
                                source={newsItem.source}
                                imgUrl={newsItem.image}
                                title={newsItem.headline}
                                description={limitDescription(newsItem.summary, 150)}
                                author={newsItem.related && newsItem.related.split("|")[0]}
                                date={newsItem.datetime}
                                newsUrl={newsItem.url}
                                mode={'dark'}
                            />
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default News;