const axios = require('axios')
const cheerio = require('cheerio')

const newspapers = [
    {
        name: 'CarAndDriver',
        address: 'https://www.caranddriver.com/this-week-in-cars/features/g27271118/best-hybrid-electric-cars',
        base: 'https://www.caranddriver.com'
    },
    {
        name: 'WhatCar',
        address: 'https://www.whatcar.com/news/the-best-hybrid-cars-in-2021-and-one-to-avoid/n23554',
        base: 'https://www.whatcar.com'
    },
    {
        name: 'carmagazine',
        address: 'https://www.carmagazine.co.uk/car-reviews/engine-hybrid/',
        base: 'https://www.carmagazine.co.uk'
    },
    {
        name: 'automotiveworld',
        address: 'https://www.automotiveworld.com/articles/',
        base: 'https://www.automotiveworld.com'
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Hybrid")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        }).catch((err) => console.log(err))
})


exports.getNews = (req, res)=>{
    res.json(articles)
}
