# gpt-bot
A bot demo to harness the power of GPT

# deployment steps

Update config files in
- channels_service/whats_app/pages/api/config.js
- mock_service/ssl_commerce/config.js
- update docker file for running on proper port channels_service/whats_app/dockerfile
- update docker file for running on proper bot_service/langchain/dockerfile

give permission to folders so that docker volume data can we written properly
```bash
sudo chmod -R 777 .
```

to check a container log
```bash
docker logs <container_id> -f
```

to find containers by docker ps
```bash
docker ps | grep 1433
```

to connect with container bash
```bash
docker exec -it <container_id> bash
```

to connect to local mssql container and run sql commands to provide remote access
```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P my_super_secret_pass_for_sql_1299 -q "EXEC sp_configure 'remote access', 1;"
RECONFIGURE;
GO
exit
```

to build and run with changes in docker
```bash
docker compose up -d --build
```

# Instructions for running locally
1. In SSMS, create a new database connection with following details:
server type: database engine
server name: localhost, 1433
login: sa
password: my_super_secret_pass_for_sql_1299

Run 'robi-mock-db-data-gen-script.sql' in the new connection. This will create the database with data.

2. In a new terminal, go to the 'channels_service\whats_app'. Run 'ngrok http 3000' to run the ngrok server. Paste the forwarding link in the twillo sandbox and save. Copy the joining code. Copy the mobile number for the chatbot.

3. Start the docker-compose file.

4. In Whatsapp start chatting with the mobile number given in Twillo.
First message should be the joining code. Then chat with the bot as required.#   R o b i - C h a t b o t  
 