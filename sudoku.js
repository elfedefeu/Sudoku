var Sudoku = {
	
		nb_case_vide:"",
	
		shuffle : function (array)
			{
				for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
				return array;
			},
		
		generate : function()
			{
				var nb_max_loop = 10000;
		
				var grille = new Array();
				var lignes = new Array(); 
				var colonnes = new Array(); 
				var carres = new Array(); 
				var i_while = 0; 
				var grille_complete = false; 
		
					/*
					grille [i][j] => i-eme ligne de la grille,j-ieme case
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					| | | |	| | | | | |		
					-------------------
					*/						
		
				outerwhile: 
				while ((i_while < nb_max_loop) && !grille_complete) 
				{
					i_while++; 
		
					for (var i = 1; i <= 9; i++)
					{
						grille[i] = new Array(); 
						lignes[i] = new Array(); 
						colonnes[i] = new Array(); 
		
						for (var j = 1; j <= 9; j++)
						{
							grille[i][j] = 0; 
							lignes[i][j] = j; 
							colonnes[i][j] = j; 				
						}
					}
					
					
					/*
					carre[i][j][k] => Carré de la ligne i, le j-ieme et la k-ieme case à remplir
					-------------------------
					|carre	|carre	|		|
					|(1,1,k)|(1,2,k)|		|
					|		|		|		|
					-------------------------
					|carre	|		|carre	|
					|(2,1,k)|		|(2,3,k)|
					|		|		|		|
					-------------------------
					|		|carre	|		|
					|		|(3,2,k)|		|
					|		|		|		|
					-------------------------
					*/						
		
					for (var i = 1; i <= 3; i++)
					{
						carres[i] = new Array(); 
		
						for (var j = 1; j <= 3; j++)
						{
							carres[i][j] = new Array(); 
							for (var k = 1; k <= 9; k++)
							{
								carres[i][j][k] = k; 
							}
						}
					}
					
					/* On parcourt la grille case par case. Pour chaque case on regarde les possibilite en fonction de numéro déja remplis. Si plusieurs numero possible on le choisit au hasard*/
					for (var y = 1; y <= 9; y++)
					{
						for (var x = 1; x <= 9; x++)
						{
							var possibilites = new Array();
							var index = 0;
		
							for (var k = 1; k <= 9; k++)
							{
								if (!lignes[y][k]) continue;
								if (!colonnes[x][k]) continue;
								if (!carres[Math.ceil(y/3)][Math.ceil(x/3)][k]) continue;
		
								possibilites[index] = k;
								index++;
							}
		
							if (possibilites.length == 0) continue outerwhile;
		
							var nb = possibilites[Math.floor((Math.random() * possibilites.length))];
							grille[y][x] = nb;
							lignes[y][nb] = undefined;
							colonnes[x][nb] = undefined;
							carres[Math.ceil(y/3)][Math.ceil(x/3)][nb] = undefined;
						}
					}
		
					grille_complete = true;
				}
		
				if (grille_complete)
				{
					var cases_a_vider = new Array();
					for (var i = 1; i <= 81; i++)
					{
						if (i <= nb_case_vide) cases_a_vider[i] = true;
						else cases_a_vider[i] = false;
					}
					cases_a_vider = Sudoku.shuffle(cases_a_vider);
		
					var count = 0;
		
					for (var i = 1; i <= 9; i++) {
						for (var j = 1; j<= 9; j++) {
							var cases = i+"-"+j;
							count++;
							var el = document.getElementById(cases);
							el.innerHTML = cases_a_vider[count] ? "" : grille[i][j];
							var classe = cases_a_vider[count] ? "empty" : "full";
							el.classList.add(classe);
						}	
					}
		
				}
				
				
				
				/*else
				{
					var today = new Date;
		
					document.getElementById("resultat").style.display = 'none';
					document.getElementById("erreur").style.display = 'block';
					document.getElementById("erreur").innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " : Echec apr&egrave;s " + nb_max_loop + " tentatives.";
				}*/
			},
			init : function () {
				Sudoku.generate();
				document.getElementById("menu").style.display="none";
				document.getElementById("game").style.display= "block";
			},
			
			easygame : function () {	
				nb_case_vide = 20;	
				Sudoku.init();
			},
			
			mediumgame : function () {
				nb_case_vide = 40;
				Sudoku.init();

			},
			
			hardgame : function () {
				nb_case_vide = 60;
				Sudoku.init();

			},
			
			backmenu : function () {
				document.getElementById("menu").style.display="block";
				document.getElementById("game").style.display= "none";
	
			},
			
			myListenerEvent : function (element,callback) {
				var el=document.getElementById(element);
				if(callback) {
					el.addEventListener('click',callback,false);
				}
				else return;
			},
	
			initEvent : function () {
				Sudoku.myListenerEvent("easy",Sudoku.easygame);
				Sudoku.myListenerEvent("medium",Sudoku.mediumgame);
				Sudoku.myListenerEvent("hard",Sudoku.hardgame);
				Sudoku.myListenerEvent("backmenu",Sudoku.backmenu);
			},
	};
