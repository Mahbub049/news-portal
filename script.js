const categoryContainer = document.getElementById('categoryContainer');
const showNews = document.getElementById('showNews');
const totalItems = document.getElementById('totalItems');
const todaysPick = document.getElementById('todaysPick');
const trending = document.getElementById('trending');
// const btnCategory = document.getElementById('category');
let totalNews;
let selectedCategory = '08';
let todaysPickClicked = false;
let trendingClicked = false;

// Add an event listener to the "Today's Pick" button
todaysPick.addEventListener('click', () => {
    todaysPickClicked = true;
    showNewsData(selectedCategory, todaysPickClicked, trendingClicked);
});

trending.addEventListener('click', () => {
    trendingClicked = true;
    showNewsData(selectedCategory, todaysPickClicked, trendingClicked);
});

const dataLoad = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const mainData = data.data.news_category;
    showByCategory(mainData);
}

const showByCategory = (data) =>{
    data.forEach(category => { 
        const categoryButton = document.createElement('button');
        categoryButton.classList = `category catClass px-2 py-1 rounded-md`
        categoryButton.innerText = `${category.category_name}`;
        categoryContainer.appendChild(categoryButton);
        categoryButton.addEventListener('click', ()=>{
            showNewsData(category.category_id);
            const btns = document.getElementsByClassName('catClass');
            for(const btn of btns){
                    btn.classList.remove('text-[#5D5FEF]')
                    btn.classList.add('text-[#858585]')
                }
                categoryButton.classList.add('text-[#5D5FEF]')
                categoryButton.classList.remove('text-[#858585]')

        } )
    });
}

const showNewsData = async(id, todaysPickClicked, trendingClicked) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    const news = data.data;
    selectedCategory = id;
    if (todaysPickClicked) {
        const todaysPickNews = news.filter(item => item.others_info.is_todays_pick);
        showNewsByID(todaysPickNews);
    }
    else if(trendingClicked){
        const trendingNews = news.filter(item => item.others_info.is_trending);
        console.log(trendingNews);
        showNewsByID(trendingNews);
    }
    else {
        showNewsByID(news);
    }
}

const showNewsByID = (data) =>{
    showNews.innerHTML = ``;
    totalNews = 0;
    data.forEach(item => {
        const convertDate = (providedDate) =>{
            const newDate = new Date(providedDate);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              
              const year = newDate.getFullYear();
              const month = months[newDate.getMonth()];
              const day = newDate.getDate();
              
              return `${month} ${day}, ${year}`;
        }
        totalNews++;
        totalItems.innerText = totalNews;
        const newsDiv = document.createElement('div');
        newsDiv.classList = `flex border-2 p-5 shadow-xl mb-5 items-center`;
        newsDiv.innerHTML = `
        <div class="w-[244px]">
        <img src="${item.thumbnail_url}" alt="">
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
                        <p class="text-sm text-[#949494]">${convertDate(item.author.published_date)}</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <i class="fa-solid fa-eye text-lg"></i>
                    <p class="text-lg font-bold">${item.total_view}</p>
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
showNewsData(selectedCategory, todaysPickClicked, trendingClicked); 