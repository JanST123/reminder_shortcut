# Parser natural text to reminder data

This little node.js script listens for a HTTP POST request on `/` and port 3000. It expects a **JSON payload** with one property `text` and an optional property `language`.

It will parse a string that contains details for creating a task like it's known from [Todoist](https://todoist.com).

## Localization

As the script uses [chrono-node](https://www.npmjs.com/package/chrono-node) for parsing dates, it supports all languages for date parsing which chrono-node supports. At the time writing these are `en, en_GB, de, pt, es, fr, ja`. You can pass the desired language in the `language` property of the JSON payload. It defaults to `en`

## Hosted service
This script is also hosted at https://reminder.jan8.de Feel free to use it. 

## Usage Example

```sh
# default language: en
$ curl -X POST -H'Content-Type: application/json' -d'{"text": "tomorrow 10am doc appointment p1 #mylist"}' http://localhost:3000
{"list":"mylist","prio1":true,"date":"2024-08-30T08:00:00.000Z","text":"doc appointment"}

# with localization
$ curl -X POST -H'Content-Type: application/json' -d'{"text": "morgen 10am doc appointment p1 #mylist", "language": "de"}' http://localhost:3000
{"list":"mylist","prio1":true,"date":"2024-08-30T08:00:00.000Z","text":"doc appointment"}% 
```


The output can be used by Apple "Shortcuts" App to create a new "Reminder" with natural input. You can download the Shortcut here: 
https://www.icloud.com/shortcuts/b886cabf590341058077c64db7a6de58

Read more about it here: https://janpedia.de