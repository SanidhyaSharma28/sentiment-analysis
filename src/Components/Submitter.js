import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

const Submitter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [watchlist, setWatchList] = useState([]);
    const [chartVisibility, setChartVisibility] = useState([]);
    // const [chartData, setChartData] = useState([]);
    const [selectedStockSymbol, setSelectedStockSymbol] = useState(null);
    const [stockChartData, setStockChartData] = useState({});

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

    const toggleChartVisibility = (index) => {
        const updatedVisibility = [...chartVisibility];
        updatedVisibility[index] = !updatedVisibility[index];
        setChartVisibility(updatedVisibility);
    };

    const fetchData = async (symbol) => {
        try {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=9k_njIQwSUl2Qb2JWG_IZuIC85DAnJ1d`);
            let result = await response.json();
            console.log(result)
            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateWatchlist = async () => {
        console.log('Updating watchlist...');
        const updatedWatchList = await Promise.all(
            watchlist.map(async (stock) => {
                const result = await fetchData(stock.symbol);
                if (result && result['Global Quote']['10. change percent']) {
                    stock.percentChange = result['Global Quote']['10. change percent'];
                }
                return stock;
            })
        );
        setWatchList(updatedWatchList);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedStockSymbol) {
                // Check if historical data for this stock symbol already exists
                if (!stockChartData[selectedStockSymbol]) {
                    let historicalData = await fetchHistoricalData(selectedStockSymbol);
                    setStockChartData(prevData => ({
                        ...prevData,
                        [selectedStockSymbol]: historicalData
                    }));
                }
            }
        };

        if (selectedStockSymbol && chartVisibility) {
            fetchData();
        }

        const updateInterval = setInterval(updateWatchlist, 30000);

        return () => {
            clearInterval(updateInterval);
        }
    }, [watchlist, selectedStockSymbol, chartVisibility, stockChartData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData(searchTerm);
        if (result) {
            const newStock = {
                symbol: result['Global Quote']['01. symbol'],
                price: result['Global Quote']['05. price'],
                percentChange: result['Global Quote']['10. change percent'],
            };
            setWatchList([...watchlist, newStock]);
        }
        setSearchTerm('');

    };
    const handleDelete = (index) => {
        const updatedWatchlist = [...watchlist];
        updatedWatchlist.splice(index, 1);
        setWatchList(updatedWatchlist);
    };
    return (
        <div className='my-4 '>
            <form className="d-flex " role="search" onSubmit={handleSubmit} style={{height:'40px',borderRadius:'0px'}}>
                <input
                    className="form-control me-2 "
                    
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

                    <div className="seven my-3">
                        <h2 className='Headers'>WATCHLIST</h2>
                    </div>

            {watchlist.length > 0 && (
                <div className="mt-3">
                    <div className='watchlist-container'>
                        {watchlist.map((stock, index) => (
                            <div className="watchItem" style={{backgroundColor:'white',opacity:'0.8',border:'blue',borderRadius:'40px'}} key={index}>
                                <strong>{stock.symbol}: US${stock.price} </strong>{parseFloat(stock.percentChange) > 0 ? <span style={{ color: 'green' }}>▲{stock.percentChange}</span> : <span style={{ color: 'red' }}>▼</span>}{' '}
                                {/* <strong style={{ color: parseFloat(stock.percentChange) < 0 ? 'red' : 'green' }}>{stock.percentChange}</strong>) */}
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input "
                                        type="checkbox"
                                        role="switch"
                                        id={`chartSwitch${index}`}
                                        checked={chartVisibility[index] || false}
                                        onChange={() => {
                                            toggleChartVisibility(index);
                                            setSelectedStockSymbol(stock.symbol);
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor={`chartSwitch${index}`}>
                                        CHART
                                    </label>
                                </div>
                                <button className='buttonsi' style={{border:'1px solid black'}} onClick={() => handleDelete(index)}>Delete</button>

                                {chartVisibility[index] && stockChartData[stock.symbol] && stockChartData[stock.symbol].length > 0 && (
                                    <div className="chart-container">
                                        <ApexCharts
                                            options={{
                                                xaxis: { categories: ['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7'] },
                                            }}
                                            series={[{ name: 'Price', data: stockChartData[stock.symbol] }]}
                                            type="line"
                                            height={300} // Set the height of the chart
                                        />
                                    </div>
                                )}

                            </div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Submitter;
