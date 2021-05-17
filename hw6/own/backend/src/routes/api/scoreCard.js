import { Router } from 'express';
import { Schema } from 'mongoose';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // console.log(req.body)
    const signUpNew = {
      name:req.body.name,
      subject:req.body.subject,
      score:req.body.score
    }
    // console.log(signUpNew)
    ScoreCard.findOne({name:signUpNew.name, subject:signUpNew.subject}, (err, dataExist) => {
      if(err){
        console.log(err)
      }
      if(dataExist){
        ScoreCard.findOneAndUpdate(
          {name:signUpNew.name, subject:signUpNew.subject}, {score:signUpNew.score}, {new:true}
        ).then(() => {res.send({message:'Update', card:{name:signUpNew.name, subject:signUpNew.subject, score:signUpNew.score}})})
      }
      else{
        console.log("Yet Exist")
        const newRecord = new ScoreCard(signUpNew)
        newRecord.save()
          .then((data) => {
            res.send({message:'ADD', card:{name:data.name, subject:data.subject, score:data.score}})
          }).catch((err) => {
            res.json(err)
          })
      }
    })
    
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-card', async function (req, res) {
  try {
    
    let queryTarget = {}
    queryTarget[req.query["queryType"]] = req.query["queryString"]
    // {req.query["queryType"]: req.query["queryString"]}
    
    ScoreCard.find(queryTarget, (err, dataExist) => {
      if (dataExist?.length){
        // let a = dataExist[1]
        // let b = dataExist[0]
        // let c = [[a.name, a.subject, a.score], [b.name, b.subject, b.score]]
        let dataLength = Object.keys(dataExist).length
        let totalData = []
        for (let i = 0; i < dataLength; i++){
          let temp = [`${i+1}. `,`${dataExist[i].name}, `, `${dataExist[i].subject}, `, `${dataExist[i].score}`]
          totalData.push(temp)
        }
        // totalData.push("--------------我是分隔線-------------")
        res.status(200).send({messages:totalData})
        // console.log(dataLength)
        
      }
      else{
        console.log('uh oh')
        res.status(200).send({message:`${req.query["queryType"]} (${req.query["queryString"]}) not found!`})
        
      }
    })
    
  }
  catch(e) {
    res.json({ message: 'Something went wrong...' });
  }
  
})

router.delete('/delete-card', async function (req, res) {
  try {
    ScoreCard.deleteMany({}, (err) => {
      if (err){
        res.status(500).send({error: "Could not clead database..."})
      }
      else {
        res.status(200).send({message: "All hasp info was deleted succesfully..."});
      }
    })

  }
  catch (e){
    res.json({ message: 'Something went wrong...' });
  }
})

export default router;
