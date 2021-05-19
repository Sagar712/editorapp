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

// green faint:-  rgb(175, 255, 206)
sessionStorage.setItem("currentFile", "NONE");

function printOption() {
    const filename = document.getElementById('textItems').value;
    let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
    sessionStorage.setItem('currentFile', filename);
    let i=1;
    
    while(AllTextItems[i]!=null){
        //console.log(filename + " <--> " + AllTextItems[i].name);
        if(filename === AllTextItems[i].name){
            document.querySelector('.content').innerHTML = AllTextItems[i].data;
            animatToast(`"${filename}" loaded successfully`, "rgb(175, 255, 206)");
            break;
        }
        i++;
    }
    document.querySelector('.pushinto').innerHTML = 
    `<div class="delbtn" onclick="DeleteItem('${filename}')"> Delete "${filename}" </div>`
    
}

function DeleteItem(itemName) {
    console.log(itemName + " deleted");
    if(confirm("Confirm deletion?")){
        let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
        let deltion = {

        };
        let num=1;
        let i=1;
        while(AllTextItems[i]!=null){
            if(itemName == AllTextItems[i].name){
                
            }
            else{
                deltion[num++] = AllTextItems[i];
            }
            i++;
        }
        localStorage.setItem('AllTextItems', JSON.stringify(deltion));

        console.log(deltion);
        animatToast("Deleted successfully!", "pink");
        renderer();
    }
    else{
        animatToast("Calcelled deletion!", "pink");
    }
}

function animatToast(msg, bgColor) {
    const toastNote = document.querySelector('.toastNotify');
    if(toastNote.classList = "toastNotify animate")
        toastNote.classList.remove('animate');
    toastNote.innerHTML = msg;
    toastNote.style.backgroundColor = bgColor;
    toastNote.classList.add('animate');
    setTimeout(() => {
        toastNote.classList.remove('animate');
    }, 2000);
    //console.log(firsttime+" "+toastNote.classList);
}

function newFile() {
    document.querySelector('.content').innerHTML = "";
    animatToast("New file created", "azure");
    sessionStorage.setItem("currentFile", "NONE");
    let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
    let Str = '<option value="select"> Select file </option>';
    let i=1;
    if(localStorage.getItem('AllTextItems')==null){
        let allFilesData = {
        
        };
        localStorage.setItem('AllTextItems', JSON.stringify(allFilesData));
    }
    while(AllTextItems[i]!=null){
        i++;
    }
    for (let index = 1; index < i; index++) {
        const element = AllTextItems[index].name;
        Str = Str.concat(`<option value="${element}"> ${element}</option>`);
    }
    
    document.getElementById('textItems').innerHTML = Str;
    document.querySelector('.pushinto').innerHTML="";
}

const allbtns = document.querySelectorAll('.btn');
let size = 0;
let color = 0;

allbtns.forEach(butn => {
    butn.addEventListener('click', () => {
        let command = butn.dataset['element'];
        if(command == 'foreColor'){
            if(color == 0){
                document.execCommand(command, false, 'rgb(253, 255, 112)');
                butn.style.color = 'yellow';
                color = 1;
            }
            else{
                document.execCommand(command, false, 'white');
                butn.style.color = 'white';
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
    if(sessionStorage.getItem("currentFile")=="NONE"){
        const popup = document.querySelector('.savepopup');
        const overlay = document.querySelector('.overlay');
        popup.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    else{
        const popup = document.querySelector('.confirmpopup');
        const overlay = document.querySelector('.overlay2');
        popup.classList.toggle('active');
        overlay.classList.toggle('active');
        const filename = sessionStorage.getItem('currentFile');
        const source = document.querySelector('.content').innerHTML;
        let i =1;
        let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
        while(AllTextItems[i]!=null){
            if(filename == AllTextItems[i].name){
                AllTextItems[i] = {
                    name:filename,
                    data:source
                }
                break;
            }
            i++;
        }
        console.log(AllTextItems);
        localStorage.setItem('AllTextItems', JSON.stringify(AllTextItems));
    }
    
}

function closeSpecific() {
    openPopup();
    
}
function closeSpecific2() {
    openPopup();
    animatToast("Changes saved !", "rgb(175, 255, 206)");
}
function savedata() {
    const source = document.querySelector('.content').innerHTML;
    localStorage.setItem('textData', source);
    openPopup();
    animatToast("Temp file saved !", "rgb(175, 255, 206)");
}

function saveSpecificData() {
    const filename = document.querySelector('.filename').value;
    const source = document.querySelector('.content').innerHTML;
    let i =1;
    if(localStorage.getItem('AllTextItems')!=null){
        let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
        while(AllTextItems[i]!=null){
            console.log(i);
            i++;
        }
        AllTextItems[i] = {
            name:filename,
            data:source
        }
        console.log(AllTextItems);
        localStorage.setItem('AllTextItems', JSON.stringify(AllTextItems));
    }
    else{
        
        let allFilesData = {
        
        };
        allFilesData[1] = {
            name:filename,
            data:source
        };
        console.log(allFilesData);
        localStorage.setItem('AllTextItems', JSON.stringify(allFilesData));
    }
    openPopup();
    renderer();
    animatToast("File saved !", "rgb(175, 255, 206)");
}


function renderer() {
    document.querySelector('.content').innerHTML = localStorage.getItem('textData');
    let AllTextItems = JSON.parse(localStorage.getItem('AllTextItems'));
    let Str = '<option value="select"> Select file </option>';
    let i=1;
    if(localStorage.getItem('AllTextItems')==null){
        let allFilesData = {
        
        };
        localStorage.setItem('AllTextItems', JSON.stringify(allFilesData));
    }
    while(AllTextItems[i]!=null){
        i++;
    }
    for (let index = 1; index < i; index++) {
        const element = AllTextItems[index].name;
        Str = Str.concat(`<option value="${element}"> ${element}</option>`);
    }
    
    document.getElementById('textItems').innerHTML = Str;
}

renderer();