const categoryContainer = document.getElementById('categoryContainer');
const showNews = document.getElementById('showNews');
// const btnCategory = document.getElementById('category');

let selectedCategory = '08';

const dataLoad = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const mainData = data.data.news_category;
    showByCategory(mainData);
}

const showByCategory = (data) =>{
    data.forEach(category => { 
        const categoryButton = document.createElement('button');
        categoryButton.classList = `category px-2 py-1 rounded-md`
        categoryButton.innerText = `${category.category_name}`;
        categoryContainer.appendChild(categoryButton);
        categoryButton.addEventListener('click', ()=>{
            showNewsData(category.category_id);
        } )
    });
}

const showNewsData = async(id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    const news = data.data;
    showNewsByID(news);
}

const showNewsByID = (data) =>{
    showNews.innerHTML = ``;
    data.forEach(item => {
        console.log(item);
        const newsDiv = document.createElement('div');
        newsDiv.classList = `flex border-2 p-5 shadow-xl mb-5 items-center`;
        newsDiv.innerHTML = `
        <div class="w-[500px]">
        <img src="${item.image_url}" alt="">
        </div>
        <div class="px-10 py-5 space-y-5 flex-1">
            <h1 class="text-2xl font-bold">${item.title}</h1>
            <p class="leading-7 text-[#949494]">${item.details.slice(0,400)}...</p>
            <div class="flex justify-between pt-5">
                <div class="flex gap-2">
                    <div>
                        <img class="w-[40px] rounded-full" src="${item.author.img}" alt="">
                    </div>
                    <div>
                        <h4>${item.author.name = null ? 'User' : item.author.name}</h4>
                        <p class="text-sm text-[#949494]">Jan 10, 2022</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <i class="fa-solid fa-eye text-lg"></i>
                    <p class="text-lg font-bold">1.5M</p>
                </div>
                <div>
                    <div class="rating">
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" checked />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-arrow-right text-[#5D5FEF] text-[40px] cursor-pointer"></i>
                </div>
            </div>
        </div>`;
        showNews.appendChild(newsDiv);
    })
}

dataLoad();
showNewsData(selectedCategory); 