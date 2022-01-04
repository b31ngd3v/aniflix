# Aniflix &nbsp;![Build Status](https://camo.githubusercontent.com/4e084bac046962268fcf7a8aaf3d4ac422d3327564f9685c9d1b57aa56b142e9/68747470733a2f2f7472617669732d63692e6f72672f6477796c2f657374612e7376673f6272616e63683d6d6173746572)  &nbsp;[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Stream animes for free without any interruption.

  - Free $0
  - Ad Free
  - Open Source
  - 99.89% uptime

## Preview

<p>
<img src="https://raw.githubusercontent.com/b31ngd3v/aniflix/master/.github/images/2022-01-04_15-51.png?token=APN4FWA5AHVP2MGQYWPMOF3B2QQPA" alt="Desktop view" height=385px />
&nbsp;
<img src="https://raw.githubusercontent.com/b31ngd3v/aniflix/master/.github/images/Screenshot_20220104-155319_Chrome.jpg?token=APN4FWHTUK6PRLBRCT43DNDB2QQPA" alt="Mobile view" height=400px />
</p>

Main Server : https://aniflix.eu.org (Replit)

Backup Server : https://www.aniflix.eu.org (AWS)

## New Features!

  - Continue watching from where you left off
  - Mobile support
  - PWA (progressive web app)

You can also:
  - Search for a specific anime
  - Change quality of the video/episode
  - Change speed of the video/episode

## Tech

Aniflix uses a number of open source projects to work properly:

* [Next.js](https://nextjs.org/) - Next.js is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites.
* [Docker](https://www.docker.com/) - Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
* [Tailwind CSS](https://tailwindcss.com/) - Tailwind CSS is basically a utility-first CSS framework for rapidly building custom user interfaces.

And of course Aniflix itself is open source with a [public repository](https://github.com/b31ngD3v/aniflix)
 on GitHub.
 

## Deployment

First Clone this repo with this command and cd into the folder.
```bash
git clone https://github.com/b31ngd3v/aniflix
cd aniflix
```
### Run with Docker (Mac & Linux)
First make sure docker is installed in your system, then to deploy this project run

```bash
./start.sh
```

### Run with Docker (Windows)
First make sure docker is installed in your system, then to deploy this project run

```bash
docker build . -t b31ngd3v/aniflix:1.0
docker run -p 80:3000 b31ngd3v/aniflix:1.0
```

### Run with npm
First make sure nodejs is installed in your system, then to deploy this project run

```bash
npm ci
npm run build
npm start
```


## API Reference

#### Search anime

```bash
GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `keyword` | `str` | **Required**. Search term |
| `page` | `int` | **Optional**. Page number |

#### Get information about the anime

```bash
GET /api/info/${anime}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `anime`      | `str` | **Required**. Anime name |

#### Get src to stream anime

```bash
GET /api/anime/${anime-ep-url}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `anime-ep-url`      | `str` | **Required**. Episode url  |

License
----

<p>
<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7195e121-eded-45cf-9aab-909deebd81b2/d9ur2lg-28410b47-58fd-4a48-9b67-49c0f56c68ce.png" alt="MIT" height=175px />
</p>

**Free Software, Hell Yeah!**
