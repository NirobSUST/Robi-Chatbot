import {
    Configuration,
    OpenAIApi
} from "openai";
import axios from "axios";
import fs from 'fs';
import path from 'path';
const docprocess = require('../frm');
// const translateMessage = require('../translate');

var config = require('./config');

const configuration = new Configuration(
    {apiKey: process.env.OPENAI_API_KEY,});

const openAI = new OpenAIApi(configuration);
  
function post_process(msg,to){

    //extract the intenet volume and validity and cost

    let pos= msg.toLowerCase().indexOf("gb");
    let subs = msg.substring(pos - 8, pos);
    let x = parseFloat(subs.match(/\d+(\.\d+)?/));

    let pos2 = msg.toLowerCase().indexOf("day");
    let subs2 = msg.substring(pos2 - 4, pos2);
    let y = parseFloat(subs2.match(/\d+(\.\d+)?/));
    
    // console.log(x, y);

    if (msg.includes("buy") && msg.includes("GB")  && msg.includes("day")){
        // msg = msg.replace("buy",`buy (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=${y}&cost=)`)
        msg = msg.replace("buy",`buy (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
    }
    else if (msg.includes("buy") && msg.includes("GB")){
        msg = msg.replace("buy",`buy (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
    }
    else if (msg.includes("purchase") && msg.includes("GB")  && msg.includes("day")){
        msg = msg.replace("purchase",`purchase (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=${y}&cost=&num=${to})`)
    }
    else if (msg.includes("purchase") && msg.includes("GB")){
        msg = msg.replace("purchase",`purchase (http://dev.telcobot.sense-23.com:4000/info?username=&data=${x}&validity=&cost=&num=${to})`)
    }
    else {msg=msg;}

    return msg
}
export default async function handler(req, res) {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    var messageResponse = new MessagingResponse();
    const sentMessage = req.body.Body || '';
    
    // ////translate the user message in english
    // const { detectedLanguage, sentMessage } = await translateMessage(sentRawMessage, 'en');
    // console.log('Detected Language:', detectedLanguage);
    // console.log('Translated User Message:', sentMessage);
    
    
    var to = req.body.From; //phone number, eg: whatsapp:+8801521428707
    to = to.replace("whatsapp:+","")
    // console.log(to);
    // console.log('###############################');

    let replyToBeSent = "";
    if (req.body.MediaUrl0) {
        // Save the image URL in memory
        const filePath = req.body.MediaUrl0;
        console.log(filePath);
        const result = await docprocess(filePath);
        
        replyToBeSent=`Image received and saved successfully.
        ${result.customer['Field Name']}: ${result.customer['Field Value']}, 
        ${result.bill['Field Name']} : ${result.bill['Field Value']},
        ${result.month['Field Name']} : ${result.month['Field Value']}, 
        ${result.amount['Field Name']} : ${result.amount['Field Value']}`
      }
    else{
        if (sentMessage.trim().length === 0) {
            replyToBeSent = "We could not get your message. Please try again";
        } 
        else {
            console.log(req.body)
            const response = await axios.post(`${config.bot_api}`, {
                prompt: req.body.Body
            })
            replyToBeSent = response.data.generated_text.output
            // console.log(slot_name, slot_value)
            
        }
    }
    
    replyToBeSent = post_process(replyToBeSent,to);

    // const { detectedResLanguage, translatedReply } = await translateMessage(replyToBeSent, detectedLanguage);
    
    // console.log('Translated Response Message:', translatedReply);

    messageResponse.message(replyToBeSent);//(translatedReply);
    // send response
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(messageResponse.toString());
}