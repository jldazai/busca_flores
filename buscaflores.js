var tablero = [[],[],[],[],[],[],[],[],[],[]];
var visible = [[],[],[],[],[],[],[],[],[],[]];

var per=0,gan=0,jug=0;
if(localStorage.getItem("perdidas")!=null){
    per=localStorage.getItem("perdidas");
}
if(localStorage.getItem("ganadas")!=null){
    gan=localStorage.getItem("ganadas");
}
if(localStorage.getItem("jugadas")!=null){
    jug=localStorage.getItem("jugadas");
}


function max(num1,num2){
    if(num1>num2){
        return num1;
    }
    else{
        return num2;
    }
}
function min(num1,num2){
    if(num1<num2){
        return num1;
    }
    else{
        return num2;
    }
}
function iniciarTablero(){
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            tablero[i][j]=0;
            visible[i][j]=false;
        }
    }
    ponerMinas();
}
function ponerMinas(){
    minas = 0;
    while(minas<10){
        while(true){
            fila=Math.floor(Math.random()*(10-0));
            colu=Math.floor(Math.random()*(10-0));
            if(tablero[fila][colu]!=9){
                break;
            }
        }
        tablero[fila][colu]=9;
        for(i=max(0,fila-1);i<=min(9,fila+1);i++){
            for(j=max(0,colu-1);j<=min(9,colu+1);j++){
                if(tablero[i][j]!=9){
                    tablero[i][j]=tablero[i][j]+1;
                }
            }
        }
        minas++;
    }
}
function destaparcelda(fila,colu){
    var i,j = 0;
    if(visible[fila][colu] == false){
        visible[fila][colu] = true;
        btn = $("#"+fila+colu);
        btn.css({'background-color':'#c7ccf1'});
        btn.append(tablero[fila][colu]);
        if(tablero[fila][colu] == 0){
            for(i=max(0,fila-1);i<=min(9,fila+1);i++){
                for(j=max(0,colu-1);j<=min(9,colu+1);j++){
                    if(tablero[i][j]!=9){
                        destaparcelda(i,j);
                    } 
                }
            }
        }
    }
}
function contCeldasDestapadas(){
    num=0;
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            if(visible[i][j]){
                num++;
            }
        }
    }
    return num;
}
function jugar(fila,colu){
    
    if(tablero[fila][colu] == 9){
        visible[fila][colu] = true;
        btn = $("#"+fila+colu);
        btn.css({'background-color':'red'});
        $(".btn").prop("onclick",null);
        per++;
        jug++;
        actualizarPuntos();
        alert("perdio");
    }
    else{
        destaparcelda(fila,colu);
        if(contCeldasDestapadas() == 90){
            $(".btn").prop("onclick",null);
            gan++;
            jug++;
            actualizarPuntos();
            alert("gano");
        }
    }
}
function iniciarBotones(){
    $(".btn").remove();
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            $(".tablero").append('<button type="button" class="btn btn-default1" id="'+i+j+'" onclick="jugar('+i+','+j+')"></button>')
        }
    }
    iniciarTablero();
}
function actualizarPuntos(){  
    localStorage.setItem("perdidas",per);
    localStorage.setItem("ganadas",gan);
    localStorage.setItem("jugadas",jug);
    puntos();
}
function puntos(){
    $(".pt").remove();
    $(".partidasTotales").append('<h1 class="pt">'+jug+'</h1>');
    $(".partidasGanadas").append('<h1 class="pt">'+gan+'</h1>');
    $(".partidasPerdidas").append('<h1 class="pt">'+per+'</h1>')
}

