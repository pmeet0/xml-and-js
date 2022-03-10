let sINFO;
let ArrayC = [];

const htmlToElement = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstChild;
};

const loadData = (path, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => {
        if (target.readyState == 4 && target.status == 200) {
            callback(target.responseXML);
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
};
  
const renderTable = (xmlData) => {
    const table = document.getElementById("mainID");

    let arrayN = [];

    if (!table) {
        throw new Error("element of table Not Found!");
    }

    const withFilters = Boolean(window.location.search);
    if (!withFilters) {

        arrayN = Array.from(xmlData.documentElement.childNodes).filter(
            ({ nodeName }) => nodeName === 'Student'
        );
        
    } else {

        const params = new URLSearchParams(window.location.search);

        const filterFTerm = params.get('filterF').toLowerCase();

        const inputControl = document.getElementById('filtertext');
        inputControl.value = filterFTerm;

        let genderFilterTerm = params.get('studentGender');

        if (genderFilterTerm == 'male')
            document.getElementById('male').checked = true;
        else {
            document.getElementById('female').checked = true;
        }
        
        const classFilterTerm = params.getAll('CampuseS');
        let minClass = 1, maxClass = 1;

        if (classFilterTerm.length > 0) {
            classFilterTerm.forEach(function(classElement) {
                if (classElement == 1) {
                    document.getElementById('campuses1').checked = true;
                    maxClass = 1;
                } else if (classElement == 2) {
                    document.getElementById('campuses2').checked = true;
                    maxClass = 2;
                } else if (classElement == 3) {
                    document.getElementById('campuses3').checked = true;
                    maxClass = 3;
                } else {
                    minClass = 1;
                    maxClass = 3;
                }

                 ArrayC.push(classElement);
            });
            
            
            minClass = Math.min(...ArrayC);
            maxClass = Math.max(...ArrayC);
        } else {
            minClass = 1;
            maxClass = 3;
        }

        const SSubjectFilterTerm = params.getAll('SSubject');
        let minFare = 1, maxFare = 1;

        if (SSubjectFilterTerm.length > 0){

            SSubjectFilterTerm.forEach(function(fareElement) {
                if (fareElement == 5201)
                    document.getElementById('Java').checked = true;
                else if (fareElement == 5202)
                    document.getElementById('XML').checked = true;
                else if (fareElement == 5210)
                    document.getElementById('os').checked = true;
                else 
                    maxFare = 500;
            });

            maxFare = Math.max(...SSubjectFilterTerm);
        } else {
            maxFare = 500;
        }

        arrayN = Array.from(xmlData.documentElement.children).filter(
            ({ attributes, children }) => 
            
                (children[1].textContent.toLowerCase().includes(filterFTerm)) &&

                (children[2].textContent.toLowerCase().trim() === genderFilterTerm) &&

                (
                    attributes['CampuseS'].value.trim() >= minClass && 
                    attributes['CampuseS'].value.trim() <= maxClass
                ) &&

                (
                    children[0].attributes['fare'].value.trim() >= minFare && 
                    children[0].attributes['fare'].value.trim() <= maxFare
                )
        );                    
    }

    if(arrayN.length <= 0) {
        document.getElementById('errorlabel').style.display = 'block';
        document.getElementById('mainID').style.display = 'none';
    } else {
        document.getElementById('errorlabel').style.display = 'none';

        const rows = arrayN.map((item) => 
            table.appendChild(
                htmlToElement(
                    `<tr>
                        <td>${item.attributes[0].textContent}</td>
                        <td>${(Array.from(item.getElementsByTagName('name'))[0]).textContent}</td>
                        <td>${(Array.from(item.getElementsByTagName('gender'))[0]).textContent}</td>
                        <td>${item.attributes[1].textContent}</td>
                        <td>${(Array.from(item.getElementsByTagName('College'))[0]).textContent}</td>
                        <td>${(Array.from(item.getElementsByTagName('College'))[0]).attributes[0].textContent}</td>
                        <td>${(Array.from(item.getElementsByTagName('College'))[0]).attributes[1].textContent}</td>
                    </tr>`
                    )
                )
            );
        }
    };
  
loadData('http://localhost:8080/project-1.xml', renderTable);

const onReset = () => {
    window.location.replace(window.location.pathname);
};