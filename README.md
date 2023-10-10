# Daily Commit Challenge - Day 5 (Project 3)

I am challenging myself to make a commit daily. This will at the very least, get me coding daily and increasing my skills. 

Each day, I will tackle an easy/medium difficult project. I will be uploading all my code to [my GitHub profile](https://github.com/willbushie). My goal is to code daily (and hopefully make at least one commit). As long as I'm coding daily and improving my skills, then this challenge is a success.

*Please Note: These projects will sometimes have very little commits (someimtes even only one). This is for simple developemnt and I would use more commits with a higher complexity project.*

## Project Goals

This project is a simple weather app. Simple information gathered from an API will be dispayed to the page. Things like current temperature, low and high temperature for the day, 5-10 day forecast, and other useful weather information. The goal is to load this page quickly. Too many weather apps are slow when loading data, I'm aiming to avoid that. 

- [x] A location can be input to see the weather at that location (latitude and longitude).
- [ ] A location can be input to see the weather at that location (city/zip code).
- [ ] Simple and decent looking webpage to show the weather data.
- [ ] The page loads quickly.

## How To Test

Utilizing Docker, testing this code is very straightforward. The project contains a `docker-compose.yml` file which contians all configuration for the container. Just run the below commands once the code is downloaded. 

Here is the command needed to start the container:
```
$ docker-compose up -d
```

To stop and remove the container once you are done, run this command:
```
$ docker-compose down
```

To get a list of running containers, use this command: 
```
$ docker ps
```

*Note: For easy identification, the container created is called: `1009-apache-container`.*

## Steps & Time To Complete

Here are the steps I took to accomplish this project. 

1. Write the README (using a template) and create the basic files needed (10 mins).
2. Test and understand the [NOAA API](https://www.weather.gov/documentation/services-web-api) (1 hr 45 mins).
3. Show unstyled weather information on NYC (2 hrs).
4. Style the webpage to be more digestible (). 

**Total project time (including coding & research): **

## What I Learned

A list of things that I learned during this project.

- JavaScript string formatting using backticks (\`). 
- How to add HTML elements using JavaScript to existing elements. 
- How to work with dates and times using the built in `Date` object.
- Parsing JSON data in JavaScript.
- Interacting with an API with JavaScript.

## Contact

If you'd like to contact me, you can reach me at my email [here](mailto:willbushie@gmail.com).