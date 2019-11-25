//Merci a vvns

function formatItem(t, e) {
    var s = ""
      , i = 0
      , o = {
        "Pas besoin": 100,
        "Besoin d'approfondissement": 55,
        "Besoin urgent": 0,
        "je ne connais pas du tout": 0,
        "je connais un peu": 25,
        "je connais bien": 70,
        "je suis expert(e)": 100,
        jamais: 0,
        souvent: 75,
        "je suis accro": 100
    };
    return t.forEach(function(t, a) {
        i++;
        var r = o[t.expression];
        null == r && (r = 0),
        block = '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:' + r + '%"><span>' + t.prop + '</span><span class="bar-value">' + r + '</span></div><div class="bar-line"><span class="bar-fill" data-width="' + r + '%" style="width:' + r + '%"></span></div></div></div>',
        0 != r || "besoins" == e ? (i % 2 == 0 && (s += '<div class="row">'),
        s += block,
        i % 2 == 0 && (s += "</div>")) : i--
    }),
    s
}

function getBestNeeds() {
    console.log(d.statistiques.besoins);
    var t = Array.from(d.statistiques.besoins)
      , e = [];
    for (i = 0; i < 5; i++)
        v = getMax(t),
        -1 != v && (e.push(v),
        t.slice(v, 1));
    console.log(e)
}
function getMax(t) {
    for (max = 0,
    index = -1,
    i = 0; i < t.length; i++)
        max < d.statistiques.besoins[i].total && (max = d.statistiques.besoins[i].total,
        index = i);
    return max
}
function getTotalNeeds(t) {
    return d.statistiques.besoins[t].total
}
function formatStats() {
    for (max = getMax(d.statistiques.besoins),
    console.log(max),
    block = "",
    i = 0; i < d.statistiques.besoins.length; i++)
        percentage = d.statistiques.besoins[i].total / max * 100,
        block += '<h5 style="text-align: center; color: #c7a163;">' + d.statistiques.besoins[i].item +'</h5> <span style="color: #d82c2e;float: right;"> ' +d.statistiques.besoins[i].total+ '</span><br><div class="progress"><div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" style="width:' + percentage + '%"></div></div><br><p><b>Besoins : </b>' + d.statistiques.besoins[i].best.toString() + '</p><br><p><b>Compétents : </b>' + d.statistiques.competences[i].best.toString() + '</p><hr>';
    $("#statsToAdd").html(block)
}
var d;
$(document).ready(function() {
    d3.csv(url).then(function(s) {
        formatDataOne(s)
    }).catch(function(s) {
        console.log(s)
    });
});
var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv"
  , url2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDaWciiOoWzdcJ2FicK9v9CN64A7T7kfxiEck4rhGoO3jg6Wt4H2Mn4JBotZ4D1WS8yzuMQiuoAcqA/pub?output=csv"
  , vals = {
    "Pas besoin": 1,
    "Besoin d'approfondissement": 5,
    "Besoin urgent": 10,
    "je ne connais pas du tout": 1,
    "je connais un peu": 5,
    "je connais bien": 10,
    "je suis expert(e)": 20
};

function formatDataOne(s) {
    for (s.statistiques = {
        besoins: [],
        competences: []
    },
    initv = 0,
    s.forEach(function(e, t) {
        0,
        e.reponses = {
            besoins: [],
            competences: [],
            outils: [],
            reseaux: [],
            langues: [],
            langages: [],
            framework: []
        };
        for (let s in e) {
            var n = s.substring(s.indexOf("[") + 1, s.indexOf("]"))
              , o = e[s]
              , a = vals[o];
            s.indexOf("besoins") > 0 && (e.reponses.besoins.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            null != a && NaN != a || (a = 0)),
            s.indexOf("compétences") > 0 && e.reponses.competences.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            s.indexOf("outils utilisez") > 0 && e.reponses.outils.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            s.indexOf("réseaux") > 0 && e.reponses.reseaux.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            s.indexOf("langues") > 0 && e.reponses.langues.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            s.indexOf("langages") > 0 && e.reponses.langages.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            }),
            s.indexOf("framework") > 0 && e.reponses.framework.push({
                prop: n,
                importance: a,
                expression: o,
                id: t
            })
        }
        var p = e.reponses.besoins;
        if (0 == initv) {
            for (i = 0; i < p.length; i++)
                s.statistiques.competences.push({
                    item: "prop",
                    total: 0,
                    best: []
                }),
                s.statistiques.besoins.push({
                    item: "prop",
                    total: 0,
                    best: []
                });
            initv = 1
        }
    }),
    i = 0; i < s.length; i++) {
        var e = s.statistiques.besoins.length;
        for (p = 0; p < e; p++)
            m = s[i].reponses.besoins[p].importance,
            n = s[i].reponses.competences[p].importance,
            null != n && NaN != n || (n = 0),
            null != m && NaN != m || (m = 0),
            best = s.statistiques.besoins[p].best,
            10 != m && 5 != m || best.push(s[i]["Votre nom"] + " " + s[i]["Votre prénom"]),
            s.statistiques.besoins[p].item = s[i].reponses.besoins[p].prop,
            s.statistiques.besoins[p].total = s.statistiques.besoins[p].total + m,
            s.statistiques.besoins[p].best = best,
            best = s.statistiques.competences[p].best,
            20 == n && best.push(s[i]["Votre nom"] + " " + s[i]["Votre prénom"]),
            s.statistiques.competences[p].item = s[i].reponses.competences[p].prop,
            s.statistiques.competences[p].total = s.statistiques.competences[p].total + n,
            s.statistiques.competences[p].best = best
    }
    d = s;
    d3.csv(url2).then(function(s) {
        formatDataTwo(s)
    }).catch(function(s) {
        console.log(s)
    })
}
function formatDataTwo(s) {
    d.two = s,
    d.forEach(function(e, t) {
        var n = e["N° étudiant"];
        s.forEach(function(s, e) {
            other = s["Num étudiant"],
            n == other && (d[t].other = s)
        })
    }),
    init()
}
function getBestNeed(s, e) {
    var t = ""
      , n = 0
      , i = {
        "Pas besoin": 100,
        "Besoin d'approfondissement": 55,
        "Besoin urgent": 0,
        "je ne connais pas du tout": 0,
        "je connais un peu": 25,
        "je connais bien": 70,
        "je suis expert(e)": 100,
        jamais: 0,
        souvent: 75,
        "je suis accro": 100
    };
    return s.forEach(function(s, o) {
        n++;
        var a = i[s.expression];
        null == a && (a = 0),
        block = '<div class="progress"><div class="progress-bar" style="width:' + a + '%></div></div>',
        0 != a || "besoins" == e ? (n % 2 == 0 && (t += '<div class="row">'),
        t += block,
        n % 2 == 0 && (t += "</div>")) : n--
    }),
    t
}
function init() {
    formatStats()
}
