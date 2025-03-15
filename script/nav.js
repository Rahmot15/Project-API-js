// button section 
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

const displayCategory = (categories) => {
    const newCategoryNav = document.getElementById('categoryNav')

    for (let cat of categories) {

        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadVideoSection(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        newCategoryNav.appendChild(newDiv)
    }
}
loadCategory()



// card section 
const loadVideo = (SearchValue = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${SearchValue}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('btnAll').classList.add('active')
            displayVideo(data.videos)
        })
        showLoader()
}

const displayVideo = (videos) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";

    if (videos.length == 0) {
        cardContainer.innerHTML = `
        <div class="py-30 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="img/Icon.png" alt="" />
            <h2 class="text-2xl font-bold">
              Oops!! Sorry, There is no content here
            </h2>
        </div>
        `
        hideLoader()
        return;
    }

    videos.forEach((video) => {
        const newDivVideo = document.createElement("div")
        newDivVideo.innerHTML = `
        <div class="card bg-base-100 ">
            <figure class="relative">
                <img
                class="rounded-b-md w-full h-[270px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-5 right-6 text-white bg-slate-900 rounded px-2">3hrs 56 min ago</span>
            </figure>
            <div class="px-0 mt-5 flex gap-3">
                <div class="profile px-0">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>

                <div class="intro">
                    <h1 class="text-xl font-semibold">${video.title}</h1>
                    <div class="flex gap-1 items-center my-1">
                        <p class=" text-gray-500">${video.authors[0].profile_name}</p>
                        
                        ${video.authors[0].verified == true ? `<img class="w-6 h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``}

                    </div>
                    <p class="text-gray-500">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadDetails('${video.video_id}')" class="btn btn-block">Show details</button>
        </div>
        `

        cardContainer.appendChild(newDivVideo)
    });
    hideLoader()
}



//  loadVideo section 
const loadVideoSection = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            loadVideoActive()
            displayVideo(data.category)
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add('active')
        })
}



const loadVideoActive = () => {
    hideLoader()
    const activeButton = document.getElementsByClassName('active')
    for (let btn of activeButton) {
        btn.classList.remove('active')
    }

}



// button details 
const loadDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.video))
}

const displayDetails = (videos) => {
    console.log(videos);
    document.getElementById('btn_details').showModal()
    const btnCard = document.getElementById('card')
    btnCard.innerHTML = `
    <div class="card bg-base-100 card-md">
            <div class="card-body">
              <h2 class="card-title">${videos.title}</h2>
              <p>${videos.authors[0].profile_name}</p>
              <p>${videos.description}</p>
              
            </div>
        </div>
    `
}



// Search Button
document.getElementById('inputBtn')
    .addEventListener('keyup', (e) => {
        const input = e.target.value
        loadVideo(input)
    })




// loader
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('card-container').classList.add('hidden');
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('card-container').classList.remove('hidden');
}