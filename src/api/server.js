/* File Management */
const userPath = '../data/users.json';
const jarPath = '../data/jars.json';
const memoryPath = '../data/memorys.json';
const userLoginPath = '../data/loginUser.json';
const currentJarIdPath = '../data/currentJarId.json';
const fileManager = require('fs');
let userList = JSON.parse(fileManager.readFileSync(userPath, "utf8"));
let jarList = JSON.parse(fileManager.readFileSync(jarPath, "utf8"));
let memoryList = JSON.parse(fileManager.readFileSync(memoryPath, "utf8"));
let userLogin = [];
let currentJarId = [];
let currentMemoryId = [];

/* Server Settings */
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

function userLog(userId, login=false){
   userList = JSON.parse(fileManager.readFileSync(userPath, "utf8"));
   jarList = JSON.parse(fileManager.readFileSync(jarPath, "utf8"));
   memoryList = JSON.parse(fileManager.readFileSync(memoryPath, "utf8"));

   userList.forEach((user)=>{
      if(userId == user.id){
         let userJars = [];
         jarList.forEach((jar)=>{
            if(user.id === jar.userId){
               let jarMemorys = [];
               memoryList.forEach((memory)=>{
                  if(memory.jarId === jar.jarId){
                     jarMemorys.push(memory);
                  }
               });
      
               let jarContent = {
                  "jarId": jar.jarId,
                  "userId": jar.userId,
                  "name": jar.name,
                  "date": jar.date,
                  "madeDate": jar.madeDate,
                  "color": jar.color,
                  "memoryList": jarMemorys
               }
               userJars.push(jarContent);
            }
         })
      
         let userLog = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "jar": userJars
         };

         let ids = {
            "lastJarId": jarList[jarList.length-1].jarId,
            "lastMemoryId": memoryList[memoryList.length-1].memoryId
         }
         userLogin = [userLog, ids];
         fileManager.writeFileSync(userLoginPath, JSON.stringify(userLogin));
      }
   })

   if(login && userLogin[0].jar.length != 0){
      currentJarId = [{
         "currentJarId": userLogin[0].jar[0].jarId
      }];
      fileManager.writeFileSync(currentJarIdPath, JSON.stringify(currentJarId));
   }
}

app.get("/user-api", function(req, res){
   userList = JSON.parse(fileManager.readFileSync(userPath, "utf8"));
   res.json(userList);
});

app.get("/jar-api", function(req, res){
   jarList = JSON.parse(fileManager.readFileSync(jarPath, "utf8"));
   res.json(jarList);
});

app.get("/memory-api", function(req, res){
   memoryList = JSON.parse(fileManager.readFileSync(memoryPath, "utf8"));
   res.json(memoryList);
});

app.get("/user-loged", function(req, res){
   res.json(userLogin);
});

app.get("/current-jar", function(req, res){
   res.json(currentJarId);
});

app.get("/current-memory", function(req, res){
   res.json(currentMemoryId);
});

/* POST */

app.post("/user-login", function(req, res){
   const formContent = req.body;
   userLog(formContent.id, true);
});

app.post("/new-user", function(req, res){
   const formContent = req.body;
   userList = JSON.parse(fileManager.readFileSync(userPath, "utf8"));
   
   userList.push(formContent);
   fileManager.writeFileSync(userPath, JSON.stringify(userList));
   
   userLog(formContent.id);
});

app.post("/new-jar", function(req, res){
   const formContent = req.body;
   jarList = JSON.parse(fileManager.readFileSync(jarPath, "utf8"));
   
   jarList.push(formContent);
   fileManager.writeFileSync(jarPath, JSON.stringify(jarList));
   
   userLog(formContent.userId);

   currentJarId = [{
      "currentJarId": formContent.jarId
   }];
   fileManager.writeFileSync(currentJarIdPath, JSON.stringify(currentJarId));
});

app.post("/new-memory", function(req, res){
   const formContent = req.body;
   memoryList = JSON.parse(fileManager.readFileSync(memoryPath, "utf8"));
   
   memoryList.push(formContent);
   fileManager.writeFileSync(memoryPath, JSON.stringify(memoryList));
   
   userLog(formContent.userId);
});

app.post("/user-setting", function(req, res){
   const formContent = req.body;

   userList = JSON.parse(fileManager.readFileSync(userPath, "utf8"));
   userList.forEach((user)=>{
      if(user.id === formContent.id){
         user.name = formContent.name;
         user.email = formContent.email;
      }
   })
   fileManager.writeFileSync(userPath, JSON.stringify(userList));
   userLog(formContent.id);
});

app.post("/change-current-jar", function(req, res){
   const formContent = req.body;
   
   currentJarId = [{
      "currentJarId": formContent.newCurrentJarId
   }];
   fileManager.writeFileSync(currentJarIdPath, JSON.stringify(currentJarId));
});

app.post("/change-current-memory", function(req, res){
   const formContent = req.body;
   
   currentMemoryId = [{
      "currentMemoryId": formContent.newCurrentMemoryId
   }];
});

app.listen(PORT, function(){
   console.log("Server is running port 5000");
});