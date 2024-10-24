import { getAuthor } from '../../author';

export const recipes = [
  {
    "id": 45,
    "title": "Vaječná pizza",
    "description": "Dopřejte si dokonalý snídaňový sen s naším receptem na vaječnou pizzu. Krémová, nadýchaná a plná bohatých chutí, tato vejce jsou uvařena k dokonalosti s nádechem másla a špetkou koření",
    "level": "Snadné",
    "servings": 2,
    "hasVideoSteps": true,
    "free": true,
    "prep_time": 15,
    "cook_time": 15,
    "time": 30,
    "priority": 0,
    "author": getAuthor(45),
    "filters": [
      "Snídaně",
    ],
    "steps": [
      {
        "description": "Rozklepněte vejce do mísy, přidejte zakysanou smetanu a trochu mléka, stejně jako sůl, pepř a italské koření, a nakonec vše vyšlehejte mixérem (nebo vidličkou)",
        "ingredientsIds": [],
      },
      {
        "description": "Na mírném ohni rozehřejte pánev, přidejte olivový olej a máslo, když je pánev potažena olejem, nalijte rozšlehaná vejce do pánve",
        "ingredientsIds": [],
      },
      {
        "description": "Přidejte cherry rajčata, pepperoni, parmazán. Přikryjte poklicí na 5 minut. Vyndejte a přelijte balsamikovou omáčkou a bazalkou",
        "ingredientsIds": [],
        "duration": 300
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Vejce",
        "quantity": 4,
      },
      {
        "id": 2,
        "title": "Zakysaná smetana",
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Mléko",
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Cherry rajčata",
        "quantity": 5,
      },
      {
        "id": 5,
        "title": "Sůl",
      },
      {
        "id": 6,
        "title": "Pepř",
      },
      {
        "id": 7,
        "title": "Parmazán",
        "quantity": 30,
        "unit": "g"
      },
      {
        "id": 8,
        "title": "Balsamiková omáčka",
      },
      {
        "id": 9,
        "title": "Pepperoni",
      },
      {
        "id": 10,
        "title": "Bylinky",
      },
    ],
  },
  {
    "id": 39,
    "title": "Lvovský tvarohový koláč 😍",
    "description": "",
    "level": "Snadné",
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 10,
    "cook_time": 60,
    "time": 70,
    "priority": 0,
    "instagram": "nastya_shemelina9",
    "filters": [
      "Ukrajina",
      "Snídaně",
      "Dezert",
    ],
    "steps": [
      {
        "description": "V mixéru rozmixujte tvaroh, zakysanou smetanu, vejce a cukr do hladka. Poté přidejte škrob a rozpuštěné máslo a znovu mixujte do hladka",
        "ingredientsIds": [],
      },
      {
        "description": "Přidejte sušené ovoce a promíchejte. Dejte do pečicí formy vyložené pečicím papírem a vymazané olejem a vložte do trouby na 1 hodinu při 180 stupních. Po upečení se může zdát měkký, ale po ztuhnutí a vychlazení bude akorát. Vychlaďte a přelijte polevou",
        "ingredientsIds": [],
        "duration": 3600
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Tvaroh",
        "quantity": 700,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Zakysaná smetana",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Vejce",
        "quantity": 3,
      },
      {
        "id": 4,
        "title": "Cukr",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Kukuřičný škrob",
        "quantity": 30,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Máslo",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 7,
        "title": "Sušené ovoce",
        "quantity": 200,
        "unit": "g"
      },
    ],
  },
  // Košíčky s Brie a džemem
  {
    "id": 38,
    "title": "Košíčky s Brie a džemem",
    "description": "",
    "level": "Snadné",
    "iconColor": 'white',
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 15,
    "cook_time": 15,
    "time": 30,
    "priority": 3,
    "filters": [
      "Dezert",
      "Svačina",
      "Snídaně"
    ],
    "steps": [
      {
        "description": "Těsto lehce rozválejte na povrchu, posypte moukou. Ořechy nasekejte, sýr nakrájejte na kostky",
        "ingredientsIds": [],
      },
      {
        "description": "Formu na muffiny vymažte rostlinným olejem. Vložte kostku sýra a lžičku džemu dovnitř. Posypte ořechy, přidejte rozmarýn. Pečte v předehřáté troubě na 190°C po dobu 15 minut",
        "ingredientsIds": [],
        "duration": 900
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Listové těsto",
        "quantity": 250,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Brie",
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Brusinky",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Vlašské ořechy",
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Rozmarýn",
        "quantity": 2,
        "unit": "větvičky"
      },
    ],
  },
  // Mrkvový muffin
  {
    "id": 37,
    "title": "Mrkvový muffin",
    "description": "Mrkvový muffin pro příjemný rodinný večer",
    "level": "Snadné",
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 40,
    "cook_time": 20,
    "time": 60,

    "priority": 3,
    "filters": [
      "Snídaně",
      "Dezert"
    ],
    "steps": [
      {
        "description": "Smíchejte vše kromě mouky, poté přidejte mouku a znovu promíchejte",
        "ingredientsIds": [],
      },
      {
        "description": "Formu vymažte olejem. Přendejte směs do formy. Pečte v předehřáté troubě na 180 stupňů Celsia po dobu 40 minut. Zkontrolujte špejlí, zda je muffin uvnitř vlhký, pokud ano, prodlužte dobu pečení",
        "ingredientsIds": [],
        "duration": 2400
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Mrkev",
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Vejce",
        "quantity": 3,
      },
      {
        "id": 3,
        "title": "Cukr",
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Mouka",
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Prášek do pečiva",
        "quantity": 10,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Máslo",
        "description": "rozpuštěné",
        "quantity": 80,
        "unit": "g"
      },
      {
        "id": 7,
        "title": "Mák",
        "description": "můžete použít více, přizpůsobte podle sebe",
        "quantity": 5,
        "unit": "lžic"
      },
      {
        "id": 8,
        "title": "Citron",
        "description": "použijte kůru",
        "quantity": 1,

      },
      {
        "id": 9,
        "title": "Vlašské ořechy",
        "quantity": 100,
        "unit": "g"
      },
    ],
  },
  // Mrkev pečená s parmazánem
  {
    "id": 36,
    "title": "Mrkev pečená s parmazánem",
    "description": "Parmazán se rozpustí a dá mrkvi lákavou krustu 🤤",
    "level": "Snadné",
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 0,
    "cook_time": 30,
    "time": 30,

    "priority": 3,
    "filters": [
      "Svačina",
      "Vegetariánské"
    ],
    "steps": [
      {
        "description": "Oloupejte mrkev, rozdělte na 3 části, poté každou podélně. Přidejte olej, koření, koriandr k mrkvi, promíchejte",
        "ingredientsIds": [],
      },
      {
        "description": "Na plech s pečicím papírem rozložte tenkou vrstvu nastrouhaného parmazánu. Pečte při 200° asi 20-25 min",
        "ingredientsIds": [],
        "duration": 1500
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Mrkev",
        "description": "",
        "quantity": 8,
      },
      {
        "id": 2,
        "title": "Parmazán",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Sůl",
      },
      {
        "id": 4,
        "title": "Uzená paprika",
      },
      {
        "id": 5,
        "title": "Cukr",
        "description": "",
        "quantity": 25,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Česnek",
      },
      {
        "id": 7,
        "title": "Chilli",
      },
      {
        "id": 8,
        "title": "Koriandr",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Olivový olej",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 10,
        "title": "Majonéza",
      },
      {
        "id": 11,
        "title": "Med",
      },
      {
        "id": 12,
        "title": "Pálivý olej",
        "description": "nebo chilli vločky"
      },
    ],
  },
  // Souffle palačinky
  {
    "id": 35,
    "title": "Souffle palačinky",
    "description": "Neuvěřitelně jemné souffle palačinky. Nadýchané s lehkou texturou. Japonská adaptace",
    "level": "Snadné",
    "region": "Japonsko",
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 15,
    "cook_time": 15,
    "time": 30,

    "instagram": "enjoy__taste",
    "priority": 2,
    "filters": [
      "Japonsko",
      "Snídaně"
    ],
    "steps": [
      {
        "description": "Oddělte bílky od žloutků a dejte je spolu s nádobou do lednice. Do žloutků přidejte vanilin, mléko, kukuřičný škrob, prášek do pečiva, sůl a prosátou mouku. Míchejte mixérem do hladka",
        "ingredientsIds": [],
      },
      {
        "description": "Vyjměte bílky, nalijte citronovou šťávu, šlehejte do měkké pěny. Postupně přidávejte cukr a šlehejte do tuhých vrcholů. Pokud otočíte nádobu vzhůru nohama, sníh by neměl kapat. Smíchejte trochu sněhu s těstem ze žloutků a teprve poté přidejte k bílkům. Jemně promíchejte stěrkou odspodu nahoru. Nemíchejte příliš dlouho, aby se bílky příliš nesnížily",
        "ingredientsIds": [],
      },
      {
        "description": "Přendejte těsto do cukrářského sáčku a vytlačte, jak je ukázáno ve videu. Nalijte lžíci vody, ihned přikryjte poklicí a vařte na mírném ohni 5-6 minut z jedné strany, otočte. Nalijte lžíci vody, přikryjte poklicí. Vařte asi 4-5 min",
        "ingredientsIds": [],
        "duration": 240
      },

    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Vejce",
        "description": "Velká",
        "quantity": 2,
        "unit": ""
      },
      {
        "id": 2,
        "title": "Vanilin",
        "quantity": 1,
      },
      {
        "id": 3,
        "title": "Mléko 2,5%",
        "quantity": 20,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Citronová šťáva",
        "quantity": 4,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Cukr",
        "description": "",
        "quantity": 25,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Mouka",
        "quantity": 25,
        "unit": "g"
      },
      {
        "id": 7,
        "title": "Kukuřičný škrob",
        "quantity": 10,
        "unit": "g"
      },
      {
        "id": 8,
        "title": "Prášek do pečiva",
        "quantity": 0.25,
        "unit": "lžičky"
      },
      {
        "id": 9,
        "title": "Sůl",
      },
    ],
  },
  // Pečený kapr
  {
    "id": 34,
    "title": "Pečený kapr",
    "description": "Připravte se na chuťovou senzaci! Představte si plátky čerstvé okurky obepínající krémové avokádo, pikantní rukolu a lahodného lososa. Srolované tyto ingredience vytvoří symfonii chutí. Nakrájejte rolku na malé kousky a získáte jednoduchou, chutnou a velmi sytou svačinu!",
    "level": "Snadné",
    "region": "Polsko",
    "servings": 2,
    "hasVideoSteps": true,
    "prep_time": 10,
    "cook_time": 30,
    "time": 45,
    "instagram": "inmykitchen_pl",
    "priority": 3,
    "filters": [
      "Oběd",
      "Večeře",
      "Ryba"
    ],
    "steps": [
      {
        "description": "Pór nakrájejte podélně a jemně nakrájejte. Na dno zapékací mísy nastrouhejte 1/3 studeného másla. Rozložte nakrájený pór nahoře. Osolte",
        "ingredientsIds": [],
      },
      {
        "description": "Nastrouhejte zbylé máslo. Poté naaranžujte kapra - předem rybu potřete solí a čerstvě mletým pepřem. Smíchejte hořčici a med. Potřete marinádou kapra. Pečte při 180°C asi 30 minut",
        "ingredientsIds": [],
        "duration": 1800
      },

    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Pór",
        "description": "Velký",
        "quantity": 1,
        "unit": ""
      },
      {
        "id": 2,
        "title": "Kapr",
        "description": "filet nebo porce",
        "quantity": 600,
        "unit": "g",
      },
      {
        "id": 3,
        "title": "Máslo",
        "description": "",
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Hořčice",
        "description": "",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 5,
        "title": "Med",
        "description": "",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 6,
        "title": "Sůl",
        "description": "dle chuti",
      },
      {
        "id": 7,
        "title": "Pepř",
        "description": "dle chuti",
      },
      {
        "id": 8,
        "title": "Citron",
        "description": "dle chuti",
        "quantity": 1,
      },
    ],
  },
  // Okurkové rolky
  {
    "id": 33,
    "title": "Okurkové rolky",
    "description": "Připravte se na chuťovou senzaci! Představte si plátky čerstvé okurky obepínající krémové avokádo, pikantní rukolu a lahodného lososa. Srolované tyto ingredience vytvoří symfonii chutí. Nakrájejte rolku na malé kousky a získáte jednoduchou, chutnou a velmi sytou svačinu!",
    "level": "Snadné",
    "region": "Asijská",
    "servings": 3,
    "hasVideoSteps": true,
    "prep_time": 0,
    "cook_time": 15,
    "time": 15,
    "iconColor": "white",

    "instagram": "liliyummy",
    "priority": 3,
    "filters": [
      "Oběd",
      "Večeře",
    ],
    "steps": [
      {
        "description": "Okurku nakrájejte na plátky pomocí škrabky na zeleninu, osušte papírovou utěrkou",
        "ingredientsIds": [],
      },
      {
        "description": "Namažte smetanovým sýrem, pokud si přejete. Rozložte proužky, jak je ukázáno ve videu, nahoře položte avokádo, lososa a rukolu. Srolujte do rolky",
        "ingredientsIds": [],
      },
      {
        "description": "Nakrájejte na kousky a ozdobte lososem",
        "ingredientsIds": [],
      },

    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Okurka",
        "description": null,
        "quantity": 1,
        "unit": ""
      },
      {
        "id": 2,
        "title": "Avokádo",
        "description": null,
        "quantity": 1,
        "unit": ""
      },
      {
        "id": 3,
        "title": "Rukola",
        "description": "nebo něco podobného",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Smetanový sýr",
        "description": "pokud si přejete",
        "quantity": 200,
        "unit": "g"
      },
    ],
  },
  // Letní asijský salát
  {
    "id": 32,
    "title": "Letní asijský salát",
    "description": "Ponořte se do asijské inspirace! Zažijte chuť tohoto lahodného salátu s opečeným hovězím masem, který je tak snadný na přípravu",
    "level": "Snadné",
    "region": "Asijská",
    "servings": 3,
    "hasVideoSteps": true,
    "prep_time": 10,
    "cook_time": 30,
    "time": 40,
    "iconColor": 'white',

    "instagram": "pardaev__",
    "priority": 3,
    "filters": [
      'Salát'
    ],
    "steps": [
      {
        "description": "Hovězí maso nakrájejte na tenké proužky, nalijte olej na pánev a maso smažte 5-7 minut do měkka. Posypte solí a mletým pepřem",
        "ingredientsIds": [],
        "duration": 300,
      },
      {
        "description": "Okurky, papriky a zelenou cibulku nakrájejte na proužky. Cibuli nakrájejte na půlkolečka a koriandr jemně nasekejte",
        "ingredientsIds": [],
      },
      {
        "description": " Všechny ingredience dejte do mísy, přidejte česnek, ocet, sójovou omáčku, sůl a cukr, promíchejte. Dobrou chuť",
        "ingredientsIds": [],
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Hovězí maso",
        "description": null,
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Okurka",
        "description": null,
        "quantity": 500,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Paprika",
        "description": null,
        "quantity": 300,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Cibule",
        "description": null,
        "quantity": 150,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Zelená cibulka",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }, {
        "id": 6,
        "title": "Koriandr",
        "description": "dle chuti",
        "quantity": 150,
        "unit": "g"
      },
      {
        "id": 7,
        "title": "Česnek",
        "description": null,
        "quantity": 3,
        "unit": "stroužky"
      },
      {
        "id": 8,
        "title": "Sójová omáčka",
        "description": null,
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Ocet",
        "description": "70%",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 10,
        "title": "Sůl",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      },
      {
        "id": 11,
        "title": "Cukr",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      },
      {
        "id": 12,
        "title": "Mletý pepř",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      },
    ],
  },
  // Domácí tyčinky Bounty
  {
    "id": 31,
    "title": "Domácí tyčinky Bounty",
    "description": "Snadno připravitelná pochoutka Domácí tyčinky Bounty jsou božskou směsí kokosu, kondenzovaného mléka a mléčné čokolády. Tropická pochoutka ideální chlazená jako osvěžující a lahodná svačina. Užijte si nebe v každém soustu!",

    "level": "Snadné",
    "servings": 2,
    "iconColor": 'white',

    "hasVideoSteps": true,
    "prep_time": 15,
    "cook_time": 15,
    "priority": 3,
    "time": 30,
    "filters": [
      "Dezert"
    ],
    "instagram": "noa.tasty",
    "steps": [
      {
        "description": "Smíchejte kokos, kondenzované mléko a vanilkový extrakt",
        "ingredientsIds": [1, 2, 3],
      },
      {
        "description": "S mírně vlhkýma rukama vytvořte tvary. Zmrazte na hodinu (vyložte pánev pečicím papírem, aby se tyčinky nepřilepily na talíř během mrazení)",
        "ingredientsIds": [1, 2, 3],
      },
      {
        "description": "Jemně nasekejte a rozpusťte čokoládu. Ponořte zmrazené tyčinky do čokolády, aby byly obalené.\n" +
            "Zbytek čokolády lze použít jako ozdobu nebo posyp.\n" +
            "Vraťte do mrazničky na asi půl hodiny a vychutnejte si.\n" +
            "Uchovávejte bounty v lednici nebo mrazáku",
        "ingredientsIds": [1, 2, 3, 4],
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Strouhaný kokos",
        "description": null,
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Kondenzované mléko",
        "description": null,
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Vanilkový extrakt",
        "description": null,
        "quantity": 0.5,
        "unit": "lžíce"
      },
      {
        "id": 4,
        "title": "Mléčná čokoláda",
        "description": null,
        "quantity": 100,
        "unit": "g"
      },
    ]
  },
  // Vepřová panenka v ořechové strouhance
  {
    "id": 29,
    "title": "Vepřová panenka v ořechové strouhance",
    "description": "Toto jídlo nabízí výbuch chutí - šťavnaté maso s ořechovou chutí doplněné náznaky česneku a hořčice. Překvapivě snadné na přípravu, tento recept se rychle stane oblíbeným",
    "servings": "4",
    "iconColor": 'white',
    "level": "Snadné",
    "region": "Itálie",
    "prep_time": 0,
    "cook_time": 15,
    "time": 15,
    "priority": 3,
    "hasVideoSteps": true,
    "instagram": "katarina_movchan",
    "filters": [
      "Ukrajina",
      "Vepřové",
      "Vánoce",
      "Večeře"
    ],
    "ingredients": [
      {"title": "Vepřové panenky", "quantity": 2, "description": "1 kg"},
      {"title": "Sušený česnek", "quantity": 2, "unit": 'lžíce',},
      {"title": "Hořčice", "quantity": 2, "unit": 'lžíce', "description": "Vezměte ne pálivou"},
      {"title": "Vlašské ořechy", "quantity": 150, "unit": 'g'},
      {"title": "Sůl", "description": "dle chuti"},
      {"title": "Pepř", "description": "dle chuti"},
      {"title": "Olivový olej", "description": "dle chuti"}
    ],
    "steps": [
      {"description": "Panenku očistěte od tuku a blan. Potřete panenku solí, pepřem a sušeným česnekem"},
      {"description": "Na pánvi rozehřejte olej a opečte panenku, dokud není ze všech stran dozlatova. Smažte na vysokém ohni"},
      {"description": "Opečené maso potřete ze všech stran hořčicí a obalte v ořechové strouhance"},
      {"description": "Pečte v troubě 15 minut (180 stupňů)", "duration": 900},
    ]
  },
  {
    "id": 28,
    "title": "Zázvorové crinkles",
    "description": "Čokoládové crinkles byly základním prvkem na našich vánočních hostinách již několik let. Jsou jednoduché, rychlé, krásné a velmi chutné. Ačkoliv milujeme ty čokoládové, letos jsem chtěla změnu, takže jsem zvolila novou, perníčkovou verzi",
    "servings": "5",
    "level": "Snadné",
    "region": "",
    "iconColor": 'white',
    "prep_time": 120,
    "cook_time": 20,
    "time": 140,
    "filters": [
      'Vánoce',
      "Dezert"
    ],
    "priority": 2,
    "hasVideoSteps": true,
    "free": false,
    "ingredients": [
      {"title": "Hladká mouka", "quantity": 280, "unit": "g"},
      {"title": "Perníkové koření", "quantity": 3, "unit": "lžičky"},
      {"title": "Prášek do pečiva", "quantity": 1, "unit": "lžička"},
      {"title": "Cukr", "quantity": 150, "unit": "g"},
      {"title": "Máslo", "quantity": 90, "unit": "g"},
      {"title": "Vejce", "quantity": 2}
    ],
    "steps": [
      {"description": "Mouku prosejte do mísy, přidejte koření a prášek do pečiva. Smíchejte směs a prosejte do větší mísy. Poté přidejte cukr a znovu promíchejte"},
      {"description": "Do suché směsi rozklepněte vejce a přidejte změklé máslo. Tyto ingredience ručně zpracujte do kompaktního těsta, které vložíte do mikrotenového sáčku a necháte v lednici alespoň 2 hodiny (ale nejlépe do druhého dne)"},
      {
        "description": "Nyní přistupte k výrobě sušenek. Vezměte malé kousky vychlazeného těsta a vytvarujte je do kuliček. Položte na dva plechy vyložené pečicím papírem. Dejte do trouby předehřáté na 180 °C a pečte 12 minut",
        "duration": 720
      },
    ]
  },
  {
    "id": 27,
    "title": "Bramborový gratin Dauphinois",
    "description": "Předvaření brambor pomáhá zajistit, že budou po upečení zcela uvařené a měkké. Použití syrových brambor by výrazně prodloužilo dobu vaření, což by mohlo vést k příliš opečenému sýru dříve, než budou brambory měkké",
    "servings": 4,
    "iconColor": 'white',
    "level": "Snadné",
    "region": "",
    "prep_time": 0,
    "cook_time": 60,
    "filters": [
      'Večeře',
      'Vánoce',
    ],
    "time": 60,
    "priority": 3,
    "hasVideoSteps": true,
    "instagram": "chefsofiaa",
    "ingredients": [
      {"title": "Brambory", "quantity": 1000, "unit": "g"},
      {"title": "Mléko", "quantity": 350, "unit": "g"},
      {"title": "Smetana ke šlehání", "quantity": 150, "unit": "g"},
      {"title": "Muškátový oříšek", "description": "dle chuti", "quantity": 0.3, "unit": "lžíce"},
      {"title": "Sůl", "description": "dle chuti"},
      {"title": "Pepř", "description": "dle chuti"},
      {"title": "Snítky tymiánu"},
      {"title": "Stroužky česneku", "quantity": 3, "unit": "stroužky"},
      {"title": "Máslo", "description": "trochu na vymazání formy"},
      {"title": "Tvrdý sýr", "description": "váš oblíbený", "quantity": 100, "unit": "g"},
      {"title": "Sýr Gruyère", "quantity": 150, "unit": "g"}
    ],
    "steps": [
      {"description": "Oloupejte a nakrájejte brambory na tenké plátky. Do hrnce nalijte mléko a smetanu. Přidejte stroužky česneku, nastrouhaný muškátový oříšek a snítky tymiánu"},
      {
        "description": "Přiveďte k varu na mírném ohni. Přidejte brambory do zahřáté smetanové směsi. Dusíme 6-7 minut, občas promícháme, dokud nejsou brambory částečně uvařené",
        "duration": 420
      },
      {"description": "Předehřejte troubu na 180°C a vymažte zapékací misku máslem. Vyjměte část brambor z hrnce a naaranžujte je do zapékací misky. Posypte trochou nastrouhaného tvrdého sýra. Opakujte, dokud nevyužijete všechny brambory, a zakončete vrstvou sýra"},
      {"description": "Vložte do trouby a pečte 25-30 minut, dokud není sýr zlatavý", "duration": 1800}
    ],
  },
  {
    "id": 26,
    "title": "Bramborové placky se sýrem",
    "description": "Lahodné bramborové placky plněné rozpuštěným sýrem mozzarella, servírované křupavé zvenku a měkké uvnitř",
    "servings": 3,
    "level": "Snadné",
    "region": "",
    "prep_time": 0,
    "cook_time": 20,
    "time": 20,
    "filters": [
      'Snídaně',
      'Dezert'
    ],
    "priority": 3,
    "hasVideoSteps": true,
    "ingredients": [
      {
        "title": "Brambory",
        "quantity": 2,
        "unit": "ks"
      },
      {
        "title": "Mouka",
        "quantity": 100,
        "unit": "g"
      },
      {
        "title": "Sůl",
        "quantity": "dle chuti",
        "unit": null
      },
      {
        "title": "Pepř",
        "quantity": "dle chuti",
        "unit": null
      },
      {
        "title": "Sýr mozzarella",
        "quantity": null,
        "unit": null
      },
      {
        "title": "Olivový olej",
        "quantity": null,
        "unit": null
      }
    ],
    "steps": [
      {
        "description": "Oloupejte brambory a nakrájejte je na kostičky. Uvařte je v hrnci s vodou, dokud nejsou měkké"
      },
      {
        "description": "Uvařené brambory rozmačkejte a dochuťte solí a pepřem. Dobře promíchejte. Přidejte mouku a vytvořte těsto"
      },
      {
        "description": "Pracovní plochu posypte moukou. Těsto rozdělte na malé kuličky. Každou kuličku zploštěte, doprostřed vložte sýr mozzarella a okraje uzavřete, vytvarujte placičky"
      },
      {
        "description": "Na pánvi rozehřejte olivový olej. Bramborové placky smažte z obou stran, dokud nezískají zlatavou barvu. Podávejte křupavé bramborové placky se zakysanou smetanou a oblíbenými bylinkami"
      },
    ]
  },
  {
    "id": 25,
    "title": "Pečená mini dýně se sýrem",
    "description": "Chutný pokrm z pečené mini dýně plněné krémovou směsí sýra Mont d'Or nebo Camembert",
    "servings": 2,
    "level": "Středně pokročilý",
    "region": "",
    "prep_time": 10,
    "cook_time": 20,
    "filters": [
      'Večeře'
    ],
    "time": 30,
    "priority": 2,
    "iconColor": 'white',
    "hasVideoSteps": true,
    "free": true,
    "ingredients": [
      {
        "title": "Mini dýně",
        "quantity": 1,
        "unit": null
      },
      {
        "title": "Sýr Camembert",
        "quantity": 250,
        "description": 'nebo Mont d’Or',
        "unit": "g"
      },
      {
        "title": "Česnek",
        "quantity": 1,
        "unit": "stroužek"
      },
      {
        "title": "Bílé víno",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "title": "Chléb",
        "description": 'k podávání',
        "quantity": null,
        "unit": null
      },
      {
        "title": "Ořechy",
        "quantity": 30,
        "unit": 'g',
      },
      {
        "title": "Sůl",
        "quantity": null,
        "unit": null
      },
      {
        "title": "Olivový olej",
        "quantity": null,
        "unit": null
      }
    ],
    "steps": [
      {
        "description": "Vydlabejte dýni, poté přidejte sůl a trochu olivového oleje a pečte 35 minut při 180 stupních",
        "duration": 2100
      },
      {
        "description": " Přidejte sýr, česnek, víno do pečené dýně a dejte do trouby na 10 minut při 180 stupních",
        "duration": 600
      },
      {
        "description": "Vyjměte z trouby a přidejte ořechy, pokud si přejete. Podávejte s chlebem"
      },
    ]
  },
  {
    "id": 24,
    "title": "Jemné sladké rizoto s křupavou slaninou",
    "description": "Jemné sladké rizoto kombinované s křupavou uzenou slaninou",
    "level": "Středně pokročilý",
    "hasVideoSteps": true,
    "iconColor": 'white',
    "servings": 4,
    "filters": [
      'Rizoto',
      'Oběd',
      'Večeře',
      'Těstoviny',
    ],
    "prep_time": 5,
    "cook_time": 45,
    "time": 50,
    "priority": 2,
    "steps": [
      {
        "description": "Pokud si připravujete dýňové pyré sami, vezměte dýni, oloupejte ji, nakrájejte na malé kostičky. Dejte do formy, pokapejte olivovým olejem a pečte 30-35 minut při 200 °C. Pomocí vidličky nebo ponorného mixéru směs rozmixujte na pyré",
        "ingredientsIds": [2]
      },
      {
        "description": "Slaninu jemně nakrájejte, dejte ji na studenou pánev a zahřejte, míchejte, dokud se nevypeče všechen tuk a slanina není křupavá. Slaninu odložte stranou, v pánvi nechte veškerý tuk",
        "ingredientsIds": [1]
      },
      {
        "description": "Do stejné pánve dejte jemně nakrájenou cibuli a česnek, zahřívejte 2-3 minuty. Přidejte nepropláchnutou rýži a smažte, neustále míchejte, dokud není průsvitná. Přilijte víno, nechte ho zcela odpařit. Poté přidejte dýňové pyré, sůl a postupně přilévejte vodu. Vařte bez poklice, stále míchejte. Přidejte více vody podle potřeby",
        "ingredientsIds": [4, 5, 3, 6, 2, 10, 7],
        "duration": 180
      },
      {
        "description": "Když je rýže téměř hotová, přidejte máslo a nastrouhaný parmazán",
        "ingredientsIds": [3, 8, 9]
      },
      {
        "description": "Podávejte s křupavou slaninou",
        "ingredientsIds": [1]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Slanina",
        "description": null,
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Dýňové pyré",
        "description": "nebo čerstvá dýně",
        "quantity": 1,
        "unit": "hrnek"
      },
      {
        "id": 3,
        "title": "Rýže Arborio",
        "description": null,
        "quantity": 1,
        "unit": "hrnek"
      },
      {
        "id": 4,
        "title": "Cibule",
        "description": "1/2 cibule",
        "quantity": null,
        "unit": null
      },
      {
        "id": 5,
        "title": "Česnek",
        "description": "1 stroužek",
        "quantity": null,
        "unit": null
      },
      {
        "id": 6,
        "title": "Bílé víno",
        "description": "volitelně",
        "quantity": "1/2",
        "unit": "hrnku"
      },
      {
        "id": 7,
        "title": "Voda",
        "description": "nebo horký vývar",
        "quantity": 4,
        "unit": "hrnky"
      },
      {
        "id": 8,
        "title": "Máslo",
        "description": null,
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Parmazán",
        "description": null,
        "quantity": "1/2",
        "unit": "hrnku"
      },
      {
        "id": 10,
        "title": "Sůl",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 11,
        "title": "Pepř",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }
    ],
  },
  {
    "id": 22,
    "title": "Kukuřice s citronovou omáčkou",
    "description": "Zažijte výbuch chutí s tímto úžasným receptem na kukuřici. Spárován s lákavou citronovou omáčkou je to skvělý způsob, jak si vychutnat jednoduché, ale živé jídlo. Uzená a pálivá paprika spolu s bohatostí másla dodává kukuřici lahodnou chuť, zatímco citronová omáčka poskytuje osvěžující kyselost",
    "tip": "Máslo je doporučeno pro bohatší chuť, ale olivový olej může být zdravější náhradou. Spárujte s nastrouhaným parmazánem pro lahodný sýrový nádech",
    "level": "Snadné",
    "region": "",
    "servings": 3,
    "prep_time": 10,
    "cook_time": 15,
    "time": 25,
    "priority": 3,
    "hasVideoSteps": true,
    "free": true,
    "filters": [
      "Vegetariánské",
      "Svačina",
    ],
    "steps": [
      {
        "description": "Oloupejte kukuřici a podélně rozdělte na čtvrtiny",
        "ingredientsIds": [1],
      },
      {
        "description": "V misce smíchejte máslo a koření (sůl, pepř, uzená paprika, sušený česnek, pálivá paprika) a rozehřejte v mikrovlnné troubě, aby se máslo rozpustilo" +
            "Položte kukuřici na plech a bohatě potřete máslovou směsí" +
            "\n Pečte v troubě při 190° po dobu 12-15 minut",
        "ingredientsIds": [1, 2, 3, 4, 5, 6, 7],
        "duration": 720
      },
      {
        "description": "V kastrůlku smíchejte zakysanou smetanu, jemně nasekanou petržel a citronovou šťávu. Podávejte s nastrouhaným parmazánem",
        "ingredientsIds": [8, 9, 10, 11]
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Kukuřičné klasy",
        "description": null,
        "quantity": 3,
        "unit": "ks"
      },
      {
        "id": 2,
        "title": "Máslo",
        "description": "Lze nahradit olivovým olejem",
        "quantity": 80,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Sůl",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 4,
        "title": "Pepř",
        "description": null,
        "quantity": 0.5,
        "unit": "lžičky"
      },
      {
        "id": 5,
        "title": "Uzená paprika",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 6,
        "title": "Sušený česnek",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 7,
        "title": "Pálivá paprika",
        "description": null,
        "quantity": 0.5,
        "unit": "lžičky"
      },
      {
        "id": 8,
        "title": "Zakysaná smetana",
        "description": null,
        "quantity": 3,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Petržel",
        "description": "svazek, jemně nasekaná",
        "quantity": null,
        "unit": null
      },
      {
        "id": 10,
        "title": "Citronová šťáva",
        "description": null,
        "quantity": null,
        "unit": null
      },
      {
        "id": 11,
        "title": "Parmazán",
        "description": "nastrouhaný, volitelně",
        "quantity": null,
        "unit": null
      }
    ]
  },
  {
    "id": 18,
    "title": "Špagety Carbonara",
    "description": "Tento ikonický pokrm římské kuchyně, Špagety Carbonara, patří mezi nejznámější recepty na těstoviny na světě, ceněný pro svou jednoduchost a vysoce kvalitní ingredience, které používá. Držící se autentického italského receptu, spoléhá se pouze na pět klíčových ingrediencí, čímž přináší pokrm, který je jednoduchý na přípravu a zároveň lahodný k ochutnání. Řiďte se tímto receptem, abyste se vyhnuli běžným chybám a dosáhli dokonalé carbonary, která dosáhne jemné rovnováhy – vyhněte se tomu, aby vejce byla příliš míchaná nebo příliš syrová.\n\nNEPOUŽÍVEJTE česnek, petržel, cibuli, smetanu, mléko, parmazán, pancettu nebo slaninu v tomto receptu",
    "tip": "Dodržování kvality a autenticity ingrediencí je klíčem k úspěchu tohoto receptu. Také zvládnutí konzistence vajec je zásadní: neměla by připomínat míchaná vejce ani být syrová a studená",
    "hasVideoSteps": true,
    "free": true,
    "level": "Středně pokročilý",
    "priority": 0,
    "region": "Itálie",
    "servings": 4,
    "prep_time": 20,
    "cook_time": 10,
    "time": 30,
    "filters": [
      "Itálie",
      "Oběd",
      "Večeře",
      "Těstoviny",
    ],
    "steps": [
      {
        "description": "Guanciale nakrájejte na malé kousky (kostky, plátky... jak preferujete) a vařte na pánvi na středním ohni asi 2 až 3 minuty. Guanciale by měl být dostatečně tučný a olejnatý, takže není potřeba přidávat další olej. Upravit úroveň vaření podle vaší preference",
        "ingredientsIds": [2],
        "duration": 120
      },
      {
        "description": "V misce smíchejte vejce (2 celá, 2 pouze žloutky) a sýr Pecorino Romano k vytvoření krémové omáčky. Použijte pouze žloutky a vyhněte se přidávání soli. Rychle vyšlehejte vidličkou nebo ručním šlehačem",
        "ingredientsIds": [3, 4]
      },
      {
        "description": "Do směsi vajec a sýra přidejte část uvařeného guanciale a čerstvě mletý černý pepř a lehce promíchejte",
        "ingredientsIds": [2, 5]
      },
      {
        "description": "S vroucí vodou přidejte sůl a vařte špagety (al dente, 4/5 doby uvedené na balení). Jakmile jsou hotové, smíchejte špagety s guanciale na pánvi, přidejte připravenou omáčku a naběračku vody z vaření těstovin. Vše dobře promíchejte a ihned podávejte",
        "ingredientsIds": [1, 6]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Špagety",
        "description": "",
        "quantity": 350,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Guanciale",
        "description": null,
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Vejce",
        "description": "Střední, celá",
        "quantity": 4,
        "unit": "ks"
      },
      {
        "id": 4,
        "title": "Pecorino Romano",
        "description": "Strouhaný, doporučen autentický italský Pecorino Romano DOP",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Černý pepř",
        "description": "Mletý",
        "quantity": null,
        "unit": null
      },
      {
        "id": 6,
        "title": "Sůl",
        "description": "Pro vodu na těstoviny",
        "quantity": null,
        "unit": null
      }
    ]
  },
  {
    "id": 16,
    "title": "Turecká vejce (Çılbır)",
    "description": "Zažijte klasický turecký snídaňový pokrm, Çılbır, lahodnou směs pošírovaných vajec na lůžku z česnekového jogurtu, přelité pikantním máslem a podávané s křupavým opečeným chlebem. Tento recept přináší rovnováhu mezi pálivostí z pálivé papriky a krémovou texturou řeckého jogurtu, což z něj dělá nezbytnost pro bohatý a pikantní začátek vašeho dne",
    "tip": "Použití čerstvých vajec usnadní pošírování. Chléb můžete opéct podle vaší preference, od mírně opečeného po křupavý",
    "level": "Snadné",
    "region": "Turecko",
    "servings": 1,
    "priority": 3,
    "prep_time": 10,
    "cook_time": 10,
    "time": 20,
    "hasVideoSteps": true,
    "filters": [
      "Turecko",
      "Snídaně",
      "Pikantní"
    ],
    "steps": [
      {
        "description": "Nakrájejte chléb, pokapejte olivovým olejem a osušte na suché pánvi z obou stran",
        "ingredientsIds": [7, 8]
      },
      {
        "description": "Do jogurtu přidejte nasekaný česnek a sůl a promíchejte",
        "ingredientsIds": [1, 2, 3]
      },
      {
        "description": "Rozklepněte vejce do jemného síta, abyste se zbavili albuminu. Do vroucí vody přidejte ocet, metličkou vytvořte vír a vejce pomalu vlijte blízko vody. Vařte asi 3 minuty",
        "ingredientsIds": [6, 9],
        "duration": 180
      },
      {
        "description": "Rozpusťte máslo, přidejte olivový olej a pálivou papriku, dobře promíchejte a odstraňte z tepla",
        "ingredientsIds": [4, 5, 8]
      },
      {
        "description": "Na talíř nejprve rovnoměrně rozetřete jogurt, poté vejce, přelijte vše horkým máslem, ozdobte koprem a černým pepřem. Podávejte s opečeným chlebem",
        "ingredientsIds": [1, 6, 10, 11]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Řecký jogurt",
        "description": "Pokojová teplota",
        "quantity": 200,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Česnek",
        "description": null,
        "quantity": 1,
        "unit": "stroužek"
      },
      {
        "id": 3,
        "title": "Sůl",
        "description": null,
        "quantity": 1,
        "unit": "špetka"
      },
      {
        "id": 4,
        "title": "Máslo",
        "description": null,
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 5,
        "title": "Pálivá paprika",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 6,
        "title": "Vejce",
        "description": null,
        "quantity": 2,
        "unit": "ks"
      },
      {
        "id": 7,
        "title": "Chléb",
        "description": "K podávání",
        "quantity": null,
        "unit": null
      },
      {
        "id": 8,
        "title": "Olivový olej",
        "description": null,
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Ocet",
        "description": "Volitelně",
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 10,
        "title": "Kopr",
        "description": "Na ozdobu",
        "quantity": null,
        "unit": null
      },
      {
        "id": 11,
        "title": "Černý pepř",
        "description": "Na ozdobu",
        "quantity": null,
        "unit": null
      }
    ]
  },
  {
    "id": 15,
    "title": "Orzo těstoviny s rajčaty",
    "description": "Rychlý a chutný těstovinový pokrm, který se vaří v jedné pánvi. S kombinací cherry rajčat, smetany a sýrů tento pokrm jistě potěší vaše chuťové pohárky",
    "tip": "Sledujte dobu vaření těstovin orzo, protože se může lišit v závislosti na značce",
    "hasVideoSteps": true,
    "priority": 2,
    "level": "Snadné",
    "region": "Středomoří",
    "servings": 4,
    "prep_time": 10,
    "cook_time": 10,
    "time": 20,
    "filters": [
      'Oběd',
      'Večeře',
      'Těstoviny',
    ],
    "steps": [
      {
        "description": "Na pánvi rozehřejte olivový olej, vymačkejte česnek, mírně zahřejte",
        "ingredientsIds": [3]
      },
      {
        "description": "Cherry rajčata rozkrojte na poloviny a přidejte je k česneku. Ochuťte solí a pepřem. Přidejte těstoviny, nalijte vodu a smetanu. Přikryjte poklicí a vařte 5 minut",
        "ingredientsIds": [2, 6, 1, 4, 5],
        "duration": 300
      },
      {
        "description": "Posypte nastrouhaným sýrem, promíchejte a přidejte bazalku",
        "ingredientsIds": [7, 8, 9]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Těstoviny Orzo",
        "description": null,
        "quantity": 1,
        "unit": "hrnek"
      },
      {
        "id": 2,
        "title": "Cherry rajčata",
        "description": null,
        "quantity": 1,
        "unit": "hrnek"
      },
      {
        "id": 3,
        "title": "Česnek",
        "description": null,
        "quantity": 3,
        "unit": "stroužky"
      },
      {
        "id": 4,
        "title": "Smetana 15%",
        "description": null,
        "quantity": 0.5,
        "unit": "hrnku"
      },
      {
        "id": 5,
        "title": "Voda",
        "description": "vařící voda",
        "quantity": 1,
        "unit": "hrnek"
      },
      {
        "id": 6,
        "title": "Koření",
        "description": "Sůl, pepř a volitelné chilli vločky, dle chuti",
        "quantity": null,
        "unit": ""
      },
      {
        "id": 7,
        "title": "Parmazán",
        "description": null,
        "quantity": 1,
        "unit": "hrst"
      },
      {
        "id": 8,
        "title": "Mozzarella",
        "description": null,
        "quantity": 1,
        "unit": "hrst"
      },
      {
        "id": 9,
        "title": "Čerstvá bazalka",
        "description": null,
        "quantity": "pár",
        "unit": "listů"
      }
    ]
  },
  {
    "id": 21,
    "title": "Insalata Caprese",
    "region": "Itálie, Kampánie",
    "description": "Nadčasová klasika, salát Caprese je typický letní pokrm v Itálii. Legenda říká, že tento typický letní pokrm vznikl během 50. let 20. století v jižní oblasti Kampánie na ostrově Capri, odtud název caprese. Lehký na chuť a snadný na přípravu, klíčem k tomuto salátu je použití nejkvalitnějších ingrediencí, které můžete najít, zejména rajčat, která by měla být na vrcholu zralosti!",
    "servings": 6,
    "prep_time": 10,
    "cook_time": 5,
    "free": true,
    "hasVideoSteps": true,
    "priority": 3,
    "time": 15,
    "level": "Snadné",
    "filters": [
      'Itálie',
      'Vegetariánské',
      'Bez lepku',
      'Salát',
      'Předkrmy'
    ],
    "steps": [
      {
        "description": "Přidejte rajčata s mozzarellou. Odtrhněte bazalku a položte ji na vrch každé porce. Osolte a opepřete podle chuti, poté přelijte olivovým olejem a balsamikovým octem",
        "ingredientsIds": [],
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Čerstvá mozzarella",
        "description": null,
        "quantity": 250,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Rajčata",
        "description": null,
        "quantity": 600,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Balsamikový ocet",
        "description": null,
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 4,
        "title": "Bazalka",
        "description": "listy oddělené",
        "quantity": 1,
        "unit": "malý svazek"
      },
      {
        "id": 5,
        "title": "Extra panenský olivový olej",
        "description": null,
        "quantity": 6,
        "unit": "lžíce"
      },
      {
        "id": 6,
        "title": "Sůl",
        "description": "špetka",
        "quantity": null,
        "unit": null
      },
      {
        "id": 7,
        "title": "Pepř",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }
    ]
  },
  {
    "id": 7,
    "title": "Rajčatový tatarák",
    "description": "Inovativní kombinace jemně nasekaných konzervovaných rajčat a sýra feta, tento rajčatový tatarák je krásným a chutným předkrmem nebo aperitivem. Jako hvězdná ingredience zde opravdu záleží na kvalitě konzervovaných rajčat",

    "level": "Snadné",
    "region": "Itálie",
    "servings": 4,
    "cook_time": 0,
    "prep_time": 15,
    "priority": 2,
    "time": 15,
    "filters": [
      'Itálie',
      'Předkrmy',
    ],
    "steps": [
      {
        "description": "Celou plechovku rajčat nalijte do jemného cedníku a nechte odkapat alespoň 6 hodin nebo přes noc. Jemně nasekejte kapary, olivy, bazalku, petržel a smíchejte je s okapanými rajčaty a olivovým olejem. Osolte a opepřete podle chuti",
        "ingredientsIds": [1, 2, 3, 4, 5, 6, 7]
      },
      {
        "description": "Pomocí kulaté formy vytvořte čtyři disky z nakrájeného sýra. Poté na sýr pomocí formy navršte rajčatovou směs. Nahoru položte kostku sýra feta a ozdobte křupavým parmazánem (pokud si přejete), kapary a pokapejte olivovým olejem a balsamikovým octem",
        "ingredientsIds": [5, 8, 9, 10, 11]
      },
      {
        "description": "Buon appetito!",
        "ingredientsIds": []
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Rajčata",
        "description": "jemně nasekaná",
        "quantity": 400,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Malé kapary",
        "description": "okapané, pokud jsou v nálevu; opláchnuté, pokud jsou solené",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 3,
        "title": "Černé olivy",
        "description": "",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 4,
        "title": "Sýr Pecorino",
        "description": "silné plátky",
        "quantity": 4,
        "unit": "plátky"
      },
      {
        "id": 5,
        "title": "Sýr Feta",
        "description": "nakrájený na velké kostky",
        "quantity": 150,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Extra panenský olivový olej",
        "description": "",
        "quantity": 3,
        "unit": "lžíce"
      },
      {
        "id": 7,
        "title": "Čerstvé bylinky",
        "description": "1/3 šálku listů bazalky, 1/3 šálku petržele",
        "quantity": 1,
        "unit": "šálek"
      },
      {
        "id": 8,
        "title": "Parmazánové křupky",
        "description": "Volitelné pro ozdobu",
        "quantity": null,
        "unit": null
      },
      {
        "id": 9,
        "title": "Balsamikový ocet",
        "description": "Volitelné pro ozdobu",
        "quantity": null,
        "unit": null
      },
      {
        "id": 10,
        "title": "Sůl",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      },
      {
        "id": 11,
        "title": "Pepř",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }
    ]
  },

  // Pasta
  {
    "id": 12,
    "title": "Rigatoni s rajčatovou omáčkou",
    "description": "Klasický italský těstovinový pokrm s bohatou rajčatovou omáčkou, obohacený máslem, parmazánem a aromatickou bazalkou",
    "tip": "Pro nejlepší chuť použijte vysoce kvalitní olivový olej a čerstvě nastrouhaný parmazán. Množství vody z těstovin upravte tak, abyste dosáhli požadované konzistence omáčky",
    "iconColor": 'white',

    "level": "Středně pokročilý",
    "region": "Itálie",
    "servings": 2,
    "prep_time": null,
    "cook_time": 20,
    "time": 20,
    "hasVideoSteps": true,
    "priority": 2,
    "filters": [
      "Itálie",
      "Oběd",
      "Večeře",
      "Těstoviny",
    ],
    "steps": [
      {
        "description": "Do rozehřáté pánve přidejte česnek a olivový olej, dokud se olej nezačne vařit",
        "ingredientsIds": [5, 7]
      },
      {
        "description": "Na vysokou teplotu osmažte datlová rajčata v dostatečném množství olivového oleje a česneku",
        "ingredientsIds": [2, 7, 5]
      },
      {
        "description": "Když jsou rajčata téměř rozpuštěná, rozmačkejte je vidličkou nebo šťouchadlem na brambory a vyjměte z pánve",
        "ingredientsIds": [2, 7, 5]
      },
      {
        "description": "Ve stejné pánvi se zbylými rajčaty dusíme rajčatový protlak asi 25 minut",
        "ingredientsIds": [3],
        "duration": 1500
      },
      {
        "description": "Uvařte rigatoni a po asi 8 minutách je přidejte do omáčky na pánvi s trochou vody z těstovin",
        "ingredientsIds": [1, 9],
        "duration": 480
      },
      {
        "description": "Přidejte máslo a nechte ho rozpustit. Nyní přidejte dušená rajčata a ještě trochu olivového oleje",
        "ingredientsIds": [6, 2, 7]
      },
      {
        "description": "Když jsou těstoviny al dente, vypněte oheň a přidejte nastrouhaný parmazán. Vše dobře promíchejte",
        "ingredientsIds": [1, 4]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Rigatoni",
        "description": null,
        "quantity": 300,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Cherry rajčata",
        "description": null,
        "quantity": 250,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Rajčatový protlak",
        "description": null,
        "quantity": 300,
        "unit": "ml"
      },
      {
        "id": 4,
        "title": "Parmazán",
        "description": null,
        "quantity": 60,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Česnek",
        "description": null,
        "quantity": 2,
        "unit": "stroužky"
      },
      {
        "id": 6,
        "title": "Máslo",
        "description": null,
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 7,
        "title": "Olivový olej",
        "description": null,
        "quantity": null,
        "unit": null
      },
      {
        "id": 8,
        "title": "Bazalka",
        "description": null,
        "quantity": null,
        "unit": null
      },
      {
        "id": 9,
        "title": "Voda z těstovin",
        "description": "2-3 naběračky",
        "quantity": null,
        "unit": null
      }
    ]
  },
  // Spaghetti al Pomodoro
  {
    "id": 8,
    "title": "Špagety al Pomodoro",
    "description": "Nejslavnější italský recept, špagety al pomodoro, je připraven z několika jednoduchých ingrediencí, chutná lahodně a je snadný na přípravu",

    "level": "Snadné",
    "region": "Itálie",
    "servings": 4,
    "cook_time": 25,
    "priority": 2,
    "time": 25,
    "filters": [
      'Itálie',
      'Těstoviny',
      'Vegetariánské',
    ],
    "steps": [
      {
        "description": "Rozdrťte rajčata mezi prsty a nechte je spadnout do hrnce. Přimíchejte rajčatovou šťávu, olivový olej a osolte mořskou solí podle chuti",
        "ingredientsIds": [1, 2]
      },
      {
        "description": "Pro vaření těstovin přiveďte k varu velký hrnec vody. Když voda dosáhne varu, přidejte hrst košer soli, dokud není voda slaná. Přidejte špagety a vařte 11 minut. Pomocí děrované lžíce přendejte těstoviny do hrnce s rajčaty",
        "ingredientsIds": [3, 4],
        "duration": 660
      },
      {
        "description": "Přidejte půl šálku vody z těstovin a vše promíchejte na středním ohni asi 1 minutu",
        "ingredientsIds": [],
        "duration": 60
      },
      {
        "description": "Rozdělte špagety do čtyř vyhřátých misek. Pokapejte olivovým olejem a přidejte snítku čerstvé bazalky. Ihned podávejte",
        "ingredientsIds": [2, 5]
      },
      {
        "description": "Buon appetito!",
        "ingredientsIds": []
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Špagety",
        "description": "",
        "quantity": 500,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Rajčata",
        "description": "",
        "quantity": 700,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Extra panenský olivový olej",
        "description": "",
        "quantity": 0.25,
        "unit": "šálek"
      },
      {
        "id": 4,
        "title": "Mořská sůl",
        "description": "",
        "quantity": 1.5,
        "unit": "lžičky"
      },
      {
        "id": 5,
        "title": "Čerstvá bazalka",
        "description": "",
        "quantity": 4,
        "unit": "snítky"
      },
      {
        "id": 6,
        "title": "Sůl",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }
    ]
  },
  // Spaghetti Cacio e Pepe Recipe
  {
    "id": 5,
    "title": "Špagety Cacio e Pepe",
    "region": "Itálie, Lazio",
    "tip": "Cacio e pepe znamená \"sýr a pepř\" v několika středoitalských dialektech",
    "description": "Bohatý sýr, bronzem tažené těstoviny a čerstvě mletý pepř — ultimátní pohodlné jídlo, špagety cacio e pepe je jednoduchý římský pokrm, který závisí na kvalitě jen několika ingrediencí",

    "level": "Snadné",
    "servings": 6,
    "prep_time": 0,
    "cook_time": 25,
    "time": 25,
    "priority": 0,
    "hasVideoSteps": true,
    "free": false,
    "filters": [
      'Itálie',
      'Oběd',
      'Večeře',
      'Těstoviny',
    ],
    "steps": [
      {
        "description": "Připravte pánev s máslem a pepřem. Přiveďte velký hrnec s vodou a 2 lžícemi soli k varu. Vařte špagety al dente (4/5 doby vaření). Zapněte hrnec na mírném ohni. Rychle přendejte špagety do pánve (Pamatujte, voda a horký olej mohou vystřelit!)",
        "ingredientsIds": [1, 2],
        "duration": 540
      },
      {
        "description": "Přidávejte horkou vodu z hrnce a sýr po troškách, míchejte, dokud omáčka nezhoustne na požadovanou konzistenci, dochuťte pepřem",
        "ingredientsIds": [4, 5]
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Špagety",
        "description": "",
        "quantity": 450,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Sůl",
        "description": "",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 3,
        "title": "Celý černý pepř",
        "description": "více dle chuti",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 4,
        "title": "Sýr Pecorino Romano",
        "description": "čerstvě nastrouhaný, dle chuti",
        "quantity": 1.5,
        "unit": "šálky"
      },
      {
        "id": 5,
        "title": "Horká voda",
        "description": "dle chuti",
        "quantity": null,
        "unit": null
      }
    ]
  },
  // Soups
  // Brodo di Parmigiano Reggiano
  {
    "id": 11,
    "title": "Brodo di Parmigiano Reggiano (Parmazánový vývar)",
    "description": "Prodlužte životnost svého Parmigiano Reggiano s naším jednoduchým parmazánovým vývarem. Použijte tento bohatý recept pro plněné těstoviny v brodu nebo prohlubte svou další polévku tímto základem!",
    "region": "Itálie",

    "level": "Snadné",
    "servings": null,
    "prep_time": 120,
    "cook_time": null,
    "priority": 3,
    "time": 120,
    "filters": [
      'Itálie',
      'Polévka',
      'Vývar'
    ],
    "steps": [
      {
        "description": "Ve velkém hrnci zahřejte velkorysé pokapání extra panenského olivového oleje na vysokém ohni. Přidejte mrkev, cibuli a celer, bohatě je osolte a občas promíchejte, pokračujte ve vaření na vysokém ohni. Nechte mrkev zezlátnout a cibuli zprůhlednit během tohoto procesu",
        "ingredientsIds": [1, 2, 3]
      },
      {
        "description": "Zeleninu zalijte studenou vodou, přidejte bouquet garni a kůrky Parmigiano Reggiano a přiveďte vývar k rychlému varu. Snižte teplotu na mírný var a pokračujte ve vaření na nízkém ohni až 3 hodiny, dokud není velmi voňavý a tekutina neabsorbovala chuť kůrek",
        "ingredientsIds": [4, 5, 6]
      },
      {
        "description": "Vývar přeceďte přes jemné síto a vraťte ho do velkého hrnce k dokončení pokrmu",
        "ingredientsIds": []
      },
      {
        "description": "Ihned použijte ve svém dalším rizotu nebo těstovinách v brodu, nebo zmrazte na deštivý den!",
        "ingredientsIds": []
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Velká mrkev",
        "description": "Důkladně umytá a nahrubo nakrájená",
        "quantity": 1,
        "unit": null
      },
      {
        "id": 2,
        "title": "Střední cibule",
        "description": "Oloupaná a nahrubo nakrájená",
        "quantity": 2,
        "unit": null
      },
      {
        "id": 3,
        "title": "Stonky celeru",
        "description": "Důkladně umyté a nahrubo nakrájené",
        "quantity": 4,
        "unit": null
      },
      {
        "id": 4,
        "title": "Studená voda",
        "description": null,
        "quantity": 8,
        "unit": "šálků"
      },
      {
        "id": 5,
        "title": "Bouquet garni",
        "description": "Svazek bylinkových stonků jako petržel, šalvěj, rozmarýn, celé pepře, jalovcové bobule, rozmačkané celé stroužky česneku, bobkové listy atd",
        "quantity": 1,
        "unit": "svazek"
      },
      {
        "id": 6,
        "title": "Kůrky Parmigiano Reggiano DOP",
        "description": null,
        "quantity": 250,
        "unit": "g"
      }
    ]
  },
  {
    "id": 9,
    "title": "Bicerin: Klasická káva z Turína",
    "description": "Bicerin, což v piemontském dialektu znamená „malá kulatá sklenice“, je tradiční horký nápoj pocházející z Turína. Podává se ve své jmenovité sklenici a tento bohatý nápoj se skládá ze tří výrazných vrstev: espressa, horké čokolády a šlehaného mléka nebo smetany",
    "level": "Středně pokročilý",
    "region": "Itálie",
    "hasVideoSteps": true,
    "free": true,
    "servings": 2,
    "cook_time": 15,
    "priority": 3,
    "time": 15,
    "tip": "Klíčem k dokonalému bicerinu je vytvořit tři výrazné vrstvy! Aby se první vrstva horké čokolády neporušila, nalijte espresso přes zadní stranu lžíce, aby jemně stékalo do sklenice. Poté opatrně přidejte šlehačku. Nemíchejte!",
    "filters": [
      'Snídaně',
      'Itálie',
      'Káva'
    ],
    "steps": [
      {
        "description": "Rozpusťte čokoládu na sporáku nebo v mikrovlnné troubě",
        "ingredientsIds": [3]
      },
      {
        "description": "Připravte si konvici kávy. Přidejte rozpuštěnou čokoládu a nalijte kávu tímto způsobem přes kávovou lžičku",
        "ingredientsIds": [3, 4]
      },
      {
        "description": "V průhledné žáruvzdorné sklenici vytvořte tři vrstvy. Nalijte na dno horkou čokoládu, následovanou dávkou horkého espressa. Nakonec navrch přidejte šlehačku a podávejte teplé",
        "ingredientsIds": [2, 1]
      },
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Smetana ke šlehání",
        "description": "chlazená",
        "quantity": 1,
        "unit": "šálek"
      },
      {
        "id": 2,
        "title": "Plnotučné mléko",
        "description": "",
        "quantity": 1,
        "unit": "šálek"
      },
      {
        "id": 3,
        "title": "Hořká čokoláda",
        "description": "Preferujte hořkosladkou, přidejte náhradu cukru, pokud si přejete",
        "quantity": 80,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Espresso",
        "description": "",
        "quantity": 2,
        "unit": "dávky"
      }
    ]
  },

  // Dezerty
  // Tiramisu
  {
    "id": 3,
    "title": "Recept na Tiramisu",
    "description": "Dokonalá rovnováha mezi kávou a sladkostí, tiramisu se překládá jako „vytáhni mě nahoru“. Tento dekadentní italský dezert se tradičně připravuje z piškotů namočených v espressu, vrstvených bohatou krémovou směsí a zakončených štědrým posypem kakaového prášku. Kulturní legenda říká, že tiramisu bylo vynalezeno v Trevisu, malém městě v romantickém regionu Veneto (údajně k povzbuzení benátských milenců!). Dnes se tento klasický dezert připravuje po celé Itálii různými způsoby; mnoho našich kolegů tvrdí, že recept jejich rodiny je ten nejlepší. Nicméně v Eataly víme, že alespoň jeden z nich má pravdu! Hlavní cukrářka Eataly USA Katia Delogu vytvořila tento klasický recept, který je jednoduchý na přípravu a těžko překonatelný",
    "level": "Snadné",
    "region": "Itálie",
    "servings": 10,
    "prep_time": 270,
    "cook_time": 30,
    "priority": 1,
    "time": 300,
    "filters": [
      'Dezert',
      'Itálie',
      'Vegetariánské',
    ],
    "steps": [
      {
        "description": "Oddělte žloutky od bílků do dvou různých misek",
        "ingredientsIds": []
      },
      {
        "description": "Žloutky smíchejte s cukrem, dokud se nespojí. Přidejte mascarpone, dokud směs není bledá a cukr se nerozpustí. Odděleně vyšlehejte bílky do tuhého sněhu. Pomocí dřevěné lžíce jemně vmíchejte bílky do směsi mascarpone a poté jemně vmíchejte ušlehanou smetanu",
        "ingredientsIds": [1, 2, 3, 4]
      },
      {
        "description": "Nalijte kávu do široké mísy a rychle do ní namočte každý piškot. Přibližně polovinu piškotů uspořádejte tak, aby zcela pokryly dno mělké (hluboké 4 cm) obdélníkové nádoby. Piškoty pokryjte polovinou směsi mascarpone",
        "ingredientsIds": [5, 6, 7, 8, 9]
      },
      {
        "description": "Uspořádejte další vrstvu namočených piškotů a navrch dejte zbytek směsi mascarpone. Posypte vrch kakaovým práškem",
        "ingredientsIds": [6, 10, 11]
      },
      {
        "description": "Nádobu zakryjte plastovou fólií a dejte na 4 hodiny do lednice před podáváním tohoto sladkého italského dezertu",
        "ingredientsIds": [12]
      },
      {
        "description": "Buon appetito!",
        "ingredientsIds": []
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Sýr mascarpone",
        "description": "doporučujeme Guffanti nebo Gelmini",
        "quantity": 2,
        "unit": "šálky"
      },
      {
        "id": 2,
        "title": "Vejce",
        "description": "",
        "quantity": 5,
        "unit": null
      },
      {
        "id": 3,
        "title": "Cukr",
        "description": "",
        "quantity": 5,
        "unit": "lžíce"
      },
      {
        "id": 4,
        "title": "Smetana ke šlehání",
        "description": "ušlehaná do tuhého sněhu",
        "quantity": 2,
        "unit": "šálky"
      },
      {
        "id": 5,
        "title": "Dávky espressa",
        "description": "",
        "quantity": 4,
        "unit": "dávky"
      },
      {
        "id": 6,
        "title": "Piškoty",
        "description": "",
        "quantity": 1,
        "unit": "balení"
      },
      {
        "id": 7,
        "title": "Kakaový prášek",
        "description": "Posyp dle preference",
        "quantity": null,
        "unit": null
      }
    ]
  },
  {
    "id": 20,
    "title": "Cioccolata Calda (Italská horká čokoláda)",
    "description": "Hustá a krémová, nic neříká zima v Itálii jako bohatý šálek cioccolata calda – horké čokolády. Klíčem k italské horké čokoládě je její hustota a krémovost, která pochází z několika klíčových ingrediencí: kakaa, cukru a mléka. V některých případech se také přidává trochu hořké čokolády a zahušťovadlo, jako je kukuřičný škrob. Může být podávána samostatně nebo s kopečkem šlehačky",
    "tip": "Ujistěte se, že mléko je teplé, než začnete přidávat další ingredience.\n Udržujte teplotu na nízké úrovni a dávejte pozor, aby se dno nepřipálilo.\n Nenechte čokoládu příliš zhoustnout před odstraněním z tepla.\n Pokud se začnou tvořit hrudky čokolády, odstraňte směs z tepla a energicky šlehejte, dokud nebude opět hladká.\n Pro ty, kteří si přejí, může být čokoláda ochucena vanilkou, skořicí nebo karamelem",
    "level": "Snadné",
    "region": "Itálie",
    "servings": 2,
    "prep_time": 10,
    "cook_time": null,
    "hasVideoSteps": true,
    "isSingleVideo": true,
    "priority": 3,
    "time": 10,
    "filters": [
      'Itálie',
      'Horký nápoj',
      'Dezert',
      'Káva'
    ],
    "steps": [
      {
        "description": "Hořkou čokoládu nasekejte na velmi malé kousky. Dejte mléko na nízký oheň",
        "ingredientsIds": [1, 2]
      },
      {
        "description": "V misce smíchejte kakao, kukuřičný škrob (nebo bramborový škrob) a moučkový cukr. Když je mléko horké, ale ještě předtím, než začne vařit, přidejte směs a začněte míchat, vždy stejným směrem, abyste zabránili tvorbě hrudek",
        "ingredientsIds": [3, 4, 5]
      },
      {
        "description": "Jakmile se na povrchu začnou tvořit bubliny, přidejte čokoládu a míchejte, dokud nebude hustá a krémová. Ale pozor: škrob způsobí, že směs zhoustne i po odstranění z tepla, takže je dobré odstranit čokoládu z tepla dříve, než úplně zhoustne (jinak riskujete, že se změní v lžičkový koláč!)",
        "ingredientsIds": [2]
      },
      {
        "description": "Nalijte do dvou hrnků a podávejte teplé. Pro nádech dekadence přidejte navrch kopeček šlehačky!",
        "ingredientsIds": [6]
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Plnotučné mléko",
        "description": null,
        "quantity": 500,
        "unit": "ml"
      },
      {
        "id": 2,
        "title": "Hořká čokoláda",
        "description": "70% kakaa",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": 3,
        "title": "Hořké kakaové prášek",
        "description": null,
        "quantity": 30,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Kukuřičný nebo bramborový škrob",
        "description": null,
        "quantity": 15,
        "unit": "g"
      },
      {
        "id": 5,
        "title": "Moučkový cukr",
        "description": null,
        "quantity": 25,
        "unit": "g"
      },
      {
        "id": 6,
        "title": "Šlehačka",
        "description": "Volitelné, na ozdobu",
        "quantity": null,
        "unit": null
      }
    ]
  },
  // Citronový krémový dezert
  {
    "id": 13,
    "title": "Citronový krémový dezert",
    "description": "Lehký letní dezert, který vyvažuje kyselost citronu a sladkost smetany. Tato jedinečná pochoutka připomíná křížence mezi jogurtem a rozpuštěnou zmrzlinou",
    "tip": "Tento dezert nabízí neobvyklou prezentaci, využívající citronovou kůru jako formu pro krémovou náplň",
    "level": "Snadné",
    "region": "",
    "servings": 6,
    "hasVideoSteps": true,
    "free": true,
    "prep_time": 15,
    "cook_time": 15,
    "priority": 2,
    "time": 30,
    "filters": [
      "Dezert",
      "Studené",
      "Krémové",
      "Citron"
    ],
    "steps": [
      {
        "description": "Citrony podélně rozřízněte, opatrně oddělte dužinu od kůry pomocí nože a lžíce. Dužinu lehce rozmačkejte, dejte ji do sítka a vymačkejte všechnu šťávu",
        "ingredientsIds": [1],
      },
      {
        "description": "Nalijte smetanu do hrnce, přidejte cukr, kůru a vanilkový extrakt a promíchejte. Dejte na střední oheň, dokud nezačne bublat (nevařte!), poté odstraňte z tepla",
        "ingredientsIds": [2, 3, 4, 5],
      },
      {
        "description": "Nalijte citronovou šťávu do smetany a znovu promíchejte, směs ihned zhoustne. Směs smetany a citronu přeceďte přes sítko. Naplňte naše citronové formy touto směsí a dejte je do lednice na 1-3 hodiny",
        "ingredientsIds": [1, 2],
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Velké citrony se silnou kůrou",
        "description": null,
        "quantity": 3,
        "unit": "ks"
      },
      {
        "id": 2,
        "title": "Smetana 33-35%",
        "description": null,
        "quantity": 300,
        "unit": "ml"
      },
      {
        "id": 3,
        "title": "Cukr",
        "description": null,
        "quantity": 90,
        "unit": "g"
      },
      {
        "id": 4,
        "title": "Citronová kůra",
        "description": "z 2 citronů",
        "quantity": null,
        "unit": null
      },
      {
        "id": 5,
        "title": "Vanilkový extrakt",
        "description": null,
        "quantity": 0.5,
        "unit": "lžičky"
      }
    ]
  },
  // Tvarohové lívance s malinovou náplní
  {
    "id": 14,
    "title": "Tvarohové lívance s malinovou náplní",
    "description": "Lahodné tvarohové lívance plněné sladkou malinovou náplní, ideální pro příjemnou snídani nebo dezert",
    "tip": "Dávejte pozor, abyste směs na lívance nepřešlehali, aby měla správnou konzistenci. Pro smažení použijte neutrální olej, aby zůstal zachován původní chuť lívanců",
    "level": "Středně pokročilý",
    "region": null,
    "free": true,
    "servings": 2,
    "prep_time": 15,
    "cook_time": 15,
    "priority": 2,
    "time": 30,
    "hasVideoSteps": true,
    "filters": [
      "Dezert",
      "Snídaně",
      "Tvarohový koláč"
    ],
    "steps": [
      {
        "description": "Do mísy dejte tvaroh, vejce, mouku, škrob, sůl, cukr na lívance a pomocí ponorného mixéru (pokud nemáte, tak propasírujte přes sítko) přiveďte hmotu k homogenní konzistenci",
        "ingredientsIds": [1, 2, 3, 4, 5, 6]
      },
      {
        "description": "V kastrůlku smíchejte maliny s krémem na náplň a dejte na oheň, za stálého míchání zahřejte do zhoustnutí. Nechte vychladnout",
        "ingredientsIds": [8, 9, 10]
      },
      {
        "description": "Pracovní plochu poprašte moukou, těsto položte a vyválejte do tvaru válečku. Rozdělte na 8 částí, z každé vytvořte placku o tloušťce 0,5 cm, doprostřed dejte lžíci náplně, shromážděte okraje do středu, stiskněte a pomocí sklenice vytvarujte placičky",
        "ingredientsIds": [4, 8]
      },
      {
        "description": "Do pánve nalijte olej bez zápachu, dejte na střední oheň a položte lívance. Smažte, dokud nebudou z obou stran zlatavé, a poté je na nízkém ohni pod pokličkou dodělejte",
        "ingredientsIds": []
      }
    ],
    "ingredients": [
      {
        "id": 1,
        "title": "Tvaroh",
        "description": "5%",
        "quantity": 300,
        "unit": "g"
      },
      {
        "id": 2,
        "title": "Cukr",
        "description": null,
        "quantity": 1,
        "unit": "lžíce"
      },
      {
        "id": 3,
        "title": "Vejce",
        "description": "žloutek",
        "quantity": 1,
        "unit": ""
      },
      {
        "id": 4,
        "title": "Mouka",
        "description": "Pro lívance i posypání pracovní plochy",
        "quantity": 2,
        "unit": "lžíce"
      },
      {
        "id": 5,
        "title": "Vanilkový extrakt",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 6,
        "title": "Sůl",
        "description": null,
        "quantity": 1,
        "unit": "špetka"
      },
      {
        "id": 7,
        "title": "Olivový olej",
        "description": "Na smažení",
        "quantity": null,
        "unit": null
      },
      {
        "id": 8,
        "title": "Maliny",
        "description": null,
        "quantity": 4,
        "unit": "lžíce"
      },
      {
        "id": 9,
        "title": "Škrob",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      },
      {
        "id": 10,
        "title": "Krém",
        "description": null,
        "quantity": 50,
        "unit": "g"
      },
      {
        "id": 11,
        "title": "Voda",
        "description": null,
        "quantity": 1,
        "unit": "lžička"
      }
    ]
  }
];
