"""Russian patristic commentaries keyed to verses, from azbyka.ru/otechnik.

Each is a pre-revolutionary Russian translation (public domain): the Kazan
Theological Academy's Theophylact (Благовестник, 1855-1888), the Moscow
Theological Academy's Theodoret (Творения святых отцев, 1855-1861), the Kiev
Euthymius Zigabenus (1882-1887), Archpriest Michael Bogoslovsky's Andrew of
Caesarea (1884) and the St Petersburg Theological Academy's Chrysostom
(1895-1906). fetch_azbyka.py downloads them; build_commentary_ru.py checks
each book's edition year on its azbyka.ru page (MAX_YEAR) before using it.
Where azbyka.ru prints no edition, "edition" gives the one its text comes from.
"""

# Leave out any book whose edition on azbyka.ru is later than this.
MAX_YEAR = 1925

# commentary id -> (author as shown in the app, tradition)
COMMENTARIES = {
    "theophylact-ru": ("Блаженный Феофилакт Болгарский (Blessed Theophylact of Ohrid)", "east"),
    "euthymius-ru": ("Евфимий Зигабен (Euthymius Zigabenus)", "east"),
    "theodoret-ru": ("Блаженный Феодорит Кирский (Blessed Theodoret of Cyrus)", "east"),
    "andrew-caesarea-ru": ("Святитель Андрей Кесарийский (St Andrew of Caesarea)", "east"),
    "chrysostom-ru": ("Святитель Иоанн Златоуст (St John Chrysostom)", "east"),
}

AZBYKA_BOOKS = {
    "theophylact-ru": [
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-evangelie-ot-matfeja/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-evangelie-ot-marka/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-evangelie-ot-luki/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-evangelie-ot-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-dejanija-svjatykh-apostolov/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-sobornoe-poslanie-apostola-iakova/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-poslanie-apostola-petra/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-vtoroe-poslanie-svjatogo-apostola-petra/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-poslanie-svjatogo-apostola-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-vtoroe-poslanie-svjatogo-apostola-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-trete-poslanie-svjatogo-apostola-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-svjatogo-apostola-iudy/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-rimljanam-svjatogo-apostola-pavla/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-poslanie-k-korinfjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-vtoroe-poslanie-k-korinfjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-galatam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-efesjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-filippijtsam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-kolossjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-poslanie-k-fessalonikijtsam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-vtoroe-poslanie-k-fessalonikijtsam/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-pervoe-poslanie-k-timofeju/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-vtoroe-poslanie-k-timofeju/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-titu/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-sv-apostola-pavla-k-filimonu/"},
        {"url": "https://azbyka.ru/otechnik/Feofilakt_Bolgarskij/tolkovanie-na-poslanie-k-evrejam/"},
    ],
    "euthymius-ru": [
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovaja-psaltir/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-evangelija-ot-matfeja/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-na-evangelie-ot-luki/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-evangelija-ot-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-na-1-e-poslanie-k-timofeyu/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-na-2-e-poslanie-k-timofeyu/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-na-poslanie-k-titu/"},
        {"url": "https://azbyka.ru/otechnik/Evfimij_Zigaben/tolkovanie-na-poslanie-apostola-pavla-k-evrejam/"},
    ],
    "theodoret-ru": [
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_sto_pjatdesat_psalmov/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_knigu_bitija/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-knigu-iskhod/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-knigu-levit/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_knigu_chisel/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-knigu-vtorozakonie/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_knigu_Iisusa_Navina/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_knigu_Sudey/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_knigu_Ruf/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_Pervuju_knigu_Carstv/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-vtoruju-knigu-tsarstv/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-tretiu-knigu-tsarstv/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-chetvertuyu-knigu-tsarstv/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-pervuyu-knigu-paralipomenon/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-vtoruyu-knigu-paralipomenon/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-knigu-pesn-pesnej-solomona/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-ieremiyu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-knigu-varuha/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-iezekiilja/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-videnija-proroka-daniila/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-osiyu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-ioilja/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-amosa/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-avdija/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-ionu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-miheja/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-avvakuma/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-sofoniyu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-nauma/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-aggeja/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-zahariyu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-proroka-malahiyu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-plach-ieremii/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-poslanie-k-rimlyanam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_pervoe_poslanie_k_korinfinam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_vtoroe_poslanie_k_korinfjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_poslanie_k_Galatam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_poslanie_k_Efesjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_poslanie_k_Filipiycam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_poslanie_k_kolossjanam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_pervoe_poslanie_k_Fessalonikiycam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_vtoroe_poslanie_k_Fessalonikiycam/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie-na-poslanie-k-titu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_pervoe_poslanie_k_Timofeu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_vtoroe_poslanie_k_Timofeu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/Tolkovanie_na_poslanie_k_Filimonu/"},
        {"url": "https://azbyka.ru/otechnik/Feodorit_Kirskij/tolkovanie_na_poslanie_k_evrejam/"},
    ],
    "andrew-caesarea-ru": [
        {"url": "https://azbyka.ru/otechnik/Andrej_Kesarijskij/tolkovanie-na-apokalipsis-sv-ioanna-bogoslova/"},
    ],    "chrysostom-ru": [
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-knigu-bytija/",
         "edition": "Творения святого Иоанна Златоуста в русском переводе. Издание СПб. Духовной Академии, т. 4, 1898"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy_na_psalmy/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanija-na-pritchi-solomona/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-proroka-isajju/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-proroka-ieremiyu/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-knigu-proroka-daniila/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-evangelie-ot-matfeja/",
         "edition": "Творения святого Иоанна Златоуста в русском переводе. Издание СПб. Духовной Академии, т. 7, 1901"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-evangelie-ot-ioanna/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-dejanija-apostolskie/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-poslanie-k-rimljanam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-1-e-poslanie-k-korinfjanam/",
         "edition": "Творения святого Иоанна Златоуста в русском переводе. Издание СПб. Духовной Академии, т. 10, 1904"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-2-e-poslanie-k-korinfjanam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-poslanie-k-galatam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-poslanie-k-efesjanam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/besedy-na-poslanie-k-filippijtsam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-poslanie-k-kolossjanam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-pervoe-poslanie-k-fessalonikijtsam/",
         "edition": "Творения святого Иоанна Златоуста в русском переводе. Издание СПб. Духовной Академии, т. 11, 1905"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-vtoroe-poslanie-k-fessalonikijtsam/",
         "edition": "Творения святого Иоанна Златоуста в русском переводе. Издание СПб. Духовной Академии, т. 11, 1905"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-pervoe-poslanie-k-timofeju/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-vtoroe-poslanie-k-timofeju/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-poslanie-k-titu/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-poslanie-k-filimonu/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/tolkovanie-na-poslanie-k-evrejam/"},
        {"url": "https://azbyka.ru/otechnik/Ioann_Zlatoust/otryvki-tolkovanij-na-sobornye-poslanija/"},
    ],
}

import re  # noqa: E402

# Editions that are modern translations (or name no edition) are left out.
REJECT_SOURCE = re.compile(r"Электронный ресурс|Экзегет|Перевод иером|пер\. [А-Я]\. [А-Я]\. [А-Я]", re.I)
# Modern reprints of the 19th-century translations: the Kazan/St Petersburg
# "Благовестник" (Theophylact) and the Moscow Theological Academy's
# "Творения блаженного Феодорита" (1855-1861), reissued since 2003.
ACCEPT_REPRINT = re.compile(r"Благовестник|Творения блаженн\w+ Феодорита|Блаженный Феодорит Кирский : \[[Сс]очинения", re.I)
