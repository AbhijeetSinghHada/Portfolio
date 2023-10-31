import projects from "../data/projects/project_details.json" assert { type: "json" };
import icons from "../data/icons/icons.json" assert { type: "json" };

let projectData = document.getElementById("project-data");
let projectImage = document.getElementById("project-image");
let projectLink = document.getElementById("project-link");
let prevButton = document.getElementsByClassName("prev-btn")[0];
let nextButton = document.getElementsByClassName("next-btn")[0];

prevButton.addEventListener("click", () => {
    displayProject();
    clearInterval(projectInterval);
});
nextButton.addEventListener("click", () => {
    displayProject();
    clearInterval(projectInterval);
});

let currentProject = 0;
function displayProject() {
    if (event.target.parentNode.classList.contains("prev-btn")) {
        const index = checkIndex(currentProject--);
        renderProject(index);
    } else {
        const index = checkIndex(currentProject++);
        renderProject(index);
    }
}
function renderProject(index) {
    projectData.innerHTML = formatHtmlProject(projects.data[index]);
    projectImage.src = projects.data[index].image;
    projectLink.href = projects.data[index].link;
}
function checkIndex(index) {
    if (index < 0) {
        currentProject = projects.data.length - 1;
    } else if (index == projects.data.length - 1) {
        currentProject = 0;
    }
    return currentProject;
}

function formatHtmlProject(project) {
    return `<h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" id="project-link">View Project</a>`;
}
function loadIcons() {
    let icon_element = document.getElementById("icons");
    console.log(icon_element);
    for (let i = 0; i < icons.length; i++) {
        icon_element.insertAdjacentElement(
            "beforeend",
            formatHtmlIcon(icons[i])
        );
    }
}
function formatHtmlIcon(icon) {
    let icon_element = document.createElement("img");
    icon_element.src = icon;
    icon_element.id = "icon";
    return icon_element;
}

loadIcons();
var projectInterval = setInterval(() => {
    renderProject(checkIndex(currentProject++));
}, 3000);
