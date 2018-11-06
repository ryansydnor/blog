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

