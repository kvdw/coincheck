




	
[datetime]$epoch = "1970-01-01 00:00:00"



Function Get-CoinData {
	param($Pair,$Exchange,$Interval,$Limit)

		$ApiURL = "https://api.binance.com/api/v1/klines?symbol={0}&interval={1}&limit=12" -f $Pair,$Interval,$Limit


		try {
			$ApiResult = Invoke-WebRequest $ApiURL #-Verbose
			$ApiContent = $ApiResult.Content | ConvertFrom-JSON
			if($ApiContent.Message) {
				throw $ApiContent.Message
			}
		}
		catch {
			Write-Error "Error during getting API data for pair $Pair : $_"
			return
		}
		
		
		$ApiContent | ForEach-Object {
		

			$open = $_[1] -replace "^0\..+?(?=[1-9])"
			$high = $_[2] -replace "^0\..+?(?=[1-9])"
			$low = $_[3] -replace "^0\..+?(?=[1-9])"
			$close = $_[4] -replace "^0\..+?(?=[1-9])"
				
			return [pscustomobject]@{
				pair = $pair
				opentime = $epoch.AddSeconds($_[0] -replace "000$").AddHours("2") #2 is CEST
				open = [int]($open).ToString()
				high = [int]($high).ToString()
				low = [int]($low).ToString()
				close = [int]($close).ToString()
				volume = [long]$_[5]
				tradecount = $_[8]
				difflowhigh = ($high - $low).ToString(0)
				diffopenclose = ($close - $open).ToString(0)
				takerbuybase = $_[9]
				takerbuyquote = $_[10]
				#volchange =  "{0:N2}" -f $(100-(($lastvol/$volume)*100))
				
				color = if($_[4] -ge $_[1]) { "green" } else { "red" }
			}
			$procentchange = "{0:N2}" -f $(100-(($low/$high)*100))

		
		}
}

Function Get-CoinStatus {
param($Current,$Minimum,$Maximum)


		if($Current -lt $Minimum) {
			return "LOW - LOW"
		}
		elseif($Current -gt $Maximum) {
			return "HIGH-HIGH"
		}
		elseif($Current -ge $Minimum -AND $Current -le $Maximum) {
			return "ISIN_RANGE"
		}
		else {
			return "UNKNOWN"
		}
}

do {
	[psobject]$CoinLoopData = @()

	Clear-Host
	$Done = $False
	
	#Every loop get CSV data again
	Import-CSV "inputs.csv" | ForEach-Object {
		
	
		[string]$Coin1 = $_.Coin1
		[string]$Coin2 = $_.Coin2
		[string]$Pair = $Coin1 + $Coin2
		[string]$Exchange = $_.Exchange
		[decimal]$Minimum = $_.Min
		[decimal]$Maximum = $_.Max
	
		$CoinData = Get-CoinData -Pair $Pair -Exchange $Exchange -Interval 5m -Limit 12
		

		
		#$CoinData
		#Write-Host `n
		$Current = $CoinData | Select -Last 1 | Select -expandprop close
		$Start = $CoinData | Select -First 1 | Select -expandprop open
		


		$i= 0
		$Status = Get-CoinStatus -Current $Current -Minimum $Minimum -Maximum $Maximum
		$CoinData | Select opentime,low,high,color,dif* | ForEach-Object {
			if($i -eq 0){
				echo "`t`t`t`t`t$($_ | Select-Object -ExcludeProperty Color | convertto-csv -delimiter "`t"  -noty | select -first 1 )"
			}
			
			$Host.UI.RawUI.ForegroundColor = $_.color
			echo "$pair`t`t$Status`t $($_ | Select-Object -ExcludeProperty Color | convertto-csv -delimiter "`t" -noty | Select -skip 1)"
			$Host.UI.RawUI.ForegroundColor = "white"
			$i++
		}
		
		
		$Diff = $Current - $Start
		if($Diff -lt 0) { $WriteColor = "red" }
		elseif($Diff -gt 0) { $WriteColor = "green" }
		else { $WriteColor = "white" }
		Write-Host -ForeGroundColor $WriteColor ">>>> DIFF: $Diff ( Start:$Start, Current:$Current)"
		Write-Host -ForeGroundColor "white" ">>>> Range: Minimum:$Minimum, Maximum:$Maximum, status: $Status"


		[psobject]$CoinLoopData += @{pair=$pair;data=$CoinData}
			
				
	}

	$CoinLoopData | ConvertTo-Json -Depth 100 | Set-Content D:\node\coincheck\src\assets\CoinData.json 
	
	Import-CSV "watchlist.csv" | ForEach-Object {
	
		[string]$Coin1 = $_.Coin1
		[string]$Coin2 = $_.Coin2
		[string]$Pair = $Coin1 + $Coin2
		[string]$Exchange = $_.Exchange
		[decimal]$Minimum = $_.Min
		[decimal]$Maximum = $_.Max
		[string]$Reason = $_.Reason
	
		$CoinData = Get-CoinData -Pair $Pair -Exchange $Exchange -Interval 5m -Limit 12
		$Current = $CoinData | Select -Last 1 | Select -expandprop close
		$Start = $CoinData | Select -First 1 | Select -expandprop open
		$Status = Get-CoinStatus -Current $Current -Minimum $Minimum -Maximum "9999999999999999"
		
		$Diff = $Current - $Start
		if($Status -match "LOW") {
			Write-Host -ForeGroundColor Yellow "`n!! WACHTLIST TRIGGER FOR $PAIR !!"
			Write-Host -ForeGroundColor Yellow "!! WACHTLIST TRIGGER FOR $PAIR !!`n"
			Write-Host -ForeGroundColor Yellow "Current:$Current (below:$Minimum), Reason:$Reason"
		}
		
		
		
		
	}
	Start-Sleep -Sec 60
	

}
until ($Done -eq $True)

