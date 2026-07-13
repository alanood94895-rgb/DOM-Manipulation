// Store all tabs
let tabs = [];

let activeTabId = null;


// Select elements
const tabBar = document.getElementById("tabBar");
const contentArea = document.getElementById("contentArea");
const addTabBtn = document.getElementById("addTabBtn");
const tabCount = document.getElementById("tabCount");


// Add new tab
function addTab() {

    const newTab = {
        id: Date.now(),
        name: "Tab " + (tabs.length + 1),
        content: "<p>This is new tab content.</p>"
    };


    tabs.push(newTab);

    saveTabs();

    renderTabs();

    switchTab(newTab.id);
}


// Display tabs
function renderTabs() {

    tabBar.innerHTML = "";

    tabCount.textContent = 
        "Number of Tabs: " + tabs.length;


    tabs.forEach(tab => {

        const tabButton = document.createElement("div");

        tabButton.className = "tab-btn";

        tabButton.dataset.tabId = tab.id;


        if(tab.id === activeTabId){
            tabButton.classList.add("active");
        }


        tabButton.innerHTML = `
            <span>${tab.name}</span>

            <button class="rename-btn">✎</button>

            <button class="delete-btn">✗</button>
        `;


        tabBar.appendChild(tabButton);

    });


    if(tabs.length === 0){

        contentArea.innerHTML =
        "No tabs available. Click 'Add Tab' to create one.";

    }

}


// Switch tab
function switchTab(tabId) {

    activeTabId = tabId;


    const tab = tabs.find(
        t => t.id === tabId
    );


    if(!tab) return;


    renderTabs();


    contentArea.innerHTML = tab.content;

}



// Rename tab
function renameTab(tabId,newName) {

    const tab = tabs.find(
        t => t.id === tabId
    );


    if(tab){

        tab.name = newName;

        saveTabs();

        renderTabs();

    }

}


// Delete tab
function deleteTab(tabId) {


    tabs = tabs.filter(
        tab => tab.id !== tabId
    );


    saveTabs();


    if(activeTabId === tabId){

        if(tabs.length > 0){

            switchTab(tabs[0].id);

        }else{

            activeTabId = null;

            renderTabs();

        }

    }else{

        renderTabs();

    }

}



// Save tabs to localStorage
function saveTabs(){

    localStorage.setItem(
        "tabsData",
        JSON.stringify(tabs)
    );

}


// Load tabs from localStorage
function loadTabs(){


    const data =
    localStorage.getItem("tabsData");


    if(data){

        tabs = JSON.parse(data);

    }
    else{

        tabs = [
            {
                id: Date.now(),
                name:"Home",
                content:"<p><b>Welcome to the dashboard!</b></p>"
            }
        ];

    }


    renderTabs();


    if(tabs.length > 0){

        switchTab(tabs[0].id);

    }

}



// Event delegation
tabBar.addEventListener("click",function(event){


    const tabButton =
    event.target.closest(".tab-btn");


    if(!tabButton) return;


    const id =
    Number(tabButton.dataset.tabId);



    if(event.target.classList.contains("rename-btn")){


        const newName =
        prompt("Enter new tab name");


        if(newName && newName.trim() !== ""){

            renameTab(id,newName);

        }


    }


    else if(event.target.classList.contains("delete-btn")){


        deleteTab(id);


    }


    else{


        switchTab(id);


    }


});



// Add button
addTabBtn.addEventListener(
    "click",
    addTab
);



// Load data when page opens
loadTabs();