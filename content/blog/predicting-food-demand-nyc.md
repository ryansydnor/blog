+++
date = "2018-11-05T12:24:42-04:00"
title = "Predicting Cuisine Demand in NYC using the Weather"
description = "An analysis using predictive models to understand how weather will affect demand for specific cuisines in New York City."
+++

<style>
.grid {
  background: #FFF;
}

/* clear fix */
.grid:after {
  content: '';
  display: block;
  clear: both;
}

/* ---- .grid-item ---- */

.grid-sizer,
.grid-item {
  width: 30.333%;
}

.grid-item {
  float: left;
  margin-bottom:10px;
}

.grid-item img {
  display: block;
  width: 100%;
}

</style>



[Raga Kolli](https://www.linkedin.com/in/ragakolli/), [Giselle Lewars](https://www.linkedin.com/in/gisellelewars/), [Emily Shaw](https://www.linkedin.com/in/emily-shaw-303a0978/), and I were brainstorming one Fall evening around dinner time about how to combine datasets in the wild to reach new and interesting insights. As the conversation drifted towards the topic of food - we were struck with inspiration.

What if the weather affected what foods people were eating? What if we could help restaurant owners understand how to staff and stock their business based purely on next week's weather forecast? So we dug in.

## Collect Data

We set out to collect a full calendar year of daily granularity data. We turned to the following sources and combined the results into a single data set:

1. Weather - [National Centers for Environment Information]()
2. Demand - [Google Trends](https://trends.google.com/trends/?geo=US)
3. Cuisines - [NYC Department of Health](http://a816-restaurantinspection.nyc.gov/RestaurantInspection/SearchBrowse.do)

*We were able to manually collect weather and cuisine data through web interfaces, but wrote some [custom code](https://github.com/ryansydnor/ddp-weather-cuisine) to pull from the Google Trends API*

## Clean Data

How do you compare 1 degree of temperature change with 1 inch of precipitation? You normalize! How do you create a decision tree with a range of values from 0-100? You convert into categories! How do you control for seasonality? You create dummy variables! After spending some time cleaning our data, we were ready to move on to the analysis.

*Caveat: Google Trends data shows demand to the time frame queried and will not show daily granularity for a query longer than 6 months. This means we had to stick two separate results together, leading to a slightly skewed result.*

## Develop Models

We used two primary models to interpret our data:

1. Linear Regression per Cuisine
2. Decision Tree per Cuisine

## Insights

We found that certain foods appear to be seasonal and correlated to weather (i.e. Mexican) and others have no correlation (i.e. Pizza).

For example, we found that 1 inch of precipitation increases demand for Soup by 5%. We also found that 1 degree of temperature change effects Mexican food demand by 1%! How cool is that?!

However, our highest r-squared was ~.5, meaning that it is difficult to draw strong conclusions from these results.

## Productionalize

We imagined what an app might do if we were to move forward with this concept and provide a service to restaurant owners. It would likely take weather predictions for the next week and send notifications to the owner telling them how to scale their operations.

If you want to try out a prototype for yourself, click on your favorite cuisine below, enter your expected weather conditions, and see how the demand for that cuisine will change!


<div class="grid">
  <div class="grid-sizer"></div>
  <div class="grid-item american">
    <a href="https://bigml.com/shared/predict/model/zzrnEDeYE7qyxd8qs5ikkGgqNHT" target="_blank">
        <img src="https://cdn2.wanderlust.co.uk/media/1782/lists-3-traditional-american-burger-recipes-from-3-different-states.jpg" />
    </a>
  </div>
  <div class="grid-item chinese">
    <a href="https://bigml.com/shared/predict/model/lswbwGD2TiHsxZFr8vGEM1YYV1Z" target="_blank">
    <img src="https://melmagazine.com/wp-content/uploads/2018/08/18bHwEce1IinWYd5PXH_UaQ.jpeg" />
    </a>
  </div>
  <div class="grid-item pizza">
    <a href="https://bigml.com/shared/predict/model/bPnYf28RhKozbUVAOlZvwM00oyI" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg" />
    </a>
  </div>
  <div class="grid-item italian">
    <a href="https://bigml.com/shared/predict/model/oHlr47QomuVJXvWGA2s9opklA5D" target="_blank">
    <img src="https://twistedsifter.files.wordpress.com/2011/09/italy-flag-made-from-food.jpg" />
    </a>
  </div>
  <div class="grid-item mexican">
    <a href="https://bigml.com/shared/predict/model/mqPLXIyCTVi3MTfkoEWRr9SG3ee" target="_blank">
    <img src="https://cdnimg.webstaurantstore.com/images/products/large/20585/19903.jpg" />
    </a>
  </div>
  <div class="grid-item japanese">
    <a href="https://bigml.com/shared/predict/model/dlRfPldxFwPb5EoFE5LQyfJBkSp" target="_blank">
    <img src="https://i.pinimg.com/originals/0b/1a/2f/0b1a2f0dc3132a3aed1aea0d2ac52420.jpg" />
    </a>
  </div>
  <div class="grid-item latin">
    <a href="https://bigml.com/shared/predict/model/qOWoW9HOZ86VYVUTt9HUnB41H6Z" target="_blank">
    <img src="https://www.jupitermag.com/sites/default/files/upfront/originalimages/sabor-y-vino-latin-food.jpg" />
    </a>
  </div>
  <div class="grid-item caribbean">
    <a href="https://bigml.com/shared/predict/model/oJn4h2jqXtFOv7G1yN7i1ZCpihH" target="_blank">
    <img src="https://www.saveur.com/sites/saveur.com/files/styles/1000_1x_/public/caribbean-food_2000x1500.jpg?itok=c9Q36EBa" />
    </a>
  </div>
  <div class="grid-item spanish">
    <a href="https://bigml.com/shared/predict/model/jgo624AFiGlFMNySVe8SxDhbYwr" target="_blank">
    <img src="https://i.pinimg.com/originals/a2/c5/16/a2c516dea7b88b3e40ab23dfc8062e62.jpg" />
    </a>
  </div>
  <div class="grid-item sandwiches">
    <a href="https://bigml.com/shared/predict/model/iShRYEmjaDfzZkUZs3MuXOBFWjJ" target="_blank">
    <img src="https://smittenkitchendotcom.files.wordpress.com/2009/02/steak-sandwiches.jpg" />
    </a>
  </div>
</div>


## Conclusion

This was our first foray into combining these various data sources together to draw conclusions. If we were to do it again, we'd look for more reliable signals of food demand (Yelp, POS systems, etc.). We'd also try and pull larger data sets to help offset outliers. 

Let us know if you have any questions in the comments!



<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.js"></script>

<script type="text/javascript">
var grid = document.querySelector('.grid');
var msnry;

imagesLoaded( grid, function() {
  // init Isotope after all images have loaded
  msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10,
    transitionDuration: '0.8s'
  });
});



</script>

