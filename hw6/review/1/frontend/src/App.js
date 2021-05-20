import { useState, useEffect, useRef } from 'react';
import useScore from './usescore.js';
import { Input, Button, Radio, message, Typography, Space } from 'antd';
import './App.css';

function App() {
    const {status, messages, sendMessage, clearMessages, checkMessage } = useScore();
    const [Name, setName] = useState('');
    const [Subject, setSubject]= useState('');
    const [Score, setScore] = useState('');
    const { Text } = Typography;
    const [value, setValue] = useState(1);
    const [Query, setQuery] = useState('');
    const [Filter, setFilter] = useState(false);

    const displayStatus = (payload)=>{
        if (payload.msg) {
            const { type, msg } = payload
            const content = {
                content:msg,
                duration: 0.5
                }
            switch(type){
              case 'success':
                message.success(content)
                break
            case 'info':
                message.info(content)
                break
              case 'error':
              default:
                message.error(content)
                break
            }
        }
    }
    useEffect(()=>{ displayStatus(status)
    },[status])

    const onClick = async() =>{
        console.log(Name)
        if (Name&&Subject&&Score){
            setFilter(false)
            console.log('Success')
            console.log({name:Name,subject:Subject,score:Score})
            await sendMessage({name:Name,subject:Subject,score:Score})
            await setName('')
            await setSubject('')
            await setScore('')
        }
    }
    const queryRef = useRef(null);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        queryRef.current.focus()
    };
    const queryChange = (e) =>{
        if (value === 1){
            setQuery(e.target.value)
            // console.log(Query)
        }
        if (value === 2){
            setQuery(e.target.value)
            // console.log(Query)
        }
    }
    const onSearch = async()=>{
        console.log(Query)
        if (value === 1){
            await checkMessage({name:Query})
            await setFilter(true)
            setQuery('')

        }
        if (value === 2){
            await checkMessage({subject:Query})
            await setFilter(true)
            setQuery('')
        }
        
    }
    
  return (
    <div className="App">
    	<div className="App-title">
    		<h1>ScoreCard DB</h1>
    		<Button type="primary"
            onClick={clearMessages} 
            style={{
            height:"35px", 
            width:"70px", 
            borderRadius:"10px",
            backgroundColor:"skyblue",
            shadowOpacity:"0.1"}}>
	          Clear
	        </Button>
    	</div>
    	<div className="App-row">
    		<Input
        	   placeholder="Name"
               value={Name}
               onChange={(e)=>{setName(e.target.value)}}
        	   style={{
               marginBottom:10,
               marginRight: 5,
               width:"80px",
               height:"20px" }}
            ></Input>
            <Input
        	   placeholder="Subject"
               value={Subject}
               onChange={(e)=>{setSubject(e.target.value)}}
        	   style={{
                marginBottom: 10,
                marginRight: 5,
                width:"80px",
                height:"20px" }}
            ></Input>
            <Input
        	   placeholder="Score"
               value={Score}
               onChange={(e)=>{setScore(e.target.value)}}
        	   style={{
                marginBottom: 10,
                marginRight: 5,
                width:"80px",
                height:"20px" }}
            ></Input>
            <Button 
            type="primary"
            onClick={onClick}
            style={{
            height:"25px",
            width:"50px",
            marginBottom:"5px"}}>
	          Add
	        </Button>
    	</div>
        <div className="App-row">
            <Radio.Group>
            <Radio value={1} style={{margin:10, display:"flex"}} onChange={onChange}>Name</Radio>
            <Radio value={2} style={{margin:10, display:"flex"}} onChange={onChange}>Subject</Radio>
            </Radio.Group>
            <Input.Search
              ref={queryRef}
              value={Query}
              onChange={queryChange}
              placeholder="Query string..."
              enterButton="Query"
              onSearch={onSearch}
            ></Input.Search>
        </div>
        <div className="App-message" style={{whiteSpace:'pre-wrap'}} >
           <Space>
                { messages.length === 0 ? (
                <p style={{ color: '#ccc' }}> No messages... </p>
                ):(
                    Filter === false ? (
                        messages.map(({ name, subject, score }, i) => (
                          <Text key={i}> Adding ({name},{subject},{score})</Text>))
                    ):(
                        messages.map(({ name, subject, score }, i) => (
                          <Text key={i}> ({name},{subject},{score})</Text>))
                    )
                    
               )}

            </Space>
                
        </div>
    </div>
    
  );
}

export default App;
