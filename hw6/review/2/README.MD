## 基本功能  
* 當 "Clear" 按鈕被按下去後，會送出 DELETE request 把 DB 清空，然後在下⽅空⽩處印出 “Database cleared”。
* 當 "Name", "Subject" 以及 "Score" 三個輸入匡都被輸入值之後，按下 "Add" 按鈕，會把資料寫到
* 如果 {Name, Subject} paired value 已經存在 DB，則取代原先在 DB 的這筆資料，然後在下⽅空⽩處印出 "Updating (Name, Subject, Score)” // Name, Subject, Score 請代換成輸入的值否則，在 DB 新增⼀筆資料，就印出 "Adding (Name, Subject, Score)”。
* 當 Query string 不為空字串的情況下，當 Query 按鈕按下去後，會根據 Name/Subject ⼆選⼀的 radio button 選擇 Name or Subject 作為 query 條件，然後根據輸入 Query String 的內容去 DB 把符合條件的資料搜尋回來，在下⽅空⽩處印出搜尋出來的結果 (⼀筆⼀⾏，格式不限)。如果找不到，就印出“QueryType (QueryString) not found!” // 例如："Name (Ric) not found!”
* 以上所有動作在印出訊息/資料時會先把原先空⽩處的顯⽰清掉，如果在 query 時有任何的錯誤訊息，也是⼀樣印在這邊。

## 進階功能
* 針對 Name、Subject 各自能使用" AND" 或" OR" 做query(全用AND或全用OR，不可混用)
* 針對 Both, 需使用 "Name = ... AND Subject = ..." 或 "Name = ... OR Subject = ..."兩種格式，Name 跟 Subject 順序可替換，但...僅能為一字串，不可含有" AND "或" OR "