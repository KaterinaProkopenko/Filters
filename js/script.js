const filters = ['Grayscale', 'Saturate', 'Sepia', 'Invert', 'Contrast', 'Brightness', 'Blur', 'Hue Rotate'];

// Function to view an image
function getImage(){    
    const input = document.getElementById('img');
    let fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){
        let img = document.getElementById("image-to-change");
        img.src = event.target.result;
    }

    const sectionFilters = document.getElementById('filters');
    sectionFilters.classList.add('filters');
    document.querySelector('section.image').style = "height: 60%; align-items: flex-end;";

    // create name of filters and input
    for(let i = 0; i < filters.length; i++){
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('container-filter');
        sectionFilters.appendChild(filterContainer);

        const pFilter = document.createElement('p');
        pFilter.classList.add('filter');
        filterContainer.appendChild(pFilter);
        pFilter.innerHTML += filters[i];

        const inputFilter = document.createElement('input')

        if(filters[i] == 'Blur' || filters[i] == 'Hue Rotate'){
            inputFilter.type = 'number';
        } else {
            inputFilter.type = 'range';
        }

        if (filters[i].indexOf(" ")){
            inputFilter.id = filters[i].toLowerCase().replace(" ", "-");
            inputFilter.name = filters[i].toLowerCase().replace(" ", "-");
        }else {
            inputFilter.id = filters[i].toLowerCase();
            inputFilter.name = filters[i].toLowerCase();
        }

        inputFilter.classList.add('input-filter');
        pFilter.onclick = function() {showInput(inputFilter.id)};
        inputFilter.onclick = function() {makeFilter(inputFilter.id)};

        inputFilter.min = 0;
        inputFilter.max = 100;

        inputFilter.value = 0;

        filterContainer.appendChild(inputFilter);
    }
}

// Function to show input of filter
function showInput(id){
    const container = document.querySelectorAll(".input-filter");

    container.forEach((element, index) =>{
        element.style.display = "none";
    })
    
    document.getElementById(id).style.display = 'inline-block';
}

// Function to make a filter
function makeFilter(name){
    const getInputFilter = document.getElementById(name);
    getInputFilter.addEventListener('input', function(){
        let value = getInputFilter.value;
        
        if(name == "blur"){
            document.getElementById('image-to-change').style.filter = name + "(" + value + "px)";
        }else if(name == "hue-rotate"){
            document.getElementById('image-to-change').style.filter = name + "(" + value + "deg)";
        } else {
            document.getElementById('image-to-change').style.filter = name + "(" + value + "%)";
        }
    });
}