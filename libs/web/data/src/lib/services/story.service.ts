import { Injectable } from '@angular/core';
import { Story } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  stories: Story[] = [];
  constructor() {
    this.stories = [
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
      {
        id: 2,
        title: 'Riderman',
        place: 'Bad Dürrheim',
        country: 'Germany',
        countryCode: 'de',
        date: new Date('2021-09-17'),
        text: 'Die Organisatoren bleiben ihrem erfolgreichen Konzept treu, dem Drei-Etappenrennen mit Tages- und Gesamtwertungen. Am Freitag und Sonntag sind zudem auch Einzelstarts möglich. Das Ergebnis der RiderMan-Gesamtwertung fließt in die Wertung des German Cycling Cups ein, Deutschlands größter Rennradserie für Hobbyfahrer.',
        imgUrls: [
          'https://le-cdn.website-editor.net/s/e0ee9bc263494ad58d91451451912f88/dms3rep/multi/opt/5767_20190920_142236_181418818_original-1920w.JPG?Expires=1637997206&Signature=q6o1nvt5xcd3vPKN-8pAeuFqYx9sx3KOBq9AGDOtML5g7iP5g6eOF2sXK8Py0OP6F~NuBcbghjR93u2wSC7bZ28UyMmKValaFbRjDOl-aYxK-g44is~pkwdx-z5F2vKKD7pV8s2gA3q1eRWLon6YPb5I7fxoKTxuvQ1Ihn5jFTysuo01vwb3~MTcwuNasaD09~4Gawx4iQM3iPI7opE4XvboynDAkC-xYcMpKIUR3Gj9l5uZkSv78CoffyK94H1ypVikraezGGtmkPmqJO4KrPq1hiFj9JM8nRjJFeXvwBaaTdVxM8UQfNvZk0sKXankzk8r2VN3XiCnKJKgIGSTkQ__&Key-Pair-Id=K2NXBXLF010TJW',
          'https://cdn.website-editor.net/e0ee9bc263494ad58d91451451912f88/dms3rep/multi/5768_20190921_143917_181427260_original.JPG',
          'https://le-cdn.website-editor.net/s/e0ee9bc263494ad58d91451451912f88/dms3rep/multi/opt/5767_20190920_144334_181416911_original-1920w.JPG?Expires=1637997206&Signature=FstjM35040MBeRnd481N2RJnA8aTZcZHHK-D4Yg0rl4jjEKJn9Br-wrXuc1yszRAg8n~NTYdrN8cjJDdqaekhRxw3pmpb2zznKHnlGcoYwx~pnuUKe28BWR9obx~6dzjkcEpqj~S956Ha38P1K8jgcyetpnEnswG0quvbwuUQf50hjjbchYEJrzpqFnVagPs8NmN31GGPJpuurnXIV0Qwo2xsN2sMeWrrZ1X2LEvKkiE45SEXtDLwhf7~LgT~XkK8W1gnNXoz7hzqd4Cd8HizUscutHdMVdcNbG6swubdQLAH09Q4qlQa~UaLNWWaJRPEzf4rs5jVFWsm2yGnQYNnA__&Key-Pair-Id=K2NXBXLF010TJW',
        ],
        podium: false,
      },
      {
        id: 3,
        title: 'Rund um die Telgter Windräder',
        place: 'Telgte',
        country: 'Germany',
        countryCode: 'de',
        date: new Date('2021-10-10'),
        text: 'Auf einem attraktiven 5,3 Kilometer langen Rundkurs an der Stadtgrenze werden über den Tag verteilt 8 Rennen auf die Strecke gehen. Neben dem Schwerpunkt auf vier Juniorenrennen (U11, 13, 15 & 17) wird es des Weiteren ein Frauenrennen geben, sowie ein Hobbyrennen für Jedermann ohne notwendige Radlizenz. Die Highlights bilden das Amateur- sowie das Elite-Rennen um den BRAUN-WÄLZLAGER-CUP. Die Zielgerade unseres Rundkurses führt geradewegs auf den höchsten Punkt von Telgte. Daher ist das Radsportmotto in Telgte – „zum Ziel geht es aufwärts“. Auf dem Eventgelände im Start- Zielbereich gibt es Essen- und Getränkeverkauf, Toiletten, Sitzgelegenheiten sowie einen großen Parkplatz.',
        imgUrls: [
          'https://www.sprinter-waltrop.de/wp-content/uploads/2021/10/Rund-um-die-Telgte-Windraeder-9a-672x372.jpg',
        ],
        podium: false,
      },
      {
        id: 4,
        title: 'Brezelrace',
        place: 'Stuttgart',
        country: 'Germany',
        countryCode: 'de',
        date: new Date('2021-09-12'),
        text: 'Und wer immer noch nicht weiß, was „brezeln“ mit dem Rad heißt, spürt das spätestens beim Start im Herzen Stuttgarts, beim spannenden Auf und Ab in der Region und bei der Zieleinfahrt. Das Brezel Race Stuttgart & Region endet auf der Theodor-Heuss-Straße im Herzen Stuttgarts.',
        imgUrls: [
          'https://www.brezelrace.de/wp-content/uploads/2021/09/Brezel_Race_19-980x653.jpg',
        ],
        podium: false,
      },
      {
        id: 5,
        title: 'SUCH21',
        place: 'Geneve',
        country: 'Switzerland',
        countryCode: 'ch',
        date: new Date('2021-09-04'),
        text: 'Ride through all of the 26 Cantons, ride fast but do not forget to punch you brevet card. And more so, make sure you take a bit of the different flavors we have put in this new recipe, you won’t regret it. Being a Swiss race, there will be cheese and chocolate involved, but much more than that…and make sure to bring your good spirit and your appetite to the finish line for the traditional finisher party on the Sunday with all these tasty ingredients.',
        imgUrls: [
          'https://i2.wp.com/such.bike/wp-content/uploads/2021/02/image0-1.jpeg?w=1537&ssl=1',
          'https://scontent-muc2-1.xx.fbcdn.net/v/t1.6435-9/241764097_418745643181404_8353079692601414807_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=a26aad&_nc_ohc=Pk5oA7so0HQAX9Fw5yF&_nc_ht=scontent-muc2-1.xx&oh=0d4e39111367ebe1b928dacb5de8fcf1&oe=61A93630',
        ],
        podium: false,
      },
    ];
  }

  getStoriesById(id: number): Observable<Story> {
    return of(this.stories.filter((story) => story.id == id)[0]);
  }
  getStories(): Observable<Story[]> {
    return of(this.stories);
  }

  sortByDate(stories: Story[]) {
    return stories.sort((a, b) => (a?.date > b?.date ? 1 : -1));
  }
}
