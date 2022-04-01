Setup Sensetalk

Requirements
a. XAMPP Server for PHP and MySQL
b. Erlang for cookies for RabbitMQ
c. RabbitMQ as MQTT Broker


a. XAMPP Server for PHP and MySQL
  1. Install Xampp Server
  2. Start Apache and MySQL
  3. go to http://localhost/phpmyadmin
  4. Create sensetalk Database
  5. import sensetalk.sql 
  6. copy sensetalk folder into htdocs
  7. change db name, username and password in sensetalk/api/config/db.php
  8. test frontend http://localhost/senstalk/html/
  9. test API http://localhost/sensetalk/api/api.php?service=location


b. Erlang for cookies installation
  1. download or bash https://www.erlang.org/downloads
  2. install

c. RabbitMQ as MQTT Broker
  1. download https://www.rabbitmq.com/#getstarted
  2. Mac installation https://www.rabbitmq.com/install-homebrew.html
  3. https://dyclassroom.com/howto-mac/how-to-install-rabbitmq-on-mac-using-homebrew
  4. To Test go to http://localhost:15672
  5. default username and password is guest and guest
  6. once done enable below plugins
      1. rabbitmq-plugins enable rabbitmq_management
      2. rabbitmq-plugins enable rabbitmq_web_stomp
      3. rabbitmq-plugins enable rabbitmq_web_mqtt
  7. now it's done.
