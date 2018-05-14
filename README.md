# Coincheck

Simple parser of data from Binance to show momentum for multiple coins on one screen

Required input from bin\TrackCoin-CsvShowScreenAndJson.ps1 to be written to CoinData.json in the /src/assets folder
Uses inputs.csv for getting information from the coin/token
Users watchlist.csv for looking for retracements of a coin/token (only shown in PS output, not web)


Todo:
- [ ] Improve styling with bootstrap
- [ ] Outsource ps1 file to DataService and add more Exchanges
- [ ] Filter data before showing
- [ ] Add current price to the left of the bar
- [ ] Add lower/high
- [ ] Improve layout to show more coins on one page
