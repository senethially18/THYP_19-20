var i,k;
var keys;
var eduSideSwitch = 'timeline-inverted';
var refDatabase, eduDatabase, statGlobalDatabase;
var dataForm;
var database;
var selectedVal, selectedEtudiant, selectedKey;
var firebaseConfig;
var reponseList, etudiantsList, besoinsList, competencesList;
var vals = {"Pas besoin":1, "Besoin d'approfondissement":5, "Besoin urgent":10, "je ne connais pas du tout":1,"je connais un peu":5,"je vonnais bien":10,"je suis expert(e)":20};

 $( document ).ready(function() {
     //setting firebase config
     setData();
     function setData() {
         firebaseConfig = {
             apiKey: "AIzaSyDQK9yx-uZsUDeZXoL-pobi_yP6nR6hOZU",
                 authDomain: "samszoprojet.firebaseapp.com",
             databaseURL: "https://samszoprojet.firebaseio.com",
             projectId: "samszoprojet",
             storageBucket: "",
             messagingSenderId: "929822391667",
             appId: "1:929822391667:web:038e35b7ea9353acda5906",
             measurementId: "G-72EZDRNJ2E"
         };
         firebase.initializeApp(firebaseConfig);
         database = firebase.database();
         refDatabase = database.ref("etudiants");
         refDatabase.on("value",getEtudiants, errData);
        
     }
     function getEtudiants(data){
         etudiantsList = data.val();
         console.log(etudiantsList);
         setEtudiantSelect();
         
     }
     function errData(err) {
         console.log("ERROR !!");
         console.log(err);
     }
     function setEtudiantSelect() {
         keys = Object.keys(etudiantsList);
         for(i = 0 ; i < keys.length; i++) {
             k = keys[i];
             $("#etudiantList")
                 .append($('<option>', {
                     value: k,
                     text : etudiantsList[k].nom+' '+etudiantsList[k].prenom
                 }));
         }
         $("#etudiantList").change();
     }

     $("#etudiantList").on("change",function () {
         selectedVal = this.value;
         for(i = 0; i < keys.length; i++) {
             k = keys[i];
             if( k===selectedVal){
                 selectedEtudiant = etudiantsList[k];
                 selectedKey = k;
                 console.log(selectedEtudiant);
                 $("#etuNom").text( selectedEtudiant.nom + " "+ selectedEtudiant.prenom);
                 $("#nomComplet").text(selectedEtudiant.nom + " "+ selectedEtudiant.prenom);
                 $("#dateNaissance").text(selectedEtudiant.dateNaissance);
                 $("#adresse").text(selectedEtudiant.adresse);
                 $("#nationalite").text(selectedEtudiant.nationalite);
                 $("#telephone").text(selectedEtudiant.telephone);
                 $("#numEtudiant").text(selectedEtudiant.numEtudiant);
                 $("#netvibes").text(selectedEtudiant.netvibes);
                 $("#diigo").text(selectedEtudiant.diigo);
                 $("#github").text(selectedEtudiant.github);
                 $("#specialite").text(selectedEtudiant.specialite);
                 $("#formationPreced").text(selectedEtudiant.formationPreced);
                 $("#photo").attr('src',selectedEtudiant.photo);
                  console.log(selectedEtudiant);
                 break;
             }
         }
         for(i = 0; i < keys.length; i++) {
           if( k===selectedVal){
               selectedEtudiant = etudiantsList[k];
               selectedKey = k;
            var html =  '<div id="etudNum__Col1" style="display: inline-block;"> </div>';
            html += '<div id="etudNum__Col2" style="display: inline-block;" >  </div>';
            html += '<div id="etudNum__Col3" style="display: inline-block;" >  </div>';
          $("#moreskills").empty().append(html).text(function() {
                drawGraphReponse("#etudNum__Col1", 'Besoins', selectedEtudiant.response.besoins, 350);
                drawGraphReponse("#etudNum__Col2", 'Compétences', selectedEtudiant.response.competences, 350);
                drawGraphReponse("#etudNum__Col3", 'Outils', selectedEtudiant.response.outils, 350);
            });
            $("#edu").empty();
         if(selectedEtudiant.experiences !== undefined) {
             keys1 = Object.keys(selectedEtudiant.experiences);
             for(var i = 0; i < keys1.length ;i++) {
                 k = keys1[i];
                 var exp = '<div class ="col-md-6">';
                 exp+= '<div class="education-block">';
                 exp+= '<h5 class="year">'+selectedEtudiant.experiences[k].date+'</h5>';
                 exp+= '<span class="fas fa-graduation-cap"></span>';
                 exp+= '<h3 id="titre">'+selectedEtudiant.experiences[k].titre+'</h3>';
             	 exp+= '<p id="description">'+selectedEtudiant.experiences[k].description+'</p>';
                 $("#edu").append(exp);
            }
        }
        $("#exp").empty();
        if(selectedEtudiant.educations !== undefined){
            keys1 = Object.keys(selectedEtudiant.educations);
            for(var i = 0; i < keys1.length ;i++) {
                k = keys1[i];
                eduSideSwitch = eduSideSwitch === 'timeline-inverted' ? ' ' :'timeline-inverted';
                var exp = '<li class="'+eduSideSwitch+'">';
                exp+= '<div class="timeline-badge"><span class="fas fa-briefcase"></span></div>';
                exp+= '<div class="timeline-panel-container">';
                exp+= '<div class="timeline-panel">';
                exp+= '<div class="timeline-heading">';
                exp+= '<h4 id="titre">'+selectedEtudiant.educations[k].titre+'</h4>';
                exp+= '<p class="text-muted"><small class="fas fa-clock"></small>'+selectedEtudiant.educations[k].date+'</p>';
                exp+= '</div><!-- /timeline-heading -->';
                exp+= '<div class="timeline-body">';
                exp+= '<p>'+selectedEtudiant.educations[k].description+'</p>';
                exp+= '</div><!-- /timeline-body -->';
                exp+= '</div> <!-- /timeline-content -->';
                exp+= '</div><!-- /timeline-panel-container -->';
                exp+= '</li>';
                $("#exp").append(exp);
            }  
            }    
            }
    }  

     function drawGraphReponse(idE, titre, data, size){

         var donut = donutChart()
             .width(size)
             .height(size)
             .cornerRadius(3) // sets how rounded the corners are on each slice
             .padAngle(0.015) // effectively dictates the gap between slices
             .variable('importance')
             .category('prop')
             .title(titre);
         d3.select(idE)
             .datum(data) // bind data to the div
             .call(donut); // draw chart in div
     }
//merci à https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
     function donutChart() {
         var width,
             height,
             margin = {top: 0, right: 0, bottom: 10, left: 0},
             colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
             variable, // value in data that will dictate proportions on chart
             category, // compare data by
             padAngle, // effectively dictates the gap between slices
             floatFormat = d3.format('.4r'),
             cornerRadius, // sets how rounded the corners are on each slice
             percentFormat = d3.format(',.2%'),
             title;
         function chart(selection){
             selection.each(function(data) {
                 // generate chart
                 // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
                 var radius = Math.min(width, height) / 2;
                 // creates a new pie generator
                 var pie = d3.pie()
                     .value(function(d) { return floatFormat(d[variable]); })
                     .sort(null);
                 // contructs and arc generator. This will be used for the donut. The difference between outer and inner
                 // radius will dictate the thickness of the donut
                 var arc = d3.arc()
                     .outerRadius(radius * 0.8)
                     .innerRadius(radius * 0.6)
                     .cornerRadius(cornerRadius)
                     .padAngle(padAngle);
                 // this arc is used for aligning the text labels
                 var outerArc = d3.arc()
                     .outerRadius(radius * 0.9)
                     .innerRadius(radius * 0.9);
                 
                 // append the svg object to the selection
                 var wSvg = width + margin.left + margin.right, hSvg = height + margin.top + margin.bottom;
                 var svg = selection.append('svg')
                     .attr('width', wSvg)
                     .attr('height', hSvg)
                     .append('g')
                     .attr('transform', 'translate(' + wSvg / 2 + ',' + hSvg / 2 + ')');
                 
                 // g elements to keep elements within svg modular
                 svg.append('g').attr('class', 'slices');
                 svg.append('g').attr('class', 'labelName');
                 svg.append('g').attr('class', 'lines');
                 
                 // add and colour the donut slices
                 var path = svg.select('.slices')
                     .datum(data).selectAll('path')
                     .data(pie)
                     .enter().append('path')
                     .attr('fill', function(d) { return colour(d.data[category]); })
                     .attr('d', arc);
                 
                 //ajoute le titre
                 svg.append('text')
                     .html(title)
                     .attr('text-anchor', 'middle')
                     .attr('y', hSvg/2)
                     .attr("fill", "gray")
                     .style('font-size', '20px')
                     .style('font-weight', 'bold');
                 svg.append('text')
                     .text('text-anchor', 'middle')
                     .attr('y', hSvg)
                     .attr("fill", "white");
                 svg.append("text")
                     .attr("text-anchor", "middle")
                     .attr("id",title)
                     .style('font-size', '15px');
                 
                 // add tooltip to mouse events on slices and labels
                 d3.selectAll('.labelName text, .slices path').call(toolTip);
                 
                 // Functions
                 // calculates the angle for the middle of a slice
                 function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
                 // function that creates and adds the tool tip to a selected element
                 function toolTip(selection) {
                     // add tooltip (svg circle element) when mouse enters label or slice
                     selection.on('mouseenter', function (data) {
                         $("#graphText").html(data.data.prop+" : "+ data.data.expression);
                        
                     });
                     // remove the tooltip when mouse leaves the slice/label
                     selection.on('mouseout', function (data) {
                         $("#graphText").html(' <br> ');
                     });
                 }
                 // function to create the HTML string for the tool tip. Loops through each key in data object
                 // and returns the html string key: value
                 function toolTipHTML(data) {
                     var tip = '<h6 class="card-title">'+data.data.prop+'</h6>'
                     tip += '<p class="card-text">'+data.data.expression+'</p>';
                     return tip;
                 }
             });
         }
         // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
         chart.width = function(value) {
             if (!arguments.length) return width;
             width = value;
             return chart;
         };
         chart.height = function(value) {
             if (!arguments.length) return height;
             height = value;
             return chart;
         };
         chart.margin = function(value) {
             if (!arguments.length) return margin;
             margin = value;
             return chart;
         };
         chart.radius = function(value) {
             if (!arguments.length) return radius;
             radius = value;
             return chart;
         };
         chart.padAngle = function(value) {
             if (!arguments.length) return padAngle;
             padAngle = value;
             return chart;
         };
         chart.cornerRadius = function(value) {
             if (!arguments.length) return cornerRadius;
             cornerRadius = value;
             return chart;
         };
         chart.colour = function(value) {
             if (!arguments.length) return colour;
             colour = value;
             return chart;
         };
         chart.variable = function(value) {
             if (!arguments.length) return variable;
             variable = value;
             return chart;
         };
         chart.category = function(value) {
             if (!arguments.length) return category;
             category = value;
             return chart;
         };
         chart.title = function(value) {
             if (!arguments.length) return title;
             title = value;
             return chart;
         };
         return chart;
     }
 });
});
