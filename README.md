## About

Use kibana charts in my web app but hide the Kibana loading icon and filter.

In order to manipulate DOM in iframe, it has to put kibana under same domain with the web app need charts, then can change shared Visualize /Dashboard DOM in kibana iframe.

### start nginx

copy `default(nginx-config-file)` to replace `/etc/nginx/sites-enabled/default`

### start elk by

`sudo docker run -d -v $(pwd)/kibana.yml:/opt/kibana/config/kibana.yml -p 5601:5601 -p 9200:9200 -p 5044:5044 -it --name elk sebp/elk`

### start react project

`cd ./elk-react-test`

`yarn`

`npm start`

### referedences:

https://discuss.elastic.co/t/kibana-and-nginx-in-subpath/90280/5

https://github.com/elastic/kibana/issues/6665#issuecomment-202574432
