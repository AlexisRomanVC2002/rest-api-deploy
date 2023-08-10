document.addEventListener("DOMContentLoaded", () => {
  const SECTION_LANGUAGES = document.querySelector("#section-languages");
  const ENDPOINT_BASE = "http://localhost:3000/api";

  async function getLanguages() {

    let response;

    try {
      response = await fetch(`${ENDPOINT_BASE}/languages`);
    } catch (e) {
      console.error(`Error: ${e.error}`);
      return;
    }

    const json = await response.json();
    return json;
  }

  async function removeLanguage(id) {

    let response;

    try {
      response = await fetch(`${ENDPOINT_BASE}/languages/${id}`, {
        method: "DELETE"
      });
    } catch (e) {
      console.error(`Error: ${e.error}`);
      return;
    }
    return response;

  }

  function createCardHTML(id, logo, name, authors, paradigms) {
    return `
        <div class="card-language" data-id="${id}">
                <header>
                    <img class="logo-header-language" src="${logo}" />
                    <p>${name}</p>
                </header>
                <hr />
                <main>
                    <p><span>Autores: </span>${authors.join(", ")}</p>
                    <p><span>Paradigmas: </span>${paradigms.join(", ")}</p>
                </main>
                <footer>
                    <button class="button-remove">Eliminar</button>
                </footer>
            </div>
        `;
  }

  async function createUI() {
    const languages = await getLanguages();
    const cards = document.createElement("section");
    cards.classList.add("cards-languages");

    const html = languages
      .map((language) => {
        const { id, logo, name, authors, paradigms } = language;
        return createCardHTML(id, logo, name, authors, paradigms);
      })
      .join("");

    cards.innerHTML = html;
    SECTION_LANGUAGES.appendChild(cards);

    const buttonRemove = document.querySelectorAll(".button-remove");

    buttonRemove.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const card = e.target.closest(".card-language");
        if (card) {
          const response = await removeLanguage(card.dataset.id);
          if(response.ok){
            card.remove();
          }
        }
      });
    });
  }

  createUI();
});
