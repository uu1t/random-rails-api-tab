# Random Rails API tab

![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ngbeahjnndjoedgapccnoennbmalppbk.svg)
![Mozilla Add-on](https://img.shields.io/amo/v/random-rails-api-tab.svg)

> Chrome/Firefox extension to open random Ruby on Rails API document on new tab

![screenshot](./images/screenshot-caption.png)

## Installation

- **Chrome**: https://chrome.google.com/webstore/detail/random-rails-api-tab/ngbeahjnndjoedgapccnoennbmalppbk
- **Firefox**: https://addons.mozilla.org/en-US/firefox/addon/random-rails-api-tab/

## Features

- Open random Ruby on Rails API document (https://api.rubyonrails.org/) on new tab

## Development

### Requirements

- Unix-like OS (macOS, Linux)
- `python3`, `pipenv` for scraping data
- `node`, `npm` for building extension

### Scrape (not required to build extension)

```
pipenv install
./scripts/crawl.sh
```

Be careful that it may take dozens of minutes to complete.

### Build instructions for development

```
npm install
npm run build
```

The extension is bundled into `extension/public` directory. Load `extension/public` directory to browser.

### Build instructions for production

```
npm install
npm run zip
```

`chrome-${version}.zip` and `firefox-${version}.zip` are created in `dist` directory.

## Credits

[Ruby on Rails icon](https://www.iconfinder.com/icons/3069735/circle_programming_rails_round_icon_ruby_ruby_rails_icon) by Abhishek Pipalva is licensed under CC BY-SA 3.0.

## License

[MIT](https://choosealicense.com/licenses/mit/)
