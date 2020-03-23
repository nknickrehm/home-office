# Willkommen bei World of Work
Unser Beitrag zum Hackathon #WirVsVirus. 
- Mehr Informationen zum Hackathon [hier](https://wirvsvirushackathon.org) 
- Zu unserem Projekt auf Devpost gelangt ihr [hier](https://devpost.com/software/1_26_b_homeoffice_remoteteamarbeit)
- Eine Live Demo findet ihr [hier](https://www.world-of-work.de)

## Quick Start mit dem Prototypen
- Installiere [Docker](https://docs.docker.com/install/) 
- Erstelle einen Account im [Docker-Hub](https://hub.docker.com)
- Melde deine Docker Installation im Docker-Hub an mit `docker login`
- Klone dieses Repository
- Starte den Prototypen  mit `docker-compose up` in diesem Verzeichnis

## Pitch Video
[![World of Work - Thumbnail zu unserem Pitch Video](https://img.youtube.com/vi/L4Fc87VLV0c/0.jpg)](https://www.youtube.com/watch?v=L4Fc87VLV0c)

## Inspiration
In der aktuellen Lage sind Organisationen gezwungen, ihre Zusammenarbeit ins Homeoffice zu verlegen. Der Umgang mit der neuen Situation führt oft zu Unsicherheiten & Ängsten. Dies betrifft vor allem kleine und mittelständische Unternehmen, weil sie bisher wenig Anlass zu digitaler Zusammenarbeit hatten. Wir wollen die Menschen in diesen Organisationen auf spielerische Weise zu wirksamer Zusammenarbeit im Home Office befähigen und damit ihre Handlungsfähigkeit und Produktivität in der aktuellen Lage unterstützen.

## Was tut unsere Plattform?
Unsere Plattform befähigt Führungskräfte und Mitarbeiter*innen in Teams aus dem Home Office heraus effektiv zusammen en zu arbeiten. Web-basierte interaktive Erfahrungsräume ermöglichen das Erlernen digitaler Zusammenarbeit für Firmen, Teams, Führungskräfte und Mitarbeiter*innen. Wir wollen gern vermitteln, dass es Faktoren und Aspekte gibt, die bei einer effektiven Teamarbeit auch im digitalen Raum helfen.

## Wie haben wir sie gebaut?
Als Gruppe haben wir Design-Thinking Sprints und Tools verwendet, um einen Storyline sowie Produkt mit Hilfe von User Stories und Szenarien zu definieren und kreieren.

Unsere Online Plattform steht bereits prototypisch zur Verfügung. Wir haben die grundlegenden Funktionalitäten in einer interaktiven Webanwendung implementiert, welche ab sofort unter [world-of-work.de](https://world-of-work.de) verfügbar ist. Technisch gesehen, handelt es sich bei der Anwendung um einen Node.js Web-Server, einen MongoDB Datenbank-Server und NGINX als Reverse Proxy.

Das technische Setup ist grundsätzlich sehr gut skalierbar. Alle Komponenten stehen als Docker Container zur Verfügung, welche mittels einer Container-Orchestrierungs-Engine wie Kubernetes mit hoher Verfügbarkeit betrieben werden können.

Herausforderungen, die wir bewältigen mussten
Da sich keine*r von uns vorher kannte, mussten wir selbst erst einmal eine wirksame Arbeitsweise entwickeln, d.h. sich kennenlernen sowie Zusammenarbeitsregeln, Tools und Plattformen vereinbaren. Dazu kamen die Herausforderungen, die Zeit nicht aus den Augen zu lassen und in Details hängen zu bleiben, sich oft daran zu erinnern, dass es um einen Prototypen geht und nicht um ein detailliert ausgearbeitetes Produkt sowie Privatleben (Kinder, Umzug, etc) und Projekt zu jonglieren.

## Erfolge, auf die wir stolz sind
Wir waren trotz des fehlenden Kennens und unserer Unterschiedlichkeit schnell in der Lage, gemeinsam zu arbeiten und schnell Lösungen auch für Prozess-Schwierigkeiten zu entwickeln. Wir haben gemeinsam immer wieder Möglichkeiten gefunden sowohl am Ziel ergebnisorientiert zu arbeiten als auch unsere unterschiedlichen Bedürfnisse zu berücksichtigen und miteinander abzustimmen. Als selbstorganisiertes Team haben wir gemeinsam die Verantwortung für den Prozess übernommen und gemeinsam dazu beigetragen, dass wir arbeitsfähig sind und bleiben - das funktioniert oft noch nicht mal in sehr erfahrenen Teams.

Wir sind der lebende Beweis, dass Home Office auch in einem Teams funktionieren kann, das sich vorher gar nicht kennt.

## Was wir gelernt haben
Wir haben gelernt, dass unser Wissen auch diesem Praxistest standhält, das heißt vor allem darauf zu achten, dass wir uns als Menschen in einer Weise kennen lernen und begegnen, die es ermöglicht, dass wir uns in der Lage fühlen, Spannungen anzusprechen und gemeinsam zu lösen. Auch, oder speziell in einer Krisenzeit, ist es ermutigend, so schnell im Team ein sinnvolles Ergebnis erzielen zu können.

## Was kommt als nächstes für das Projekt
- Weitere Entwickler:innen, um den Prototypen zu konkretisieren
- Partner und Multiplikatoren gewinnen
- Storylines im Detail ausarbeiten und das Proof of Concept testen
- Skalierbarkeit der technischen Umsetzung weiter ausbauen
