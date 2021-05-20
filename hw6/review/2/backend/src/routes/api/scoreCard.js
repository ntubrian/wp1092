import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard.js';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const { name, subject, score } = req.body;
    console.log("Receive message : ", req.body)
    let result = await ScoreCard.findOne({name: name, subject: subject})
    if (result !== null){
      try {
        result = await ScoreCard.findOneAndUpdate({name: name, subject: subject}, {score: score});
      } catch (e) {
        throw new Error ("Message DB update error: " + e);
      }
      res.json({message: `Updating (${name}, ${subject}, ${score})`, card: {name, subject, score}});
    }else{
      const card = new ScoreCard ({ name, subject, score });
      try {
        await card.save();
        console.log("Save the card", req.body);
      } catch (e) {
        throw new Error ("Message DB save error: " + e);
      }
      res.json({message: `Adding (${name}, ${subject}, ${score})`, card: {name, subject, score}});
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear', async function (req, res) {
  console.log("Receive delete message");
  try {
    await ScoreCard.deleteMany({});
    console.log("delete all cards");
    res.json({message: "Database cleared"});
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query', async function (req, res) {
  console.log("Receive post message");
  try {
    const {type, string} = req.body;
    let scoreCards = [];
    console.log("query : ", string);
    let queryString = [string]
    if(string.indexOf(" OR ") !== -1)
      queryString = string.split(" OR ");
    else if (string.indexOf(" AND ") !== -1)
      queryString = string.split(" AND ");
    // console.log("queryString : ", queryString);
    if(type === "both")
    {
      let tempTypes = []
      let tempStrings = []
      for(let subString of queryString)
      {
        tempTypes.push(subString.split(" = ")[0]);
        tempStrings.push(subString.split(" = ")[1]);
      }
      
      let name = ""
      let subject = ""
      for(let i=0 ; i<2 ; i++)
      {
        if(tempTypes[i] === "Name")
          name = tempStrings[i]
        else if (tempTypes[i] === "Subject")
          subject = tempStrings[i]
      }
      // console.log("Name :", name, ",Subject  ", subject);
      if(string.indexOf(" OR ") !== -1)
      {
        scoreCards = await ScoreCard.find({$or: [{name: name}, {subject: subject}]});
      }else if(string.indexOf(" AND ") !== -1){
        scoreCards = await ScoreCard.find({name: name, subject: subject});
      }
      
    }else{
      for(let subString of queryString)
      {
        let temp = [];
        if(type === "name"){
          temp = await ScoreCard.find({name: subString});
        }else if(type === "subject"){
          temp = await ScoreCard.find({subject: subString});
        }
        scoreCards = scoreCards.concat(temp);
      }
    }
    
    if(scoreCards.length !== 0)
    {
      console.log("response : ", scoreCards);
      const messages = scoreCards.map(scoreCard => `Name: ${scoreCard.name}, Subject: ${scoreCard.subject}, Score: ${scoreCard.score}`);
      res.json({messages: messages,  message: "success to find data"});
    }else{
      res.json({messages: null, message: `${type} (${string}) not found!, please check the format in README file first`});
    }
  } catch (e) {
    res.json({ message: 'Something went wrong..., please check the format in README file first' });
  }
});

export default router;
