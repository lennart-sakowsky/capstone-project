# MapIt

## Create custom maps

The initial idea for MapIt was to help people with hearing loss find cafes, restaurants or other places with good acoustics. The vast majority of places has very bad acoustics and Google Maps does not provide any filter for this situation. With MapIt you can make your own filters, create your own map by tagging places. 

![mocked view on app's main page](https://github.com/lennart-sakowsky/capstone-project/blob/main/mapit-frontend/src/images/lennart_sakowsky_single_screen_MOCK.jpg?raw=true)


## Overview
After registration/login users can search for a specific place using geosearch and Leaflet. Clicking on the marker opens up a page to add and remove tags for this place. By searching for a tag via an input on the main page, users can filter saved places - markers pop up on the map for all places sharing this tag. A list with all places and their tags is provided on a separate page.

## Tech Stack
JavaScript / React / PHP / Symfony / VirtualBox / Nginx / Homestead / Vagrant / Doctrine / MySQL / esri.Geocoding.Geosearch / Leaflet / React Router / styled-components / axios / PropTypes / Jest / React Tesing Library / PHPStan / npm / Composer

## Acknowledgments

* Thanks to Robin Wieruch for his concise book "The Road to React" and his useCombinedReducers hook!
* Looking for similar apps already out there, Mapstr became the main inspiration.
