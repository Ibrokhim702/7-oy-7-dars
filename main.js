const wrapper = document.querySelector("#box");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const modal = document.createElement("div");
modal.classList.add("hidden", "fixed", "top-0", "left-0", "w-full", "h-full", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center");
document.body.appendChild(modal);

const API_ALL = "https://restcountries.com/v3.1/all";
const API_Search = "https://restcountries.com/v3.1/name/";

async function renderFlags(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Bu Country topilmadi!!!");
        const data = await res.json();
        wrapper.innerHTML = "";

        data.forEach(element => {
            const countryDiv = document.createElement("div");
            countryDiv.className = "div1 shadow-sm mx-auto p-[10px] w-[260px] mt-10 rounded-xl h-[310px] flex flex-col text-center cursor-pointer";
            countryDiv.innerHTML = `
                <img class="w-[260px] h-[160px] rounded-md" src="${element.flags.png}" alt="${element.name.common} flag">
                <h2 class="h2 text-white font-bold">${element.name.common}</h2>
                <span class="h2 text-white">Capital: ${element.capital ? element.capital[0] : "Noma'lum"}</span>
                <span class="h2 text-white">Population: ${element.population.toLocaleString()}</span>
            `;
            
            countryDiv.addEventListener("click", () => openModal(element));
            wrapper.appendChild(countryDiv);
        });
    } catch (error) {
        wrapper.innerHTML = `<p class="text-red-500 text-xl">${error.message}</p>`;
    }
}

function openModal(country) {
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center relative">
            <button class="absolute top-0 right-0 text-xl p-[5px] mt-[-10px]" onclick="closeModal()">X</button>
            <img class="w-[100%] h-[200px] rounded-md" src="${country.flags.png}" alt="${country.name.common} flag">
            <h2 class="text-black font-bold text-2xl">${country.name.common}</h2>
            <p class="text-gray-700">Capital: ${country.capital ? country.capital[0] : "Noma'lum"}</p>
            <p class="text-gray-700">Population: ${country.population.toLocaleString()}</p>
            <p class="text-gray-700">Region: ${country.region}</p>
            <p class="text-gray-700">Subregion: ${country.subregion}</p>
        </div>
    `;
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

renderFlags(API_ALL);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.toLowerCase().trim();
    if (!value) {
        renderFlags(API_ALL);
    } else {
        renderFlags(API_Search + value);
    }
});

const btn = document.querySelector(".switch input");
const body = document.body;

btn.addEventListener("change", () => {
    if (btn.checked) {
        body.style.backgroundColor = "black";
        body.style.color = "white";
        document.querySelectorAll(".h2").forEach(el => el.style.color = "white");
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        document.querySelectorAll(".h2").forEach(el => el.style.color = "black");
    }
});
