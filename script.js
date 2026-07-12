let valori = JSON.parse(localStorage.getItem("trendValues")) || [];


function aggiungiValore(){

    const menu = document.getElementById("menuTrend");

    menu.style.display="block";
    menu.selectedIndex=0;
}



function gestisciMenu(){

    const menu=document.getElementById("menuTrend");


    if(menu.value==="add"){


        if(valori.length>=4){
            alert("Hai già inserito 4 valori.");
            menu.style.display="none";
            return;
        }


        let v=prompt("Inserisci percentuale (0-100):");


        if(v===null){
            menu.style.display="none";
            return;
        }


        v=v.replace("%","");
        v=Number(v);



        if(isNaN(v)||v<0||v>100){

            alert("Valore non valido.");
            menu.style.display="none";
            return;

        }


        valori.push(v);

        salva();

        aggiornaGrafico();

    }



    if(menu.value==="remove"){


        valori.pop();

        salva();

        aggiornaGrafico();

    }



    if(menu.value==="reset"){

        valori=[];

        salva();

        aggiornaGrafico();

    }


    menu.style.display="none";

}





function salva(){

    localStorage.setItem(
        "trendValues",
        JSON.stringify(valori)
    );

}






function aggiornaGrafico(){


    const svg=document.querySelector(".trend");


    svg.innerHTML="";


    const larghezza=2000;
    const altezza=400;



    // GRIGLIA ORIZZONTALE

    for(let i=0;i<=5;i++){


        let linea=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );


        linea.setAttribute("x1",0);
        linea.setAttribute("x2",2000);

        linea.setAttribute("y1",i*80);
        linea.setAttribute("y2",i*80);


        linea.setAttribute("stroke","black");
        linea.setAttribute("stroke-width","1");
        linea.setAttribute("opacity","0.25");


        svg.appendChild(linea);

    }



    if(valori.length===0)
        return;




    const passo=350;


    let punti=[];



    valori.forEach((v,i)=>{


        punti.push({

            x:(i*passo)+125,

            y:altezza-(v/100)*altezza

        });


    });





    // LINEE TREND

    for(let i=0;i<punti.length-1;i++){


        let linea=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );


        linea.setAttribute("x1",punti[i].x);
        linea.setAttribute("y1",punti[i].y);

        linea.setAttribute("x2",punti[i+1].x);
        linea.setAttribute("y2",punti[i+1].y);


        linea.setAttribute("stroke-width","5");
        linea.setAttribute("stroke-linecap","round");


        if(valori[i+1]>valori[i])
            linea.setAttribute("stroke","green");
        else
            linea.setAttribute("stroke","red");



        svg.appendChild(linea);

    }






    // PUNTI

    punti.forEach(p=>{


        let cerchio=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );


        cerchio.setAttribute("cx",p.x);
        cerchio.setAttribute("cy",p.y);

        cerchio.setAttribute("r",7);
        cerchio.setAttribute("fill","black");


        svg.appendChild(cerchio);


    });


}

window.onload=function(){

    aggiornaGrafico();

};