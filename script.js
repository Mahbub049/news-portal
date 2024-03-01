const categoryContainer = document.getElementById('categoryContainer');

const dataLoad = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const mainData = data.data.news_category;
    showByCategory(mainData);
}

const showByCategory = (data) =>{
    console.log(data)
    data.forEach(category => { 
        const categoryButton = document.createElement('button');
        categoryButton.classList = `px-2 py-1 rounded-md`
        categoryButton.innerText = `${category.category_name}`;
        categoryContainer.appendChild(categoryButton);   
    });
}

dataLoad();