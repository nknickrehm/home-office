# Willkommen bei World of Work
Unser Beitrag zum Hackathon #WirVsVirus. Mehr Informationen zum Hackathon hier und der Link zu unserem Projekt auf Devpost hier.


## Wie starte ich den Prototypen?
Es wird ein MongoDB Datenbankserver benötigt, den wir in unserem Setup in Docker betrieben haben:


docker run \
  --name mongo-wirvsvirus \
  -p 27017:27017 \
  -d mongo

Der Webserver soll langfristig auch über Docker laufen, was wir aber auf Grund vieler Commits zum Ende hin erstmal nach hinten gestellt haben. 
Daher einfach Node.js in der aktuellen LTS Variante auf dem Server / deinem lokalen Rechner installieren.

Die Datei .env.example muss kopiert und in .env umbenannt werden. Hier bitte die Adresse des MongoDB Servers und einen beliebigen String für die Sessions im Webserver angeben.

Nun noch npm install und npm start im Grundverzeichnis des Projekts ausführen.
