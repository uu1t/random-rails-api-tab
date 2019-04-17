import json

import scrapy


class MethodsSpider(scrapy.Spider):
    name = "methods"
    allowed_domains = ["api.rubyonrails.org"]

    def __init__(self, tag=None, **kwargs):
        super().__init__(**kwargs)
        with open("./data/urls.json") as file:
            urls_json = json.load(file)
            self.start_urls = urls_json[tag]

    def parse(self, response):
        for el in response.css(".method-title"):
            yield {
                "c": response.css("title::text").get(),
                "m": el.css("b::text").get(),
                "h": el.attrib["id"],
            }

        for el in response.xpath(
            "//div[@id='content']/div[contains(text(), 'Namespace')]/following-sibling::ul[1]//a"
        ):
            yield response.follow(el, callback=self.parse)
