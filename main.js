let num1 = 0;
function popupmenu() {
    let rotater = document.querySelector(".menubtn-bar");
    let cross = document.querySelector(".bar");
    let menu = document.querySelector(".menuitems");
    let overlay = document.querySelector(".nextoverlay");
    let icon = document.getElementById('changeclas');

    cross.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    rotater.classList.toggle("active");
    if(num1==0){
        icon.className='fas fa-times';
        num1=1;
    }
    else if(num1==1){
        icon.className='fas fa-ellipsis-v';
        num1=0;
    }  
}

// heaader till this. Add code next to this.


const allbtns = document.querySelectorAll('.btn');

let size = 0;
let color = 0;

allbtns.forEach(butn => {
    butn.addEventListener('click', () => {
        butn.classList.toggle('active');

        let command = butn.dataset['element'];
        if(command == 'foreColor'){
            if(color == 0){
                document.execCommand(command, false, 'rgb(253, 255, 112)');
                color = 1;
            }
            else{
                document.execCommand(command, false, 'white');
                color = 0;
            }
            
        }
        else if(command == 'fontSize'){
            
            if(size == 0){
                document.execCommand(command, false, 5);
                size = 1;
            }
            else{
                document.execCommand(command, false, 4);
                size = 0;
            }
        }
        else
            document.execCommand(command, false, null);
    });
});

function openPopup() {
    const popup = document.querySelector('.savepopup');
    const overlay = document.querySelector('.overlay');
    popup.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSpecific() {
    openPopup();
}

function savedata() {
    const source = document.querySelector('.content').innerHTML;
    localStorage.setItem('textData', source);
    openPopup();
}

function saveSpecificData() {
    const filename = document.querySelector('.filename').value;
    const source = document.querySelector('.content').innerHTML;
    let allFilesData = {
        
    };
    allFilesData[1] = {
        name:filename,
        data:source
    }
    console.log(allFilesData);
}


function renderer() {
    document.querySelector('.content').innerHTML = localStorage.getItem('textData');
}

renderer();