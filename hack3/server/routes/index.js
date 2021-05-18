import { GetStations, CalculateDistance } from './station'
import {Router} from 'express'
import Station from '../models/station'
const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  // set proper api path and connect the path with wrap(function)
  // coding here ...
  // let d = {}
  // // let result = [] 
  // let stationCollect = []
  // Station.find({}, async (err, data) => {
  //   let dLen = Object.keys(data).length
  //   for (let i = 0; i < dLen; i++){
  //     let temp = data[i].station_type
  //     if (!d.hasOwnProperty(temp)){
        
  //       d[temp] = [data[i]]
  //       // console.log(d)
  //       stationCollect.push(temp)
  //     }
  //     else{
  //       d[temp].push(data[i])
  //     }
  //   }
  //   for (let j = 0; j < stationCollect.length; j++){
  //     d[(stationCollect[j])].sort((a, b) => a.station_order - b.station_order)
  //   }
    
  //   console.log(d)
  // })
  const router = Router()
  router.get('/api/getStations', wrap(GetStations))
  app.use('/', router)
}

export default routes
