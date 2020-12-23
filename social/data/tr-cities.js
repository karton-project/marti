// The code is from https://gist.github.com/ozdemirburak/4821a26db048cc0972c1beee48a408de
const cities = [
    {
        "id": 1,
        "name": "Adana",
        "lat": "37.0000",
        "lon": "35.3213",
        "population": 2183167,
        "region": "Akdeniz"
    },
    {
        "id": 2,
        "name": "Adıyaman",
        "lat": "37.7648",
        "lon": "38.2786",
        "population": 602774,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 3,
        "name": "Afyonkarahisar",
        "lat": "38.7507",
        "lon": "30.5567",
        "population": 709015,
        "region": "Ege"
    },
    {
        "id": 4,
        "name": "Ağrı",
        "lat": "39.7191",
        "lon": "43.0503",
        "population": 547210,
        "region": "Doğu Anadolu"
    },
    {
        "id": 5,
        "name": "Amasya",
        "lat": "40.6499",
        "lon": "35.8353",
        "population": 322167,
        "region": "Karadeniz"
    },
    {
        "id": 6,
        "name": "Ankara",
        "lat": "39.9208",
        "lon": "32.8541",
        "population": 5270575,
        "region": "İç Anadolu"
    },
    {
        "id": 7,
        "name": "Antalya",
        "lat": "36.8841",
        "lon": "30.7056",
        "population": 2288456,
        "region": "Akdeniz"
    },
    {
        "id": 8,
        "name": "Artvin",
        "lat": "41.1828",
        "lon": "41.8183",
        "population": 168370,
        "region": "Karadeniz"
    },
    {
        "id": 9,
        "name": "Aydın",
        "lat": "37.8560",
        "lon": "27.8416",
        "population": 1053506,
        "region": "Ege"
    },
    {
        "id": 10,
        "name": "Balıkesir",
        "lat": "39.6484",
        "lon": "27.8826",
        "population": 1186688,
        "region": "Ege"
    },
    {
        "id": 11,
        "name": "Bilecik",
        "lat": "40.0567",
        "lon": "30.0665",
        "population": 212361,
        "region": "Marmara"
    },
    {
        "id": 12,
        "name": "Bingöl",
        "lat": "39.0626",
        "lon": "40.7696",
        "population": 267184,
        "region": "Doğu Anadolu"
    },
    {
        "id": 13,
        "name": "Bitlis",
        "lat": "38.3938",
        "lon": "42.1232",
        "population": 267184,
        "region": "Doğu Anadolu"
    },
    {
        "id": 14,
        "name": "Bolu",
        "lat": "40.5760",
        "lon": "31.5788",
        "population": 291095,
        "region": "Karadeniz"
    },
    {
        "id": 15,
        "name": "Burdur",
        "lat": "37.4613",
        "lon": "30.0665",
        "population": 258339,
        "region": "Akdeniz"
    },
    {
        "id": 16,
        "name": "Bursa",
        "lat": "40.2669",
        "lon": "29.0634",
        "population": 2842547,
        "region": "Marmara"
    },
    {
        "id": 17,
        "name": "Çanakkale",
        "lat": "40.1553",
        "lon": "26.4142",
        "population": 513341,
        "region": "Marmara"
    },
    {
        "id": 18,
        "name": "Çankırı",
        "lat": "40.6013",
        "lon": "33.6134",
        "population": 180945,
        "region": "İç Anadolu"
    },
    {
        "id": 19,
        "name": "Çorum",
        "lat": "40.5506",
        "lon": "34.9556",
        "population": 525180,
        "region": "Karadeniz"
    },
    {
        "id": 20,
        "name": "Denizli",
        "lat": "37.7765",
        "lon": "29.0864",
        "population": 993442,
        "region": "Ege"
    },
    {
        "id": 21,
        "name": "Diyarbakır",
        "lat": "37.9144",
        "lon": "40.2306",
        "population": 1654196,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 22,
        "name": "Edirne",
        "lat": "41.6818",
        "lon": "26.5623",
        "population": 402537,
        "region": "Marmara"
    },
    {
        "id": 23,
        "name": "Elâzığ",
        "lat": "38.6810",
        "lon": "39.2264",
        "population": 574304,
        "region": "Doğu Anadolu"
    },
    {
        "id": 24,
        "name": "Erzincan",
        "lat": "39.7500",
        "lon": "39.5000",
        "population": 222918,
        "region": "Doğu Anadolu"
    },
    {
        "id": 25,
        "name": "Erzurum",
        "lat": "39.9000",
        "lon": "41.2700",
        "population": 762321,
        "region": "Doğu Anadolu"
    },
    {
        "id": 26,
        "name": "Eskişehir",
        "lat": "39.7767",
        "lon": "30.5206",
        "population": 826716,
        "region": "İç Anadolu"
    },
    {
        "id": 27,
        "name": "Gaziantep",
        "lat": "37.0662",
        "lon": "37.3833",
        "population": 1931836,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 28,
        "name": "Giresun",
        "lat": "40.9128",
        "lon": "38.3895",
        "population": 426686,
        "region": "Karadeniz"
    },
    {
        "id": 29,
        "name": "Gümüşhane",
        "lat": "40.4386",
        "lon": "39.5086",
        "population": 151449,
        "region": "Karadeniz"
    },
    {
        "id": 30,
        "name": "Hakkâri",
        "lat": "37.5833",
        "lon": "43.7333",
        "population": 278775,
        "region": "Doğu Anadolu"
    },
    {
        "id": 31,
        "name": "Hatay",
        "lat": "36.4018",
        "lon": "36.3498",
        "population": 1533507,
        "region": "Akdeniz"
    },
    {
        "id": 32,
        "name": "Isparta",
        "lat": "37.7648",
        "lon": "30.5566",
        "population": 421766,
        "region": "Akdeniz"
    },
    {
        "id": 33,
        "name": "Mersin",
        "lat": "36.8000",
        "lon": "34.6333",
        "population": 1745221,
        "region": "Akdeniz"
    },
    {
        "id": 34,
        "name": "İstanbul",
        "lat": "41.0053",
        "lon": "28.9770",
        "population": 14657434,
        "region": "Marmara"
    },
    {
        "id": 35,
        "name": "İzmir",
        "lat": "38.4189",
        "lon": "27.1287",
        "population": 4168415,
        "region": "Ege"
    },
    {
        "id": 36,
        "name": "Kars",
        "lat": "40.6167",
        "lon": "43.1000",
        "population": 292660,
        "region": "Doğu Anadolu"
    },
    {
        "id": 37,
        "name": "Kastamonu",
        "lat": "41.3887",
        "lon": "33.7827",
        "population": 372633,
        "region": "Karadeniz"
    },
    {
        "id": 38,
        "name": "Kayseri",
        "lat": "38.7312",
        "lon": "35.4787",
        "population": 1341056,
        "region": "İç Anadolu"
    },
    {
        "id": 39,
        "name": "Kırklareli",
        "lat": "41.7333",
        "lon": "27.2167",
        "population": 346973,
        "region": "Marmara"
    },
    {
        "id": 40,
        "name": "Kırşehir",
        "lat": "39.1425",
        "lon": "34.1709",
        "population": 225562,
        "region": "İç Anadolu"
    },
    {
        "id": 41,
        "name": "Kocaeli",
        "lat": "40.8533",
        "lon": "29.8815",
        "population": 1780055,
        "region": "Marmara"
    },
    {
        "id": 42,
        "name": "Konya",
        "lat": "37.8667",
        "lon": "32.4833",
        "population": 2130544,
        "region": "İç Anadolu"
    },
    {
        "id": 43,
        "name": "Kütahya",
        "lat": "39.4167",
        "lon": "29.9833",
        "population": 571463,
        "region": "Ege"
    },
    {
        "id": 44,
        "name": "Malatya",
        "lat": "38.3552",
        "lon": "38.3095",
        "population": 772904,
        "region": "Doğu Anadolu"
    },
    {
        "id": 45,
        "name": "Manisa",
        "lat": "38.6191",
        "lon": "27.4289",
        "population": 1380366,
        "region": "Ege"
    },
    {
        "id": 46,
        "name": "Kahramanmaraş",
        "lat": "37.5858",
        "lon": "36.9371",
        "population": 1096610,
        "region": "Akdeniz"
    },
    {
        "id": 47,
        "name": "Mardin",
        "lat": "37.3212",
        "lon": "40.7245",
        "population": 796591,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 48,
        "name": "Muğla",
        "lat": "37.2153",
        "lon": "28.3636",
        "population": 908877,
        "region": "Ege"
    },
    {
        "id": 49,
        "name": "Muş",
        "lat": "38.9462",
        "lon": "41.7539",
        "population": 408728,
        "region": "Doğu Anadolu"
    },
    {
        "id": 50,
        "name": "Nevşehir",
        "lat": "38.6939",
        "lon": "34.6857",
        "population": 286767,
        "region": "İç Anadolu"
    },
    {
        "id": 51,
        "name": "Niğde",
        "lat": "37.9667",
        "lon": "34.6833",
        "population": 346114,
        "region": "İç Anadolu"
    },
    {
        "id": 52,
        "name": "Ordu",
        "lat": "40.9839",
        "lon": "37.8764",
        "population": 728949,
        "region": "Karadeniz"
    },
    {
        "id": 53,
        "name": "Rize",
        "lat": "41.0201",
        "lon": "40.5234",
        "population": 328979,
        "region": "Karadeniz"
    },
    {
        "id": 54,
        "name": "Sakarya",
        "lat": "40.6940",
        "lon": "30.4358",
        "population": 953181,
        "region": "Marmara"
    },
    {
        "id": 55,
        "name": "Samsun",
        "lat": "41.2928",
        "lon": "36.3313",
        "population": 1279884,
        "region": "Karadeniz"
    },
    {
        "id": 56,
        "name": "Siirt",
        "lat": "37.9333",
        "lon": "41.9500",
        "population": 320351,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 57,
        "name": "Sinop",
        "lat": "42.0231",
        "lon": "35.1531",
        "population": 204133,
        "region": "Karadeniz"
    },
    {
        "id": 58,
        "name": "Sivas",
        "lat": "39.7477",
        "lon": "37.0179",
        "population": 618617,
        "region": "İç Anadolu"
    },
    {
        "id": 59,
        "name": "Tekirdağ",
        "lat": "40.9833",
        "lon": "27.5167",
        "population": 937910,
        "region": "Marmara"
    },
    {
        "id": 60,
        "name": "Tokat",
        "lat": "40.3167",
        "lon": "36.5500",
        "population": 593990,
        "region": "Karadeniz"
    },
    {
        "id": 61,
        "name": "Trabzon",
        "lat": "41.0015",
        "lon": "39.7178",
        "population": 768417,
        "region": "Karadeniz"
    },
    {
        "id": 62,
        "name": "Tunceli",
        "lat": "39.3074",
        "lon": "39.4388",
        "population": 86076,
        "region": "Doğu Anadolu"
    },
    {
        "id": 63,
        "name": "Şanlıurfa",
        "lat": "37.1591",
        "lon": "38.7969",
        "population": 1892320,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 64,
        "name": "Uşak",
        "lat": "38.6823",
        "lon": "29.4082",
        "population": 353048,
        "region": "Ege"
    },
    {
        "id": 65,
        "name": "Van",
        "lat": "38.4891",
        "lon": "43.4089",
        "population": 1096397,
        "region": "Doğu Anadolu"
    },
    {
        "id": 66,
        "name": "Yozgat",
        "lat": "39.8181",
        "lon": "34.8147",
        "population": 419440,
        "region": "İç Anadolu"
    },
    {
        "id": 67,
        "name": "Zonguldak",
        "lat": "41.4564",
        "lon": "31.7987",
        "population": 595907,
        "region": "Karadeniz"
    },
    {
        "id": 68,
        "name": "Aksaray",
        "lat": "38.3687",
        "lon": "34.0370",
        "population": 386514,
        "region": "İç Anadolu"
    },
    {
        "id": 69,
        "name": "Bayburt",
        "lat": "40.2552",
        "lon": "40.2249",
        "population": 78550,
        "region": "Karadeniz"
    },
    {
        "id": 70,
        "name": "Karaman",
        "lat": "37.1759",
        "lon": "33.2287",
        "population": 242196,
        "region": "İç Anadolu"
    },
    {
        "id": 71,
        "name": "Kırıkkale",
        "lat": "39.8468",
        "lon": "33.5153",
        "population": 270271,
        "region": "İç Anadolu"
    },
    {
        "id": 72,
        "name": "Batman",
        "lat": "37.8812",
        "lon": "41.1351",
        "population": 566633,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 73,
        "name": "Şırnak",
        "lat": "37.4187",
        "lon": "42.4918",
        "population": 490184,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 74,
        "name": "Bartın",
        "lat": "41.5811",
        "lon": "32.4610",
        "population": 190708,
        "region": "Karadeniz"
    },
    {
        "id": 75,
        "name": "Ardahan",
        "lat": "41.1105",
        "lon": "42.7022",
        "population": 99265,
        "region": "Doğu Anadolu"
    },
    {
        "id": 76,
        "name": "Iğdır",
        "lat": "39.8880",
        "lon": "44.0048",
        "population": 192435,
        "region": "Doğu Anadolu"
    },
    {
        "id": 77,
        "name": "Yalova",
        "lat": "40.6500",
        "lon": "29.2667",
        "population": 233009,
        "region": "Marmara"
    },
    {
        "id": 78,
        "name": "Karabük",
        "lat": "41.2061",
        "lon": "32.6204",
        "population": 236978,
        "region": "Karadeniz"
    },
    {
        "id": 79,
        "name": "Kilis",
        "lat": "36.7184",
        "lon": "37.1212",
        "population": 130655,
        "region": "Güneydoğu Anadolu"
    },
    {
        "id": 80,
        "name": "Osmaniye",
        "lat": "37.2130",
        "lon": "36.1763",
        "population": 512873,
        "region": "Akdeniz"
    },
    {
        "id": 81,
        "name": "Düzce",
        "lat": "40.8438",
        "lon": "31.1565",
        "population": 360388,
        "region": "Karadeniz"
    }
]