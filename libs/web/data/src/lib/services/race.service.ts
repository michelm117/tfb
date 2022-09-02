import { Injectable } from '@angular/core';
import { Race, Event, Result } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  races: Event[] = [];
  constructor() {
    this.races = [
      {
        id: 1,
        title: 'Münsterland Giro',
        place: 'Münster',
        country: 'Germany',
        countryCode: 'de',
        date: new Date('2021-10-03'),
        text: 'Den Anfang hierzu machten in diesem Jahr die Fahrer der 100-km-Runde um 07.50 Uhr. Das hieß für uns, dass wir uns um 06.50 Uhr mit allen am Schlossplatz getroffen haben, um die Taktik zu besprechen und gemeinsam zum Start zu rollen. Am Start angekommen, wurde erstmal der halbe Startblock begrüßt… man kennt sich halt… HEIMSPIEL!\n\nUnd dann ging es endlich los. Taktisch wurden wir diesmal von Christoph und Christian hervorragend eingestellt und unser Plan sah vor, dass wir uns direkt von Beginn an komplett vorne positionieren, um im anfänglichen Kurvengeschlängel allen Risiken aus dem Weg zu gehen. Danach wollten wir bis Vadrup weiterhin das Feld kontrollieren, um dann kurz vor Vadrup das Tempo anzuziehen und am Ortsausgang von Vadrup auf der Windkante die Gruppe des Tages zu initiieren. Das war der Plan,… und was soll ich sagen… es ist einfach soooo geil, wenn der Plan dann komplett auf den Punkt genau aufgeht, weil sich alle voll reinhängen! Das, meine lieben Freunde der Tanzmusik und des Breitensports, ist Teamgeist!\n\nSomit stand die Gruppe des Tages mit Christian Müller, Christoph Wisse, Stefan Brechler sowie Raphael Otto und die Aufgabe für den Rest des Teams bestand von nun an darin, das Feld zu kontrollieren, so dass die vier vorne nicht in Gefahr kommen, eingeholt zu werden. So ging es dann über Brock nach Lengerich, wo der erste Hügel des Tages genommen werden musste, der auch zu einer ersten Selektion des Feldes führte. Im Anschluss daran folgten weitere Wellen des Teutoburger Waldes, die uns zuerst nach Leeden, Ledde und dann nach Brochterbeck geführt haben. Bei einsetzendem Regen und Westwind ging es weiter nach Ladbergen, bevor es dann bei Schmedehausen über den Postdamm nach Gelmer in die Rieselfelder Richtung Sprakel ging.\n\nVorne konnten die vier Ausreißer durch gute Zusammenarbeit ihren Vorsprung kontinuierlich ausbauen, so dass der Sieger nur durch einen der Vier gestellt werden konnte. Letztendlich war Raphael Otto der stärkste Fahrer an diesem Tag, der dann absolut verdient als Sieger vor Stefan Brechler und Christoph Wisse durchs Ziel geschossen ist.\n\nFür uns stand nach wie vor die Aufgabe fest, das Tempo und somit das Feld zu kontrollieren, so dass dann geschlossen die finalen Kilometer bis zum Ziel am Schlossplatz in Münster angegangen werden konnten. Da wir uns dadurch nach wie vor weit vorne im Feld befanden, konnten wir letztendlich erneut den Sieg in der Teamwertung beim HEIMSPIEL einfahren! Einfach ein geiles Team!',
        imgUrls: [
          'https://muensterland-giro.de/wp-content/uploads/2021/09/andre-greipel-200x133.png',
        ],
        podium: true,
      },
    ];
  }

  getYearRaceMap(): Observable<Map<number, Event[]>> {
    const map = new Map<number, Event[]>();
    this.races.forEach((race) => {
      const year = race.date.getFullYear();
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)?.push(race);
    });
    return of(map);
  }
}
