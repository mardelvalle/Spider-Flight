let request = require('request');
let cheerio = require('cheerio');
let URL = require('url-parse');

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

let START_URL = "http://www.arstechnica.com";
let SEARCH_WORD = "stemming";
let MAX_PAGES_TO_VISIT = 10;

let pagesVisited = {};
let numPagesVisited = 0;
let pagesToVisit = [];
let url = new URL(START_URL);
console.log("url" + url);
let baseUrl = url.protocol + "//" + url.hostname;

app.listen(7000, function() {
  console.log('listening on 7000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html')
  console.log(res)
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaJgCiAEBmAExuAEXyAEM2AED6AEB-AECiAIBqAID;sid=48b15ddbc2bfd94e9486d11e1062b601;ac_click_type=b&ac_position=0&checkin_month=12&checkin_monthday=10&checkin_year=2018&checkout_month=12&checkout_monthday=13&checkout_year=2018&class_interval=1&dest_id=-2701757&dest_type=city&dtdisc=0&from_sf=1&group_adults=1&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&offset=0&postcard=0&raw_dest_type=city&room1=A&sb_price_type=total&search_selected=1&shw_aparth=1&slp_r_match=0&src=index&src_elem=sb&ss=Ubud%2C%20Bali%2C%20Indonesia&ss_all=0&ss_raw=u&ssb=empty&sshis=0&';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');``
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                // hotelJson.complete = hotelelement.innerText;
                // hotelJson.details = hotelelement.$$eval('a', a => a.href); trying to get the link
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if(hotelelement.querySelector('strong.price')){
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception){

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });
    console.dir(hotelData);
})();


// let bookingUrl = 'https://booking.kayak.com/flights/NYC-BOS/2018-11-19/2018-12-06';
// (async () => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1920, height: 926 });
//     await page.goto(bookingUrl);
//
//     // get hotel details
//     let hotelData = await page.evaluate(() => {
//         let hotels = [];
//         // get the hotel elements
//         let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');``
//         // get the hotel data
//         hotelsElms.forEach((hotelelement) => {
//             let hotelJson = {};
//             try {
//                 hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
//                 hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
//                 hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
//                 if(hotelelement.querySelector('strong.price')){
//                     hotelJson.price = hotelelement.querySelector('strong.price').innerText;
//                 }
//             }
//             catch (exception){
//
//             }
//             hotels.push(hotelJson);
//         });
//         return hotels;
//     });
//
//     console.dir(hotelData);
// })();



  // Make the request
//  console.log("Visiting page " + url);
