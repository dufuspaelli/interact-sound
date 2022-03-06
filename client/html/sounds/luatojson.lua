local JSON = require("JSON") --The JSON library

local soundData = require("sounds")

local source = "sounds.lua"
local destination = "sounds.json"

--local f = io.open(source)
--local data = f:read("*all")

print(soundData)

local data = soundData

--Now after executing the file.lua script, the data has been stored in the global table Settings.

--Encode into JSON data.
local jsonData = JSON:encode_pretty(data)

--Open the destination file for writing.
local file = assert(io.open(destination, "w"))

--Write the JSON data.
assert(file:write(jsonData))

--Close the file.
file:close()

print("Wrote file.json successfully!")
