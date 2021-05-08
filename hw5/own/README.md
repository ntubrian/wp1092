
- baseline
    - 有提供正確答案的 hint 以便同學測試
    - 改掉老師的 parseInt，以便輸入非數字型態時可以報錯(ex:Error: 12a is not a valid number (1 - 100))

- advanced
    - 不管是一開始沒開啟 server 或遊戲進行到一半關掉 server，畫面皆會顯示 'Oops! Server is down!'訊息
        由於是透過 axios 每秒非同步發送 request 到 server 確認 server 是否還活著，因此 'Oops'訊息
        會延遲個一秒左右才顯示
    - 有實作 log 檔，可以開啟 log file 檢視，檔名皆按照 spec 要求