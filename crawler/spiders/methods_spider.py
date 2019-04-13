from urllib.parse import urlparse

import scrapy


class MethodsSpider(scrapy.Spider):
    name = "methods"
    allowed_domains = ["api.rubyonrails.org"]
    start_urls = [
        "https://api.rubyonrails.org/classes/Array.html",
        "https://api.rubyonrails.org/classes/Benchmark.html",
        "https://api.rubyonrails.org/classes/BigDecimal.html",
        "https://api.rubyonrails.org/classes/Class.html",
        "https://api.rubyonrails.org/classes/Complex.html",
        "https://api.rubyonrails.org/classes/Date.html",
        "https://api.rubyonrails.org/classes/DateAndTime.html",
        "https://api.rubyonrails.org/classes/DateTime.html",
        "https://api.rubyonrails.org/classes/Delegator.html",
        "https://api.rubyonrails.org/classes/Digest.html",
        "https://api.rubyonrails.org/classes/ERB.html",
        "https://api.rubyonrails.org/classes/Enumerable.html",
        "https://api.rubyonrails.org/classes/Exception.html",
        "https://api.rubyonrails.org/classes/FalseClass.html",
        "https://api.rubyonrails.org/classes/File.html",
        "https://api.rubyonrails.org/classes/Float.html",
        "https://api.rubyonrails.org/classes/Hash.html",
        "https://api.rubyonrails.org/classes/IO.html",
        "https://api.rubyonrails.org/classes/Integer.html",
        "https://api.rubyonrails.org/classes/Kernel.html",
        "https://api.rubyonrails.org/classes/LoadError.html",
        "https://api.rubyonrails.org/classes/Method.html",
        "https://api.rubyonrails.org/classes/Module.html",
        "https://api.rubyonrails.org/classes/NameError.html",
        "https://api.rubyonrails.org/classes/NilClass.html",
        "https://api.rubyonrails.org/classes/Numeric.html",
        "https://api.rubyonrails.org/classes/Object.html",
        "https://api.rubyonrails.org/classes/Process.html",
        "https://api.rubyonrails.org/classes/Range.html",
        "https://api.rubyonrails.org/classes/Rational.html",
        "https://api.rubyonrails.org/classes/SecureRandom.html",
        "https://api.rubyonrails.org/classes/String.html",
        "https://api.rubyonrails.org/classes/Symbol.html",
        "https://api.rubyonrails.org/classes/Time.html",
        "https://api.rubyonrails.org/classes/TrueClass.html",
        "https://api.rubyonrails.org/classes/URI.html",
        "https://api.rubyonrails.org/classes/AbstractController.html",
        "https://api.rubyonrails.org/classes/ActionCable.html",
        "https://api.rubyonrails.org/classes/ActionController.html",
        "https://api.rubyonrails.org/classes/ActionDispatch.html",
        "https://api.rubyonrails.org/classes/ActionMailer.html",
        "https://api.rubyonrails.org/classes/ActionView.html",
        "https://api.rubyonrails.org/classes/ActiveJob.html",
        "https://api.rubyonrails.org/classes/ActiveModel.html",
        "https://api.rubyonrails.org/classes/ActiveRecord.html",
        "https://api.rubyonrails.org/classes/ActiveStorage.html",
        "https://api.rubyonrails.org/classes/ActiveSupport.html",
    ]

    def parse(self, response):
        for el in response.css(".method-title"):
            namespace = response.css("title::text").get()
            method = el.css("b::text").get()
            path = urlparse(response.url).path + "#" + el.attrib["id"]
            yield {"namespace": namespace, "method": method, "path": path}

        for el in response.xpath(
            "//div[@id='content']/div[contains(text(), 'Namespace')]/following-sibling::ul[1]//a"
        ):
            yield response.follow(el, callback=self.parse)
